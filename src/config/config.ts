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

export class AppConfig {
  @ValidateNested()
  database: DatabaseConfig;
}
