import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { BugtrackerIssuesService } from '../../bugtracker/issues/bugtracker-issues.service';
import { MantisbtBugEntity } from '../../mantisbt/bugs/entity/mantisbt-bug.entity';
import { IssuesListType } from './interfaces/issues.interfaces';
import { BugtrackerIssueEntity } from '../../bugtracker/issues/entity/bugtracker-issue.entity';
import { ResultToPlainWithoutMap } from '../../../decorators/result-to-plain.decorator';
import { CLS_Keys } from '../../../utils/cls/cls.enum';
import { ClsService } from 'nestjs-cls';
import { BugtrackerUserWithProjects } from '../../bugtracker/users/interfaces/bugtracker-user.dto';
import { BugtrackerRoleEntity } from '../../bugtracker/users/entity/bugtracker-role.entity';
import { MantisbtBugsService } from '../../mantisbt/bugs/mantisbt-bugs.service';
import { instanceToPlain, plainToInstance } from 'class-transformer';
import { MantisbtBugRelationshipEntity } from '../../mantisbt/bugs/entity/mantisbt-bug-relationship.entity';
import { BugtrackerTagsService } from '../../bugtracker/tags/bugtracker-tags.service';
import { BugtrackerTagEntity } from '../../bugtracker/tags/entity/bugtracker-tag.entity';
import { MantisbtTagEntity } from '../../mantisbt/bugs/entity/mantisbt-tag.entity';
import {
  PriorityEnum,
  PriorityKeyEnum,
  ReproducibilityEnum,
  ReproducibilityKeyEnum,
  SeverityEnum,
  SeverityKeyEnum,
  StatusMappingEnum,
  StatusMappingKeyEnum,
  SubStatusEnum,
  SubStatusKeyEnum,
} from '../../mantisbt/bugs/interfaces';
import { v4 as uuidv4 } from 'uuid';
import { ProjectsService } from '../projects/projects.service';
import { CategoriesService } from '../categories/categories.service';
import { BugtrackerUserService } from '../../bugtracker/users/bugtracker-user.service';
import { BugtrackerUrbanNexusService } from '../../bugtracker/urban-nexus/bugtracker-urban-nexus.service';
import { BugtrackerProjectFunctionsRepository } from '../../bugtracker/project-functions/bugtracker-project-functions.repository';
import { MantisbtApiIssuesService } from '../../mantisbt-api/issues/mantisbt-api-issues.service';
import { StorageService } from '../storage/storage.service';
import { TagsService } from '../tags/tags.service';
import { TagGroupsWithListAndCountZod, TagsZod } from '../tags/zod/tag.zod';
import { AttachFilesDto } from './dto/issue-item.dto';
import { IssuesNoteDto } from './dto/issues-note.dto';
import { MergeIssueType } from './types/merge-issue.interface';
import { MergeFormOptionsInterface } from './types/merge-form-options.interface';

type MantistbtIssueWithRelations = MantisbtBugEntity & {
  relations?: MantisbtBugRelationshipEntity[];
};

type MantistbtTagWithGroup = MantisbtTagEntity & {
  tagGroup?: BugtrackerTagEntity;
};

@Injectable()
export class IssuesService {
  constructor(
    private readonly cls: ClsService,
    private readonly mantisbtBugsService: MantisbtBugsService,
    private readonly mantisbtApiIssuesService: MantisbtApiIssuesService,
    private readonly bugtrackerIssuesService: BugtrackerIssuesService,
    private readonly bugtrackerTagsService: BugtrackerTagsService,
    private readonly projectsService: ProjectsService,
    private readonly categoriesService: CategoriesService,
    private readonly bugtrackerUserService: BugtrackerUserService,
    private readonly bugtrackerUrbanNexusService: BugtrackerUrbanNexusService,
    private readonly bugtrackerProjectFunctionsRepository: BugtrackerProjectFunctionsRepository,
    private readonly storageService: StorageService,
    //TagsService
    private readonly tageService: TagsService,
  ) {}

  private getCurrentUser(): BugtrackerUserWithProjects | NonNullable<unknown> {
    return this.cls.get(CLS_Keys.user) || {};
  }

