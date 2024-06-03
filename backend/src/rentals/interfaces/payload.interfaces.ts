export type JsonValue = string | number | boolean;

export interface JsonObject {
  [k: string]: JsonValue | JsonValue[] | JsonObject;
}
export interface JwtPayload extends JsonObject {
  iss?: string;
  sub?: string;
  aud?: string[];
  iat?: number;
  exp?: number;
  azp?: string;
  scope?: string;
}

export interface GoogleTokenPayload {
  sub?: string;
  name?: string;
  email?: string;
  picture?: string;
  iss?: string;
  aud?: string;
  exp?: number;
}
