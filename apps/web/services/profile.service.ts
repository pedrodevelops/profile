import {
  GetProfileResponse,
  UpdateProfileRequest,
  UpdateProfileResponse,
} from "@profile/types";
import { ApiError } from "@web/errors";

export class ProfileService {
  async getProfile(nickname: string): Promise<GetProfileResponse> {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/profile/${nickname}`,
      {
        credentials: "include",
        cache: "no-cache",
      }
    );

    const data = await response.json();

    if (response.ok) {
      return data;
    }

    const errMessage =
      data.message || data.error || "Não foi possível encontrar o perfil";

    throw new ApiError(errMessage, response.status);
  }

  async updateProfile(
    body: UpdateProfileRequest
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

    const errMessage =
      data.message || data.error || "Não foi possível atualizar o perfil";

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
      data.message ||
      data.error ||
      "Não foi possível atualizar a foto de perfil";

    throw new ApiError(errMessage, response.status);
  }
}

export const profileService = new ProfileService();
