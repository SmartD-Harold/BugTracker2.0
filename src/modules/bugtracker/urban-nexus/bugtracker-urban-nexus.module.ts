import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BugtrackerUrbanNexusEntity } from './entity/bugtracker-urban-nexus.entity';
import { BugtrackerEstateManagementCompanyEntity } from './entity/bugtracker-estate-management-company.entity';
import { BugtrackerConstructionCompanyEntity } from './entity/bugtracker-construction-company.entity';
import { BugtrackerApartmentComplexEntity } from './entity/bugtracker-apartment-complex.entity';
import { BugtrackerUrbanNexusService } from './bugtracker-urban-nexus.service';
import { BugtrackerApartmentComplexRepository } from './bugtracker-apartment-complex.repository';
import { BugtrackerConstructionCompanyRepository } from './bugtracker-construction-company.repository';
import { BugtrackerEstateManagementCompanyRepository } from './bugtracker-estate-management-company.repository';
import { BugtrackerUrbanNexusRepository } from './bugtracker-urban-nexus.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      BugtrackerUrbanNexusEntity,
      BugtrackerEstateManagementCompanyEntity,
      BugtrackerConstructionCompanyEntity,
      BugtrackerApartmentComplexEntity,
    ]),
  ],
  providers: [
    BugtrackerUrbanNexusService,
    BugtrackerApartmentComplexRepository,
    BugtrackerConstructionCompanyRepository,
    BugtrackerEstateManagementCompanyRepository,
    BugtrackerUrbanNexusRepository,
  ],
  exports: [
    BugtrackerUrbanNexusService,
    BugtrackerApartmentComplexRepository,
    BugtrackerConstructionCompanyRepository,
    BugtrackerEstateManagementCompanyRepository,
    BugtrackerUrbanNexusRepository,
  ],
})
export class BugtrackerUrbanNexusModule {}
