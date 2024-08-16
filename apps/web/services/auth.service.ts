import { SignInInput, SignUpInput } from "@profile/validations";
import { ApiError } from "@web/errors";

export class AuthService {
  async signUp(body: SignUpInput) {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/sign-up`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
        credentials: "include",
      }
    );

    const data = await response.json();

    if (response.ok) {
      return body;
    }

    const errMessage = data.message || data.error || "Failed to sign up";

    throw new ApiError(errMessage, response.status);
  }

  async signIn(body: SignInInput) {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/sign-in`,
      {
        method: "POST",
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

    const errMessage = data.message || data.error || "Failed to sign in";

    throw new ApiError(errMessage, response.status);
  }
}

export const authService = new AuthService();
