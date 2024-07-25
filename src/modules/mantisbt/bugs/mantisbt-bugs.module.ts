import { Module } from '@nestjs/common';
import { MantisbtBugsController } from './mantisbt-bugs.controller';
import { MantisbtBugsService } from './mantisbt-bugs.service';
import { MantisbtBugsRepository } from './mantisbt-bugs.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MantisbtDatabaseConnection } from '../../../types/mantisbt.database.constants';
import { MantisbtBugEntity } from './entity/mantisbt-bug.entity';
import { MantisbtTagsRepository } from './mantisbt-tags.repository';
import { MantisbtTagsService } from './mantisbt-tags.service';
import { MantisbtBugRelationshipRepository } from './mantisbt-bug-relationship.repository';
import { MantisbtBugNoteRepository } from './mantisbt-bug-note.repository';
import { MantisbtBugNoteTextRepository } from './mantisbt-bug-note-text.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([MantisbtBugEntity], MantisbtDatabaseConnection),
  ],
  controllers: [MantisbtBugsController],
  providers: [
    MantisbtBugsService,
    MantisbtBugsRepository,
    MantisbtTagsService,
    MantisbtTagsRepository,
    MantisbtBugRelationshipRepository,
    MantisbtBugNoteRepository,
    MantisbtBugNoteTextRepository,
  ],
  exports: [
    MantisbtBugsService,
    MantisbtBugsRepository,
    MantisbtTagsService,
    MantisbtTagsRepository,
    MantisbtBugRelationshipRepository,
    MantisbtBugNoteRepository,
    MantisbtBugNoteTextRepository,
  ],
})
export class MantisbtBugsModule {}
