import { Injectable } from '@nestjs/common';
import { DataSource, Repository, SelectQueryBuilder } from 'typeorm';
import {
  mantisbtBugCountKeys,
  MantisbtBugEntity,
  mantisbtBugNotesRelations,
  mantisbtBugRelations,
} from './entity/mantisbt-bug.entity';
import { InjectDataSource } from '@nestjs/typeorm';
import { MantisbtDatabaseConnection } from '../../../types/mantisbt.database.constants';
import { applyConditions } from 'src/utils/typeorm/query-builder';

interface basicBugQueryWithRelationsOptions {
  id?: number;
  limit?: number;
  orderByObject?: {
    key: string;
    order: 'ASC' | 'DESC';
  };
}

@Injectable()
export class MantisbtBugsRepository extends Repository<MantisbtBugEntity> {
  private TABLE_BUGS = 'bugs';
  constructor(
    @InjectDataSource(MantisbtDatabaseConnection)
    protected dataSource: DataSource,
  ) {
    super(MantisbtBugEntity, dataSource.createEntityManager());
  }

  private getBugRelations() {
    return [
      mantisbtBugRelations.handler,
      mantisbtBugRelations.project,
      mantisbtBugRelations.category,
      // mantisbtBugRelations.notes,
    ];
  }

  async findBugs({ take = 50 } = {}): Promise<MantisbtBugEntity[]> {
    const bugs = await this.find({
      take,
      relations: [mantisbtBugRelations.reporter, mantisbtBugRelations.tags],
    });
    return bugs;
  }

  async findBugById(id: number): Promise<MantisbtBugEntity> {
    const _relations = mantisbtBugRelations;

    return (
      this.createBugQuery()
        .where(`${this.TABLE_BUGS}.id = :id`, { id })
        .leftJoinAndSelect(
          `${this.TABLE_BUGS}.${_relations.project}`,
          'project',
        )
        .leftJoinAndSelect(
          `${this.TABLE_BUGS}.${_relations.handler}`,
          'handler',
        )
        .leftJoinAndSelect(
          `${this.TABLE_BUGS}.${_relations.reporter}`,
          'reporter',
        )
        .leftJoinAndSelect(
          `${this.TABLE_BUGS}.${_relations.bugText}`,
          'bugText',
        )
        .leftJoinAndSelect(
          `${this.TABLE_BUGS}.${_relations.category}`,
          'category',
        )
        .leftJoinAndSelect(`${this.TABLE_BUGS}.${_relations.tags}`, 'tags')
        .leftJoinAndSelect(`${this.TABLE_BUGS}.${_relations.notes}`, 'notes')
        .leftJoinAndSelect(mantisbtBugNotesRelations.noteText, 'noteText')
        .leftJoinAndSelect(
          mantisbtBugNotesRelations.reporter,
          'noteTextReporter',
        )
        // .leftJoinAndSelect(
        //   `${this.TABLE_BUGS}.${_relations.bugsRelations}`,
        //   'bugsRelations',
        // )
        // .leftJoinAndSelect('bugsRelations.sourceBug', 'sourceBug')
        // .leftJoinAndSelect(
        //   mantisbtBugRelationshipRelations.destinationBug,
        //   'destinationBug',
        // )
        .getOne()
    );
  }

  async findBugByIds(ids: number[]): Promise<MantisbtBugEntity[]> {
    const _relations = mantisbtBugRelations;
    //.where("user.name IN (:...names)", { names: [ "Timber", "Cristal", "Lina" ] })
    return (
      this.createBugQuery()
        .where(`${this.TABLE_BUGS}.id IN (:...ids)`, { ids })
        .leftJoinAndSelect(
          `${this.TABLE_BUGS}.${_relations.project}`,
          'project',
        )
        .leftJoinAndSelect(
          `${this.TABLE_BUGS}.${_relations.handler}`,
          'handler',
        )
        .leftJoinAndSelect(
          `${this.TABLE_BUGS}.${_relations.reporter}`,
          'reporter',
        )
        .leftJoinAndSelect(
          `${this.TABLE_BUGS}.${_relations.bugText}`,
          'bugText',
        )
        .leftJoinAndSelect(
          `${this.TABLE_BUGS}.${_relations.category}`,
          'category',
        )
        .leftJoinAndSelect(`${this.TABLE_BUGS}.${_relations.tags}`, 'tags')
        .leftJoinAndSelect(`${this.TABLE_BUGS}.${_relations.notes}`, 'notes')
        .leftJoinAndSelect(mantisbtBugNotesRelations.noteText, 'noteText')
        .leftJoinAndSelect(
          mantisbtBugNotesRelations.reporter,
          'noteTextReporter',
        )
        // .leftJoinAndSelect(
        //   `${this.TABLE_BUGS}.${_relations.bugsRelations}`,
        //   'bugsRelations',
        // )
        // .leftJoinAndSelect('bugsRelations.sourceBug', 'sourceBug')
        // .leftJoinAndSelect(
        //   mantisbtBugRelationshipRelations.destinationBug,
        //   'destinationBug',
        // )
        .getMany()
    );
  }

