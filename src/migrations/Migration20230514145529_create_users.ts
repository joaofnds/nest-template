import { Migration } from '@mikro-orm/migrations';

export class Migration20230514145529 extends Migration {
  async up() {
    this.addSql(
      `CREATE TABLE "user"(
        "id" UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        "name" VARCHAR(255) NOT NULL
      );`,
    );
  }

  async down() {
    this.addSql('DROP TABLE "user"');
  }
}
