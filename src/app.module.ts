import { Module } from '@nestjs/common';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MantisbtDatabaseConnection } from './types/mantisbt.database.constants';
import { RouterModule } from '@nestjs/core';
import { ConfigModule, ConfigService } from '@nestjs/config';
//Interceptors
import { CurrentUserInterceptor } from './modules/main/auth/interceptors/current-user.interceptor';
//Controllers
import { AppController } from './app.controller';
//Modules
import { AuthModule } from './modules/main/auth/auth.module';
import { BugtrackerUserModule } from './modules/bugtracker/users/bugtracker-user.module';
import { MantisbtApiIssuesModule } from './modules/mantisbt-api/issues/mantisbt-api-issues.module';
import { MantisbtApiUsersModule } from './modules/mantisbt-api/users/mantisbt-api-users.module';
import { MantisbtTasksModule } from './modules/mantisbt/tasks/mantisbt-tasks.module';
import { MantisbtUsersModule } from './modules/mantisbt/users/mantisbt-users.module';
import { MantisbtUsersRepository } from './modules/mantisbt/users/mantisbt-users.repository';
import { MantisbtRestApiTokensModule } from './modules/mantisbt/tokens/mantisbt-rest-api-tokens.module';
import { MantisbtApiProjectsModule } from './modules/mantisbt-api/projects/mantisbt-api-projects.module';
import { MantisbtApiProjectsRepository } from './modules/mantisbt-api/projects/mantisbt-api-projects.repository';
import { BugtrackerUrbanNexusModule } from './modules/bugtracker/urban-nexus/bugtracker-urban-nexus.module';
import { ClsModule } from 'nestjs-cls';
import { BugtrackerProjectFunctionsModule } from './modules/bugtracker/project-functions/bugtracker-project-functions.module';
import { MantisbtBugsModule } from './modules/mantisbt/bugs/mantisbt-bugs.module';
import { MantisbtBugsRepository } from './modules/mantisbt/bugs/mantisbt-bugs.repository';
import { MantisbtProjectsModule } from './modules/mantisbt/projects/mantisbt-projects.module';
import { MantisbtCategoriesModule } from './modules/mantisbt/categories/mantisbt-categories.module';
import { ProjectsModule } from './modules/main/projects/projects.module';
import { IssuesModule } from './modules/main/issues/issues.module';
import { BugtrackerProjectsModule } from './modules/bugtracker/projects/bugtracker-projects.module';
import { TagsModule } from './modules/main/tags/tags.module';
import { BugtrackerTagsModule } from './modules/bugtracker/tags/bugtracker-tags.module';
import { CommonsModule } from './modules/main/commons/commons.module';
import { BugtrackerCategoriesModule } from './modules/bugtracker/categories/bugtracker-categories.module';
import { CategoriesModule } from './modules/main/categories/categories.module';
import { DataSyncModule } from './modules/main/data-sync/data-sync.module';
import { StorageModule } from './modules/main/storage/storage.module';
import { UserModule } from './modules/main/user/user.module';
import { AzureModule } from './modules/main/azure/azure.module';
// Configs
import {
  ConfigurationConfig,
  ConfigurationKey,
  myEnvFilePath,
} from '../config/configuration.config';

@Module({
  imports: [
    ClsModule.forRoot({
      global: true,
      middleware: { mount: true },
    }),
    ConfigModule.forRoot({
      envFilePath: myEnvFilePath,
      isGlobal: true,
      load: [ConfigurationConfig],
    }),
    // AuthModule.forRoot(SuperTokensConfig),
    AuthModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        connectionURI: configService.get(
          ConfigurationKey.superToken.connectionURI,
        ),
        appInfo: {
          appName: configService.get(
            ConfigurationKey.superToken.appInfo.appName,
          ),
          apiDomain: configService.get(
            ConfigurationKey.superToken.appInfo.apiDomain,
          ),
          apiBasePath: configService.get(
            ConfigurationKey.superToken.appInfo.apiBasePath,
          ),
          websiteDomain: configService.get(
            ConfigurationKey.superToken.appInfo.websiteDomain,
          ),
          websiteBasePath: configService.get(
            ConfigurationKey.superToken.appInfo.websiteBasePath,
          ),
        },
      }),
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get(ConfigurationKey.database.main.host),
        port: configService.get(ConfigurationKey.database.main.port),
        username: configService.get(ConfigurationKey.database.main.username),
        password: configService.get(ConfigurationKey.database.main.password),
        database: configService.get(ConfigurationKey.database.main.database),
        //** db:bug_master, name: 'default' **//
        namingStrategy: new SnakeNamingStrategy(),
        timezone: 'Z',
        // autoLoadEntities: true,
        entities: [
          __dirname +
            `/modules/${configService.get(
              ConfigurationKey.database.main.entities,
            )}/**/*.entity{.ts,.js}`,
        ],
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      name: MantisbtDatabaseConnection, // Must have
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get(ConfigurationKey.database.mantisbt.host),
        port: configService.get(ConfigurationKey.database.mantisbt.port),
        username: configService.get(
          ConfigurationKey.database.mantisbt.username,
        ),
        password: configService.get(
          ConfigurationKey.database.mantisbt.password,
        ),
        database: configService.get(
          ConfigurationKey.database.mantisbt.database,
        ),
        //   //** db:bugtracker **//
        namingStrategy: new SnakeNamingStrategy(),
        timezone: 'Z',
        // autoLoadEntities: true,
        entities: [
          __dirname +
            `/modules/${configService.get(
              ConfigurationKey.database.mantisbt.entities,
            )}/**/*.entity{.ts,.js}`,
        ],
        synchronize: false,
      }),
      inject: [ConfigService],
    }),
    // TypeOrmModule.forRoot({
    //   ...defaultOptions,
    //   //** db:bugtracker **//
    //   name: MantisbtDatabaseConnection, // Must have
    //   database: 'bugtracker',
    //   entities: [__dirname + '/modules/mantisbt/**/*.entity{.ts,.js}'],
    //   synchronize: false,
    // }),
    RouterModule.register([
      {
        path: 'mantisbt/api',
        children: [
          {
            path: 'issues',
            module: MantisbtApiIssuesModule,
          },
          {
            path: 'users',
            module: MantisbtApiUsersModule,
          },
        ],
      },
      {
        path: 'mantisbt',
        module: MantisbtBugsModule,
      },
    ]),
    StorageModule,
    MantisbtApiIssuesModule,
    MantisbtApiUsersModule,
    MantisbtBugsModule,
    MantisbtProjectsModule,
    MantisbtCategoriesModule,
    MantisbtTasksModule,
    MantisbtUsersModule,
    MantisbtRestApiTokensModule,
    MantisbtApiProjectsModule,
    BugtrackerUserModule,
    BugtrackerUrbanNexusModule,
    BugtrackerProjectsModule,
    BugtrackerProjectFunctionsModule,
    IssuesModule,
    ProjectsModule,
    BugtrackerTagsModule,
    TagsModule,
    CommonsModule,
    BugtrackerCategoriesModule,
    CategoriesModule,
    DataSyncModule,
    UserModule,
    AzureModule,
  ],
  controllers: [AppController],
  providers: [
    CurrentUserInterceptor,
    MantisbtUsersRepository,
    MantisbtApiProjectsRepository,
    MantisbtBugsRepository,
  ],
})
export class AppModule {}
