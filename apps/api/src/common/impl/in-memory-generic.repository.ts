import { BaseEntity } from '../domain/base.entity';

export class InMemoryGenericRepository<Entity extends BaseEntity> {
  private entities: Entity[] = [];

  async create(entity: Entity): Promise<void> {
    this.entities.push(entity);
  }

  async findById(id: string): Promise<Entity | null> {
    return this.entities.find((entity: any) => entity.id === id) || null;
  }

  async findByKey(key: string, value: any): Promise<Entity | null> {
    return this.entities.find((entity: any) => entity[key] === value) || null;
  }

  async update(entity: Entity): Promise<void> {
    const index = this.entities.findIndex((e: any) => e.id === entity.id);
    this.entities[index] = entity;
  }
  async delete(id: string): Promise<void> {
    this.entities = this.entities.filter((entity: any) => entity.id !== id);
  }
}
