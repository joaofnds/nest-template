import { Module } from '@nestjs/common';
import {
  ConfigService,
  ConfigModule as NestConfigModule,
} from '@nestjs/config';
import { AppConfig, ConfigLoader, DatabaseConfig } from 'src/config';

@Module({
  imports: [
    NestConfigModule.forRoot({
      ignoreEnvVars: true,
      load: [ConfigLoader.load],
    }),
  ],
  providers: [
    {
      provide: AppConfig,
      inject: [ConfigService],
      useFactory: (config: ConfigService) => (config as any).internalConfig,
    },
    {
      provide: DatabaseConfig,
      inject: [AppConfig],
      useFactory: (config: AppConfig): DatabaseConfig => config.database,
    },
  ],
  exports: [AppConfig, DatabaseConfig],
})
export class ConfigModule {}
