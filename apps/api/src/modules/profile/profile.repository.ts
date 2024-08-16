import { ProfileEntity } from './profile.entity';

export abstract class ProfileRepository {
  abstract create(profileEntity: ProfileEntity): Promise<void>;
  abstract findByUsername(username: string): Promise<ProfileEntity | null>;
  abstract update(profileEntity: ProfileEntity): Promise<void>;
}
