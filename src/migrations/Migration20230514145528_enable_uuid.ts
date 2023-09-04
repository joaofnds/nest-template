import { Migration } from "@mikro-orm/migrations";

export class Migration20230514145529 extends Migration {
	async up() {
		this.addSql('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');
	}

	async down() {
		this.addSql('DROP EXTENSION IF EXISTS "uuid-ossp"');
	}
}
