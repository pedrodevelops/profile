import {
  UpdateProfileInput,
  UpdateProfileResponse,
} from "@profile/validations";
import { ApiError } from "@web/errors";

export type GetProfileResponse = {
  id: string;
  username: string;
  bio: string;
  iconUrl: string;
  tags: string[];
  socials: {
    media: string;
    url: string;
  }[];
};

export class ProfileService {
  async getProfile(username: string): Promise<GetProfileResponse> {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/profile/${username}`,
      {
        credentials: "include",
        cache: "no-cache",
      }
    );

    const data = await response.json();

    if (response.ok) {
      return data;
    }

    const errMessage = data.message || data.error || "Failed to get profile";

    throw new ApiError(errMessage, response.status);
  }

  async updateProfile(
    body: UpdateProfileInput
  ): Promise<UpdateProfileResponse> {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/profile/me`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
        credentials: "include",
      }
    );

    const data = await response.json();

    if (response.ok) {
      return data;
    }

    const errMessage = data.message || data.error || "Failed to update profile";

    throw new ApiError(errMessage, response.status);
  }

  async updateProfilePicture(file: File): Promise<UpdateProfileResponse> {
    const formData = new FormData();

    formData.append("file", file);

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/profile/me/icon`,
      {
        method: "PATCH",

        credentials: "include",
        body: formData,
      }
    );

    const data = await response.json();

    if (response.ok) {
      return data;
    }

    const errMessage =
      data.message || data.error || "Failed to update profile picture";

    throw new ApiError(errMessage, response.status);
  }
}

export const profileService = new ProfileService();
