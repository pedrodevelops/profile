import { Profile } from "../entities";

export type GetProfileParams = {
  nickname: string;
};

export type UpdateProfileRequest = Partial<
  Omit<Profile, "id" | "iconUrl" | "nickname">
>;

export type GetProfileResponse = Omit<Profile, "id">;

export type UpdateProfileResponse = GetProfileResponse;
