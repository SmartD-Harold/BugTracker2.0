import {
  MiddlewareConsumer,
  DynamicModule,
  Module,
  NestModule,
  Global,
} from '@nestjs/common';

import { AuthMiddleware } from './middlewares/auth.middleware';
import {
  ConfigInjectionToken,
  AuthModuleConfigType,
} from './types/supertokens.config.interface';
import { SupertokensService } from './supertokens.service';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BugtrackerUserEntity } from '../../bugtracker/users/entity/bugtracker-user.entity';
import { AdminMantisbtApiUsersRepository } from './admin-mantisbt-api-users.repository';
import { MantisbtUserEntity } from '../../mantisbt/users/entity/mantisbt-user.entity';
import { MantisbtDatabaseConnection } from '../../../types/mantisbt.database.constants';
import { MantisbtRestApiTokenEntity } from '../../mantisbt/tokens/entity/mantisbt-rest-api-token.entity';
import { AdminMantisbtApiTokensService } from './admin-mantisbt-api-tokens.service';
import { MantisbtRestApiTokensRepository } from '../../mantisbt/tokens/mantisbt-rest-api-tokens.repository';
import { MantisbtProjectUserListEntity } from '../../mantisbt/projects/entity/mantisbt-project-user-list.entity';
import { MantisbtProjectEntity } from '../../mantisbt/projects/entity/mantisbt-project.entity';
import AuthAsyncOptions from './types/auth-options.type';
const excludeRoutes = [
  'mantisbt/(.*)',
  'mantisbt/api/(.*)',
  'bugtracker/(.*)',
  'tasks', // TODO: Remove this
];

@Global()
@Module({
  imports: [
    TypeOrmModule.forFeature([BugtrackerUserEntity]),
    TypeOrmModule.forFeature(
      [
        MantisbtUserEntity,
        MantisbtRestApiTokenEntity,
        MantisbtProjectUserListEntity,
        MantisbtProjectEntity,
      ],
      MantisbtDatabaseConnection,
    ),
  ],
  providers: [
    AuthService,
    MantisbtRestApiTokensRepository,
    AdminMantisbtApiUsersRepository,
    AdminMantisbtApiTokensService,
  ],
  exports: [AuthService],
})
export class AuthModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .exclude(...excludeRoutes)
      .forRoutes('*');
  }

  static register({
    connectionURI,
    appInfo,
    apiKey,
  }: AuthModuleConfigType): DynamicModule {
    return {
      module: AuthModule,
      providers: [
        {
          provide: ConfigInjectionToken,
          useValue: {
            appInfo,
            connectionURI,
            apiKey,
          },
        },
        SupertokensService,
      ],
      exports: [SupertokensService],
    };
  }

  static registerAsync(options: AuthAsyncOptions): DynamicModule {
    return {
      module: AuthModule,
      imports: options.imports,
      providers: [
        {
          provide: ConfigInjectionToken,
          useFactory: options.useFactory,
          inject: options.inject,
        },
        SupertokensService,
      ],
      exports: [SupertokensService],
    };
  }

  // static forRoot({
  //   connectionURI,
  //   appInfo,
  //   apiKey,
  // }: AuthModuleConfigType): DynamicModule {
  //   return {
  //     providers: [
  //       {
  //         provide: ConfigInjectionToken,
  //         useValue: {
  //           appInfo,
  //           connectionURI,
  //           apiKey,
  //         },
  //       },
  //       SupertokensService,
  //     ],
  //     module: AuthModule,
  //   };
  // }
}
