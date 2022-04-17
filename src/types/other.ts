export type LoginFormValues = {
  username: string
  password: string
}

export type EditContactFormValues = {
  name: string
  surname: string
  tel: string
  email: string
}

export type APIResponseType = {
  isSucceed: boolean;
  token: string;
  error: null;
} | {
  isSucceed: boolean;
  token: null;
  error: string;
}