  // ==========
  async findBugsByStatus(key: number): Promise<MantisbtBugEntity[]> {
    const queryBuilder = this.createBugQuery();
    queryBuilder.where(`${this.TABLE_BUGS}.status = :key`, { key });
    return this.manyBugQueryWithRelations(queryBuilder);
  }

  async findBugsCreatedASCByIds(
    bugIds: number[],
  ): Promise<MantisbtBugEntity[]> {
    const queryBuilder = this.createBugQuery();
    // .where("user.name IN (:...names)", { names: [ "Timber", "Cristal", "Lina" ] })
    queryBuilder.where(`${this.TABLE_BUGS}.id IN (:...bugIds)`, { bugIds });
    return this.manyBugQueryWithRelations(queryBuilder, {
      orderByObject: {
        key: 'dateSubmitted',
        order: 'ASC',
      },
    });
  }

  async findBugsLastUpdatedByIds(
    bugIds: number[],
  ): Promise<MantisbtBugEntity[]> {
    const queryBuilder = this.createBugQuery();
    queryBuilder.where(`${this.TABLE_BUGS}.id IN (:...bugIds)`, { bugIds });
    return this.manyBugQueryWithRelations(queryBuilder);
  }

  async findBugsHandlerToUser(userId: number): Promise<MantisbtBugEntity[]> {
    const queryBuilder = this.createBugQuery();
    queryBuilder.where('handler_id = :userId', { userId });
    return this.manyBugQueryWithRelations(queryBuilder);
  }

  async findBugsReporterByUser(userId: number): Promise<MantisbtBugEntity[]> {
    const queryBuilder = this.createBugQuery();
    queryBuilder.where('reporter_id = :userId', { userId });
    return this.manyBugQueryWithRelations(queryBuilder);
  }

  async findBugsMonitorByUser(userId: number): Promise<MantisbtBugEntity[]> {
    const _relations = mantisbtBugRelations;
    const TABLE_MONITORS = 'monitors';
    const queryBuilder = this.createBugQuery();
    queryBuilder
      .leftJoinAndSelect(
        `${this.TABLE_BUGS}.${_relations.monitors}`,
        TABLE_MONITORS,
      )
      .where(`${TABLE_MONITORS}.user_id = :userId`, { userId });
    return this.manyBugQueryWithRelations(queryBuilder);
  }

  async findBugsLatestViewedByUser(
    userId: number,
  ): Promise<MantisbtBugEntity[]> {
    // TODO: 暫時用handlerId和reporterId 實際上需要最近檢視過的Bug
    const queryBuilder = this.createBugQuery();
    queryBuilder
      .where('handler_id = :handlerId', { handlerId: userId })
      .orWhere('reporter_id = :reporterId', { reporterId: userId });
    return this.manyBugQueryWithRelations(queryBuilder);
  }

  async findBugsLastUpdatedByUser(
    userId: number,
  ): Promise<MantisbtBugEntity[]> {
    const queryBuilder = this.createBugQuery();
    queryBuilder.where('handler_id = :userId', { userId });
    return this.manyBugQueryWithRelations(queryBuilder);
  }

  async findBugsByUnassignedHandlerUser(): Promise<MantisbtBugEntity[]> {
    const queryBuilder = this.createBugQuery();
    queryBuilder.where('handler_id = 0');
    return this.manyBugQueryWithRelations(queryBuilder, {
      orderByObject: {
        key: 'dateSubmitted',
        order: 'DESC',
      },
    });
  }

  createBugQuery() {
    return this.dataSource
      .getRepository(MantisbtBugEntity)
      .createQueryBuilder(this.TABLE_BUGS);
  }

  basicBugQueryWithRelations(
    queryBuilder: SelectQueryBuilder<MantisbtBugEntity>,
  ) {
    const _relations = mantisbtBugRelations;
    return queryBuilder
      .leftJoinAndSelect(`${this.TABLE_BUGS}.${_relations.handler}`, 'handler')
      .leftJoinAndSelect(`${this.TABLE_BUGS}.${_relations.project}`, 'project')
      .leftJoinAndSelect(
        `${this.TABLE_BUGS}.${_relations.category}`,
        'category',
      )
      .loadRelationCountAndMap(
        `${this.TABLE_BUGS}.${mantisbtBugCountKeys.notesCount}`,
        `${this.TABLE_BUGS}.${_relations.notes}`,
      );
  }

