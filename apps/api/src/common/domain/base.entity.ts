import { randomUUID } from 'crypto';

export class BaseEntity {
  id: string;

  constructor(id?: string) {
    this.id = id || randomUUID();
  }
}
