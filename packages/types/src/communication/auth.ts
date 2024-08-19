export type SignInRequest = {
  nickname: string;
  password: string;
};

export type SignUpRequest = {
  nickname: string;
  email: string;
  password: string;
};

export type SignInResponse = {
  id: string;
  nickname: string;
  email: string;
};

export type SignUpResponse = SignInResponse;
