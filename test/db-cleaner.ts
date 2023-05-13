import { MikroORM } from '@mikro-orm/core';
import { INestApplication } from '@nestjs/common';

export class DBCleaner {
  constructor(private readonly orm: MikroORM) {}

  static for(app: INestApplication): DBCleaner {
    const entityManager = app.get(MikroORM);
    return new DBCleaner(entityManager);
  }

  async clean(): Promise<void> {
    await this.orm.schema.execute('DELETE FROM "user"');
  }
}