  getCurrentUserId(): number {
    const _currentUser = this.getCurrentUser();
    if ('mantisbtUserId' in _currentUser) return _currentUser.mantisbtUserId;
    return null;
  }

  getRolesOfCurrentUser(): BugtrackerRoleEntity[] {
    const _currentUser = this.getCurrentUser();
    if ('roles' in _currentUser) return _currentUser.roles;
    return [];
  }

  @ResultToPlainWithoutMap()
  async dataWithBugtracker(
    mantisbtIssues: MantisbtBugEntity[],
    bugtrackerIssues: Map<number, BugtrackerIssueEntity> = null,
  ): Promise<IssuesListType<MantisbtBugEntity, BugtrackerIssueEntity>> {
    if (bugtrackerIssues === null) {
      bugtrackerIssues =
        await this.bugtrackerIssuesService.getIssuesMapDataByBugId(
          mantisbtIssues,
        );
    }

    return {
      mantisbt: mantisbtIssues,
      bugtracker: bugtrackerIssues,
    };
  }

  async getIssueRelationsById(id: number) {
    return await this.mantisbtBugsService.findIssuesRelationItemsByIds([id]);
  }

  async getIssueById(id: number) {
    const mantisbtIssue: MantistbtIssueWithRelations =
      await this.mantisbtBugsService.findBugById(id);

    if (!mantisbtIssue) {
      throw new NotFoundException();
    }

    // with Bug Relationships
    mantisbtIssue.relations =
      await this.mantisbtBugsService.findIssuesRelationItemsByIds([
        mantisbtIssue.id,
      ]);

    // replace reporter
    const noteReporterUsers = await this.replaceIssueNoteReporter(
      mantisbtIssue.notes,
    );
    for (const note of mantisbtIssue.notes) {
      const _reporter = note.reporter;
      note.reporter = noteReporterUsers.get(_reporter.email);
    }

    const bugtrackerIssue =
      await this.bugtrackerIssuesService.getIssuesMapDataByBugId([
        mantisbtIssue,
      ]);

    // with Bugtracker Tags & Groups
    if (Object.values(mantisbtIssue.tags).length > 0) {
      mantisbtIssue.tags = await this.withBugtrackerTags(mantisbtIssue);
    } else {
      mantisbtIssue.tags = [];
    }

    return {
      mantisbt: instanceToPlain(mantisbtIssue),
      bugtracker: bugtrackerIssue.get(id) || null,
    };
  }

  // 可能棄用
  // async getIssueByIds(ids: number[]) {
  //   const mantisbtIssues: MantistbtIssueWithRelations[] =
  //     await this.mantisbtBugsService.findBugByIds(ids);
  //
  //   if (mantisbtIssues.length === 0) {
  //     throw new NotFoundException();
  //   }
  //
  //   const _ids = mantisbtIssues.map((issue) => issue.id);
  //   // with Bug Relationships
  //   const _relations =
  //     await this.mantisbtBugsService.findIssuesRelationItemsByIds(_ids);
  //
  //   for (const issue of mantisbtIssues) {
  //     issue.relations = _relations.filter((relation) => {
  //       return (
  //         relation.sourceBugId === issue.id ||
  //         relation.destinationBugId === issue.id
  //       );
  //     });
  //   }
  //
  //   // replace reporter
  //   const _allNotes = mantisbtIssues.reduce((acc, curr) => {
  //     acc.push(...curr.notes);
  //     return acc;
  //   }, []);
  //   const noteReporterUsers = await this.replaceIssueNoteReporter(_allNotes);
  //
  //   for (const issue of mantisbtIssues) {
  //     for (const issueNote of issue.notes) {
  //       const _reporter = issueNote.reporter;
  //       issueNote.reporter = noteReporterUsers.get(_reporter.email);
  //     }
  //   }
  //
  //   const bugtrackerIssue =
  //     await this.bugtrackerIssuesService.getIssuesMapDataByBugId(
  //       mantisbtIssues,
  //     );
  //
  //   // with Bugtracker Tags & Groups
  //   const tags = await this.withManyBugtrackerTags(mantisbtIssues);
  //   for (const issue of mantisbtIssues) {
  //     if (Object.values(issue.tags).length > 0) {
  //       const tagIds = issue.tags.map((tag) => tag.id);
  //       issue.tags = tags.filter((tag) => tagIds.includes(tag.id));
  //     } else {
  //       issue.tags = [];
  //     }
  //   }
  //
  //   return mantisbtIssues.reduce((acc, curr) => {
  //     return [
  //       ...acc,
  //       {
  //         mantisbt: instanceToPlain(curr),
  //         bugtracker: bugtrackerIssue.get(curr.id) || null,
  //       },
  //     ];
  //   }, []);
  // }

