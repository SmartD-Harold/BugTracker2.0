import { Injectable, NotFoundException } from '@nestjs/common';
import { MantisbtBugsRepository } from './mantisbt-bugs.repository';
import { MantisbtBugRelationshipRepository } from './mantisbt-bug-relationship.repository';
import { mantisbtBugRelationshipRelations } from './entity/mantisbt-bug-relationship.entity';
import { BugRelationshipInterfaceEnum } from './interfaces';
import { MantisbtBugNoteRepository } from './mantisbt-bug-note.repository';
import { mantisbtBugNoteRelations } from './entity/mantisbt-bug-note.entity';
import { instanceToPlain } from 'class-transformer';
import { MantisbtBugNoteTextRepository } from './mantisbt-bug-note-text.repository';

@Injectable()
export class MantisbtBugsService {
  constructor(
    private readonly mantisbtBugsRepository: MantisbtBugsRepository,
    private readonly mantisbtBugRelationshipRepository: MantisbtBugRelationshipRepository,
    private readonly mantisbtBugNoteRepository: MantisbtBugNoteRepository,
    private readonly mantisbtBugNoteTextRepository: MantisbtBugNoteTextRepository,
  ) {}

  async findALLBugs({ page = 1, size = 100, orderBy = {} }) {
    const _order = Object.keys(orderBy).length === 0 ? { id: 'ASC' } : orderBy;
    return await this.mantisbtBugsRepository.find({
      take: size,
      skip: size * (page - 1),
      order: _order,
    });
  }

  async findBugs() {
    return await this.mantisbtBugsRepository.findBugs();
  }

  async findBugById(id: number) {
    return await this.mantisbtBugsRepository.findBugById(id);
  }

  async findBugByIds(ids: number[]) {
    return await this.mantisbtBugsRepository.findBugByIds(ids);
  }

  async findIssuesDataGrid(options = {}) {
    return await this.mantisbtBugsRepository.findBugsDataGrid(options);
  }

  async findIssuesOfAssignedToMe(userId: number) {
    return await this.mantisbtBugsRepository.findBugsHandlerToUser(userId);
  }

  async findIssuesOfReportedByMe(userId: number) {
    return await this.mantisbtBugsRepository.findBugsReporterByUser(userId);
  }

  async findIssuesOfMonitoredByMe(userId: number) {
    const issues =
      await this.mantisbtBugsRepository.findBugsMonitorByUser(userId);

    return issues;
  }

  async findIssuesOfLatestViewedByMe(userId: number) {
    return await this.mantisbtBugsRepository.findBugsLatestViewedByUser(userId);
  }

  async findIssuesByLastUpdatedByMe(userId: number) {
    return await this.mantisbtBugsRepository.findBugsLastUpdatedByUser(userId);
  }

  async findIssuesOfStatus(statusKey: number) {
    return await this.mantisbtBugsRepository.findBugsByStatus(statusKey);
  }

  async findIssuesOfUnassignedUser() {
    return await this.mantisbtBugsRepository.findBugsByUnassignedHandlerUser();
  }

  async findIssuesOfInProgress(bugIds: number[]) {
    if (bugIds.length === 0) return [];
    return await this.mantisbtBugsRepository.findBugsCreatedASCByIds(bugIds);
  }

  async findIssuesByLastUpdated(bugIds: number[]) {
    if (bugIds.length === 0) return [];
    return await this.mantisbtBugsRepository.findBugsLastUpdatedByIds(bugIds);
  }

  async findIssuesRelationItemsByIds(ids: number[]) {
    const bugSelect = {
      id: true,
      summary: true,
      status: true,
      dateSubmitted: true,
      project: {
        id: true,
        name: true,
      },
    };
    const _where = ids.reduce((acc, curr) => {
      acc.push({ sourceBugId: curr });
      acc.push({ destinationBugId: curr });
      return acc;
    }, []);
    let bugRelations = await this.mantisbtBugRelationshipRepository.find({
      where: _where,
      select: {
        sourceBugs: bugSelect,
        destinationBugs: bugSelect,
      },
      relations: [
        mantisbtBugRelationshipRelations.sourceBugs,
        mantisbtBugRelationshipRelations.destinationBugs,
        `${mantisbtBugRelationshipRelations.sourceBugs}.project`,
        `${mantisbtBugRelationshipRelations.destinationBugs}.project`,
      ],
      order: {
        id: 'ASC',
      },
    });

    if (bugRelations.length > 0) {
      bugRelations = bugRelations.reduce((acc, curr) => {
        const relationId = ids.includes(curr.sourceBugId)
          ? curr.destinationBugId
          : curr.sourceBugId;
        const relation = ids.includes(curr.sourceBugId)
          ? instanceToPlain(curr.destinationBugs)
          : instanceToPlain(curr.sourceBugs);

        return [
          ...acc,
          {
            id: curr.id,
            status: relation.status,
            sourceBugId: curr.sourceBugId,
            isSource: ids.includes(curr.sourceBugId),
            // destinationBugId: curr.destinationBugId,
            relationshipTypeId: curr.relationshipType,
            relationshipType:
              BugRelationshipInterfaceEnum[curr.relationshipType],
            relationId,
            title: relation.summary,
            project: {
              id: relation.project.id,
              name: relation.project.name,
            },
            createdAt: relation.dateSubmitted,
          },
        ];
      }, []);
    }

    return bugRelations;
  }

  async findIssueNotesByBugId(bugId: number) {
    return await this.mantisbtBugNoteRepository.find({
      select: {
        id: true,
        bugId: true,
        reporterId: true,
        noteType: true,
        noteAttr: true,
        bugnoteTextId: true,
        viewState: true,
        lastModified: true,
        dateSubmitted: true,
        noteText: {
          id: true,
          note: true,
        },
        reporter: {
          id: true,
          userName: true,
          realName: true,
          email: true,
        },
      },
      where: {
        bugId: bugId,
      },
      order: {
        id: 'ASC',
      },
      relations: [
        mantisbtBugNoteRelations.noteText,
        mantisbtBugNoteRelations.reporter,
      ],
    });
  }

  async updateNoteTextById(bugId: number, noteId: number, noteContent: string) {
    const bugNote = await this.mantisbtBugNoteRepository.findOne({
      where: {
        id: noteId,
        bugId: bugId,
      },
    });

    if (!bugNote) throw new NotFoundException();

    await this.mantisbtBugNoteTextRepository.update(bugNote.bugnoteTextId, {
      note: noteContent,
    });

    return bugNote;
  }
}
