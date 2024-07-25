import { Module } from '@nestjs/common';
import { StorageController } from './storage.controller';
import { StorageService } from './storage.service';
import { BugtrackerIssuesModule } from '../../bugtracker/issues/bugtracker-issues.module';

@Module({
  imports: [BugtrackerIssuesModule],
  controllers: [StorageController],
  providers: [StorageService],
  exports: [StorageService],
})
export class StorageModule {}
