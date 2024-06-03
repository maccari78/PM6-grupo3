export type PayloadGoogleType = {
  email: string;
  name: string;
  image_url?: string;
  aToken: string;
};

export interface ResponseGoogle {
  payload: PayloadGoogleType;
  token: string;
}

declare module 'express' {
  interface Request {
    user: ResponseGoogle;
  }
}
