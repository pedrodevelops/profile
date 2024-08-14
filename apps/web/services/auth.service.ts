import { ApiError } from "@web/errors";

export class AuthService {
  async signUp(data: any) {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/sign-up`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );

    const respondeData = await response.json();

    if (response.ok) {
      return data;
    }

    const errMessage =
      respondeData.message || respondeData.error || "Failed to sign up";

    throw new ApiError(errMessage, response.status);
  }

  async signIn(data: any) {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/sign-in`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );

    const respondeData = await response.json();

    if (response.ok) {
      return respondeData;
    }

    const errMessage =
      respondeData.message || respondeData.error || "Failed to sign in";

    throw new ApiError(errMessage, response.status);
  }
}

export const authService = new AuthService();