  async manyBugQueryWithRelations(
    queryBuilder: SelectQueryBuilder<MantisbtBugEntity>,
    {
      limit = 50,
      orderByObject = {
        key: 'lastUpdated',
        order: 'DESC',
      },
    }: basicBugQueryWithRelationsOptions = {},
  ) {
    const _query = this.basicBugQueryWithRelations(queryBuilder);
    return await _query
      .orderBy(`${this.TABLE_BUGS}.${orderByObject.key}`, orderByObject.order)
      .limit(limit)
      .getMany();
  }

  // async findBugsMonitorByUser(id: number): Promise<MantisbtBugMonitorEntity[]> {
  //   const bugs = this.dataSource
  //     .getRepository(MantisbtBugMonitorEntity)
  //     .createQueryBuilder('bugMonitor')
  //     .leftJoinAndSelect('bugMonitor.bug', 'bug')
  //     .leftJoinAndSelect('bug.bugText', 'bugText')
  //     .leftJoinAndSelect('bug.handler', 'handler')
  //     // .leftJoinAndSelect('bug.reporter', 'reporter')
  //     .leftJoinAndSelect('bug.project', 'project')
  //     .leftJoinAndSelect('bug.category', 'category')
  //     .leftJoinAndSelect('bug.notes', 'notes')
  //     .where('bugMonitor.user_id = :userId', { userId: id })
  //     .orderBy('bug.lastUpdated', 'DESC')
  //     .limit(50)
  //     .getMany();
  //   return bugs;
  // }

  async basicBugsFind({
    where = {},
    relations = [],
    take = 50,
    order = {
      lastUpdated: 'DESC',
    },
  }: {
    where?: {
      [key in string]?: any;
    };
    relations?: string[];
    take?: number;
    order?: {
      [key in string]?: 'ASC' | 'DESC';
    };
  }): Promise<MantisbtBugEntity[]> {
    if (relations.length === 0) {
      relations = this.getBugRelations();
    }

    const results = await this.find({
      where,
      order,
      take,
      relations,
    });

    return results;
  }

  async findBugsDataGrid({
    page = 1,
    size = 100,
    project = null,
    status = null,
    handler = null,
    reporter = null,
    priority = null,
    severity = null,
    reproducibility = null,
    category = null,
  }: {
    page?: number;
    size?: number;
    project?: number | number[];
    status?: number | number[];
    handler?: number | number[];
    reporter?: number | number[];
    priority?: number | number[];
    severity?: number | number[];
    reproducibility?: number | number[];
    category?: number | number[];
  } = {}) {
    const bugQuery = this.dataSource
      .getRepository(MantisbtBugEntity)
      .createQueryBuilder(this.TABLE_BUGS);

    const applyConditionsInBugs = applyConditions<MantisbtBugEntity>(
      this.TABLE_BUGS,
      bugQuery,
    );

    if (project) {
      applyConditionsInBugs({
        fieldName: 'project_id',
        values: project,
      });
    }

    if (category) {
      applyConditionsInBugs({
        fieldName: 'category_id',
        values: category,
      });
    }

    if (handler) {
      applyConditionsInBugs({
        fieldName: 'handler_id',
        values: handler,
      });
    }

    if (reporter) {
      applyConditionsInBugs({
        fieldName: 'reporter_id',
        values: reporter,
      });
    }

    if (status) {
      applyConditionsInBugs({
        fieldName: 'status',
        values: status,
      });
    }

    if (priority) {
      applyConditionsInBugs({
        fieldName: 'priority',
        values: priority,
      });
    }

    if (severity) {
      applyConditionsInBugs({
        fieldName: 'severity',
        values: severity,
      });
    }

    if (reproducibility) {
      applyConditionsInBugs({
        fieldName: 'reproducibility',
        values: reproducibility,
      });
    }

    const _relations = mantisbtBugRelations;
    // relations
    bugQuery
      .leftJoinAndSelect(`${this.TABLE_BUGS}.${_relations.handler}`, 'handler')
      .leftJoinAndSelect(`${this.TABLE_BUGS}.${_relations.project}`, 'project')
      .leftJoinAndSelect(
        `${this.TABLE_BUGS}.${_relations.category}`,
        'category',
      )
      .leftJoinAndSelect(
        `${this.TABLE_BUGS}.${_relations.reporter}`,
        'reporter',
      )
      .loadRelationCountAndMap(
        `${this.TABLE_BUGS}.${mantisbtBugCountKeys.notesCount}`,
        `${this.TABLE_BUGS}.${_relations.notes}`,
      );
    // .leftJoinAndSelect('bugs.notes', 'notes');

    // order by, limit
    bugQuery
      .orderBy(`${this.TABLE_BUGS}.id`, 'DESC')
      .limit(size)
      .offset(size * (page - 1));

    // console.log(bugQuery.getQueryAndParameters());

    return await bugQuery.getMany();
  }
}
