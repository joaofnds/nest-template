import { EntityManager } from '@mikro-orm/postgresql';
import { Injectable } from '@nestjs/common';
import { User } from './user.entity';
import { UserRepository } from './user.repository';

@Injectable()
export class MikroRepository implements UserRepository {
  constructor(private readonly entityManager: EntityManager) {}

  async persist(user: User) {
    await this.entityManager.persistAndFlush(user);
  }

  find(id: string): Promise<User> {
    return this.entityManager.findOneOrFail(User, { id });
  }

  findAll() {
    return this.entityManager.find(User, {});
  }
}
