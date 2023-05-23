import {
  Contains,
  IsNotEmpty,
  IsString,
  ValidateNested,
} from 'class-validator';

export class DatabaseConfig {
  @IsString()
  @IsNotEmpty()
  @Contains('postgres://')
  uri: string;
}

export class RedisConfig {
  @IsString()
  @IsNotEmpty()
  @Contains('redis://')
  uri: string;
}

export class AppConfig {
  @ValidateNested()
  database: DatabaseConfig;
  @ValidateNested()
  redis: RedisConfig;
}