  async createIssue(data: any) {
    const currentUser = this.getCurrentUser() as BugtrackerUserWithProjects;

    data.reporter = {
      id: currentUser.id,
      account: currentUser.account,
      userName: currentUser.userName,
      mantisbtUserId: currentUser.mantisbtUserId,
      employee: currentUser.employee,
    };
    console.log('createIssue:data');
    console.log(data);

    // API Create Issue
    const mantisbtIssue = await this.mantisbtApiIssuesService.newTask(data);

    console.log('createIssue:mantisbtIssue');
    console.log(mantisbtIssue);

    // Add an issue relationship
    const _relationLinks = data.relationLinks || [];
    if (_relationLinks.length > 0) {
      for (const link of data.relationLinks) {
        await this.mantisbtApiIssuesService.addIssueRelation({
          formBugId: mantisbtIssue.id,
          toBugId: link.id,
        });
      }
    }

    console.log('data.tags');
    console.log(data.tags);

    // Add Tags
    const _tag = data?.tags || [];
    if (_tag.length > 0) {
      await this.mantisbtApiIssuesService.attachTagsToIssue({
        bugId: mantisbtIssue.id,
        tags: _tag.map((tag: { id: number; name: string }) => {
          return {
            name: tag.name,
          };
        }),
      });
      await this.tageService.syncTags();
    }
    // sync tags

    // DB Create Issue
    // const issues = new MantisbtBugEntity();
    await this.bugtrackerIssuesService.newIssue(data, mantisbtIssue);

    const _files = data.files || [];
    if (_files.length > 0) {
      // Update Issue Files Records
      await this.bugtrackerIssuesService.updateIssueFilesByUUID(
        data.uuid,
        mantisbtIssue.id,
      );

      // Update Meta Data Of  Files  on GCP
      for (const file of _files) {
        await this.storageService.setFileMetadata(
          {
            bugId: mantisbtIssue.id,
          },
          file.filename,
        );
      }
    }

    return {
      status: HttpStatus.OK,
    };
  }

  private async withBugtrackerTags(
    mantisbtIssue: MantisbtBugEntity,
  ): Promise<MantistbtTagWithGroup[]> {
    let tags = mantisbtIssue.tags;
    const _tagIds = tags.map((tag) => tag.id) || [];

    if (_tagIds.length === 0) return tags;

    const bugtrackerTags =
      await this.bugtrackerTagsService.withTagsById(_tagIds);

    const _tags = new Map<number, BugtrackerTagEntity>(
      bugtrackerTags.map((tag) => [tag.id, tag]),
    );

    if (_tags.size === 0) return tags;

    tags = tags.map((tag) => {
      const _tag = _tags.get(tag.id) || null;
      return {
        ...tag,
        tagGroup: _tag?.tagGroup || null,
      };
    });

    return tags;
  }

  private async withManyBugtrackerTags(
    mantisbtIssues: MantisbtBugEntity[],
  ): Promise<MantistbtTagWithGroup[]> {
    const tagsSet = new Set<number>();
    for (const issue of mantisbtIssues) {
      for (const tag of issue.tags) {
        tagsSet.add(tag.id);
      }
    }

    if (tagsSet.size === 0) return [];

    const bugtrackerTags = await this.bugtrackerTagsService.withTagsById([
      ...tagsSet.values(),
    ]);

    const _tags = new Map<number, BugtrackerTagEntity>(
      bugtrackerTags.map((tag) => [tag.id, tag]),
    );

    if (_tags.size === 0) return [];

    const tags = [];

    for (const tagId of tagsSet) {
      const _tag = _tags.get(tagId) || null;
      tags.push({
        id: tagId,
        tagGroup: _tag?.tagGroup || null,
      });
    }

    return tags;
  }

