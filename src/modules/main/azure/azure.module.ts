import { Module } from '@nestjs/common';
import { AzureController } from './azure.controller';
import { AzureService } from './azure.service';
import { AzureRepository } from './azure.repository';
import { BugtrackerIssuesModule } from '../../bugtracker/issues/bugtracker-issues.module';

@Module({
  imports: [BugtrackerIssuesModule],
  controllers: [AzureController],
  providers: [AzureService, AzureRepository],
})
export class AzureModule {}
