import { ObjectId } from 'mongodb';

export class BaseEntity {
  id: string;

  constructor(id?: string) {
    this.id = id || new ObjectId().toHexString();
  }
}