  async syncIssues({ page = 1, size = 100 } = {}) {
    let updated = 0;
    let created = 0;

    const options = {
      page,
      size,
      orderBy: {
        id: 'ASC',
      },
    };

    const mantisbtIssues = await this.mantisbtBugsService.findALLBugs(options);
    const bugtrackerIssues =
      await this.bugtrackerIssuesService.getIssues(options);

    const bugtrackerIssuesIds =
      bugtrackerIssues.map((issue) => issue.mantisBugId) || [];
    for (const mantisbtIssue of mantisbtIssues) {
      const hasIssue = bugtrackerIssuesIds.includes(mantisbtIssue.id);
      if (!hasIssue) {
        await this.bugtrackerIssuesService.createIssue(mantisbtIssue);
        created++;
      } else {
        const bugtrackerIssue = bugtrackerIssues.find(
          (issue) => issue.mantisBugId === mantisbtIssue.id,
        );
        await this.bugtrackerIssuesService.updateIssue(
          bugtrackerIssue.id,
          mantisbtIssue,
        );
        updated++;
      }
    }

    return {
      updated,
      created,
    };
  }

  async formOptions() {
    const _priority = Object.values(PriorityEnum);
    const _reproducibility = Object.values(ReproducibilityEnum);
    const _severity = Object.values(SeverityEnum);
    const _status = Object.values(StatusMappingEnum);
    const _subStatus = Object.values(SubStatusEnum);

    const _projects = await this.projectsService.getFormDisplayProjects();

    const defaultTags = ['收集中'];
    const _tags = await this.tageService.getTagGroupsWithTagsAndBugCount();
    const tags = {
      list: TagsZod.parse(_tags.tags),
      groups: TagGroupsWithListAndCountZod.parse(_tags.groups),
    };
    const selectedTags: number[] = tags.list.reduce((acc, tag) => {
      if (defaultTags.includes(tag.name)) {
        acc.push(tag.id);
      }
      return acc;
    }, []);

    const _categories = await this.categoriesService.getFormDisplayCategories();

    const _roles = await this.bugtrackerUserService.findLastedRoles({
      size: 10,
    });

    const _project = _projects.find((project) => project.id === 1);

    const theProject = {
      id: _project.id,
      name: _project.name,
      serviceTargetType: _project.serviceTargetType?.name || null,
      serviceTargetData: {
        type: '',
        pagination: {},
        data: [],
      },
    };

    const _projectFunctions =
      await this.bugtrackerProjectFunctionsRepository.findProjectFunctionsByProjectId(
        theProject.id,
      );

    if (theProject.serviceTargetType) {
      theProject.serviceTargetData =
        await this.bugtrackerUrbanNexusService.findServiceTarget(
          theProject.serviceTargetType,
        );
    }

    let _reporter = {};
    const currentUser = this.getCurrentUser() as BugtrackerUserWithProjects;
    if (Object.keys(currentUser).length > 0) {
      _reporter = {
        id: currentUser.id,
        name: currentUser.userName,
        email: currentUser.account,
        employee: {
          id: currentUser?.employee?.employeeId || '',
          name: currentUser?.employee?.name || '',
          department: currentUser?.employee?.department || '',
        },
      };
    }

    const _handlerType = [
      {
        id: 'ROLE',
        name: 'Role',
        label: '角色',
      },
      {
        id: 'USER',
        name: 'User',
        label: '人員',
      },
      {
        id: 'DEPT',
        name: 'Dept',
        label: '部門',
      },
    ];

    const handlerTypeIndex = 0;
    const _handlerTypeId = _handlerType[handlerTypeIndex].id;

    const categoryIndex = 1; // 軟體
    const theCategory = {
      id: _categories[categoryIndex].id,
      name: _categories[categoryIndex].name,
    };

    return {
      uuid: uuidv4(),
      selected: {
        project: {
          id: theProject.id,
        },
        category: {
          id: theCategory.id,
        },
        tags: selectedTags,
        handlerType: {
          id: _handlerTypeId,
        },
        handler: {
          id: _roles[0].id,
        },
        serviceTarget: null,
        projectFunctions: null,
        fields: {
          priority: {
            id: PriorityEnum[PriorityKeyEnum.normal_30].id,
          },
          reproducibility: {
            id: ReproducibilityEnum[ReproducibilityKeyEnum.sometimes_30].id,
          },
          severity: {
            id: SeverityEnum[SeverityKeyEnum.minor_50].id,
          },
          status: {
            id: StatusMappingEnum[StatusMappingKeyEnum.new_10].id,
          },
          subStatus: {
            id: SubStatusEnum[SubStatusKeyEnum.new_10].id,
          },
        },
      },
      projects: _projects,
      tags: tags,
      categories: _categories,
      reporter: _reporter,
      handlerType: _handlerType,
      handler: {
        type: _handlerTypeId, // USER, ROLE
        data: _roles, // Lasted 10 Role
      },
      serviceTarget: theProject.serviceTargetData,
      projectFunctions: _projectFunctions,
      fields: {
        priority: _priority,
        reproducibility: _reproducibility,
        severity: _severity,
        status: _status,
        subStatus: _subStatus,
      },
    };
  }

