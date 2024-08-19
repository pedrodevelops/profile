import {
  SignInRequest,
  SignInResponse,
  SignUpRequest,
  SignUpResponse,
} from "@profile/types";
import { ApiError } from "@web/errors";

export class AuthService {
  async signUp(body: SignUpRequest): Promise<SignUpResponse> {
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
      return data;
    }

    const errMessage =
      data.message || data.error || "Erro ao cadastrar usuário";

    throw new ApiError(errMessage, response.status);
  }

  async signIn(body: SignInRequest): Promise<SignInResponse> {
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

    const errMessage = data.message || data.error || "Erro ao logar usuário";

    throw new ApiError(errMessage, response.status);
  }
}

export const authService = new AuthService();