  async getServiceTargetData(
    serviceTargetType: string,
    options: {
      limit?: number | null;
      next?: number | null;
      orderBy?: 'ASC' | 'DESC';
      search?: string | null;
      page?: number;
    } = {},
  ): Promise<{
    type: string;
    pagination: any;
    data: any[];
  }> {
    const _type = serviceTargetType;
    return await this.bugtrackerUrbanNexusService.findServiceTarget(
      _type,
      options,
    );
  }

  private async handleNoteFiles(
    bugId: number,
    bugNoteId: number,
    inputFiles: string,
  ) {
    const _nanoIds: string[] = inputFiles.split(',') || []; // nanoid,nanoid...

    if (_nanoIds.length > 0) {
      // update issue files
      for (const nid of _nanoIds) {
        await this.bugtrackerIssuesService.updateIssueFiles(
          nid,
          bugId,
          bugNoteId,
        );
      }
    }

    // query issue files
    const files =
      await this.bugtrackerIssuesService.findIssueFilesByBugId(bugId);

    // update gcp file metadata
    if (files.length > 0) {
      const filterFiles = files.filter((file) =>
        _nanoIds.includes(file.nanoid),
      );
      if (filterFiles.length > 0) {
        for (const __file of filterFiles) {
          await this.storageService.setFileMetadata(
            {
              bugId: bugId,
              bugNoteId: bugNoteId,
            },
            __file.filename,
          );
        }
      }
    }

    return files;
  }

  private async handleIssueNotes(bugId: number) {
    // query note
    const _bugNotes =
      await this.mantisbtBugsService.findIssueNotesByBugId(bugId);

    const bugtrackerUsers = await this.replaceIssueNoteReporter(_bugNotes);

    for (const note of _bugNotes) {
      const _reporter = note.reporter;
      note.reporter = bugtrackerUsers.get(_reporter.email);
    }

    return _bugNotes;
  }

  async addNoteToIssue(
    bugId: number,
    data: {
      note: string;
      files: string;
    },
  ) {
    // write to mantisbt
    const result = await this.mantisbtApiIssuesService.createIssueNote(
      bugId,
      data,
    );

    const _bugNoteId = result.note.id;

    const files = await this.handleNoteFiles(bugId, _bugNoteId, data.files);
    const _bugNotes = await this.handleIssueNotes(bugId);

    return {
      notes: plainToInstance(IssuesNoteDto, instanceToPlain(_bugNotes), {
        excludeExtraneousValues: true,
      }),
      files: plainToInstance(AttachFilesDto, instanceToPlain(files)),
    };
  }

  async updateNoteToIssue(
    bugId: number,
    noteId: number,
    data: {
      note: string;
      files: string;
    },
  ) {
    // update to mantisbt
    const result = await this.mantisbtBugsService.updateNoteTextById(
      bugId,
      noteId,
      data.note,
    );

    const _bugNoteId = result.id;

    const files = await this.handleNoteFiles(bugId, _bugNoteId, data.files);
    const _bugNotes = await this.handleIssueNotes(bugId);

    return {
      notes: plainToInstance(IssuesNoteDto, instanceToPlain(_bugNotes), {
        excludeExtraneousValues: true,
      }),
      files: plainToInstance(AttachFilesDto, instanceToPlain(files)),
    };
  }

  async deleteNoteToIssue(bugId: number, noteId: number) {
    // delete to mantisbt
    const result = await this.mantisbtApiIssuesService.deleteIssueNote(
      bugId,
      noteId,
    );

    if (!result) {
      throw new NotFoundException();
    }

    const files = await this.handleNoteFiles(bugId, noteId, '');
    const _bugNotes = await this.handleIssueNotes(bugId);

    return {
      notes: plainToInstance(IssuesNoteDto, instanceToPlain(_bugNotes), {
        excludeExtraneousValues: true,
      }),
      files: plainToInstance(AttachFilesDto, instanceToPlain(files)),
    };
  }

  private async replaceIssueNoteReporter(_bugNotes) {
    const reporterMap: Map<string, any> = new Map();

    for (const note of _bugNotes) {
      const _reporter = note.reporter;
      if (!reporterMap.has(_reporter.email)) {
        reporterMap.set(_reporter.email, _reporter);
      }
    }

    const _reporterEmails = Array.from(reporterMap.keys());

    const bugtrackerUsers =
      await this.bugtrackerUserService.findUsersByEmail(_reporterEmails);

    for (const user of bugtrackerUsers) {
      reporterMap.set(user.account, user);
    }

    return reporterMap;
  }

  async mergeIssueAndFormOptions(
    formOptions: MergeFormOptionsInterface,
    issue: MergeIssueType,
  ) {
    // Handler Type: USER, ROLE
    let selectedHandler = null;
    if (issue.bugtracker.handlerType === 'USER') {
      selectedHandler = issue.bugtracker.handlerUser;
    } else if (issue.bugtracker.handlerType === 'ROLE') {
      selectedHandler = issue.bugtracker.handlerRole;
    }

    // Service Target
    let selectedServiceTarget = null;
    const serviceTargetTypeName = issue.bugtracker.serviceTargetType.name;
    if (serviceTargetTypeName === 'apartmentComplex') {
      selectedServiceTarget = issue.bugtracker.apartmentComplex;
    } else if (serviceTargetTypeName === 'constructionCompany') {
      selectedServiceTarget = issue.bugtracker.constructionCompany;
    } else if (serviceTargetTypeName === 'estateManagementCompany') {
      selectedServiceTarget = issue.bugtracker.estateManagementCompany;
    }

    formOptions.uuid = issue.bugtracker.uuid;
    // Selected
    formOptions.selected.project.id = issue.mantisbt.projectId;
    formOptions.selected.category.id = issue.mantisbt.categoryId;
    formOptions.selected.tags = issue.mantisbt.tags.map((tag) => tag.id);
    formOptions.selected.handlerType.id = issue.bugtracker.handlerType;
    formOptions.selected.handler.id = selectedHandler?.id || null;
    // Normal options
    formOptions.selected.fields.priority.id = issue.mantisbt.priority.id;
    formOptions.selected.fields.reproducibility.id =
      issue.mantisbt.reproducibility.id;
    formOptions.selected.fields.severity.id = issue.mantisbt.severity.id;
    // serviceTarget
    formOptions.selected.serviceTarget = selectedServiceTarget;
    formOptions.serviceTarget.data.unshift(selectedServiceTarget);
    // ProjectFunctions
    formOptions.selected.projectFunction = issue.bugtracker.projectFunction;
    // Status
    formOptions.selected.fields.status.id = issue.bugtracker.statueCode.id;
    formOptions.selected.fields.subStatus.id =
      issue.bugtracker.subStatueCode.id;
    return formOptions;
  }
}
