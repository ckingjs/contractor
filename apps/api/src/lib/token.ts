import jwt from "jsonwebtoken";
import { env } from "../config/env.js";

type TokenPayload = {
  sub: string;
  role: string;
  email: string;
};

export function signToken(payload: TokenPayload, expiresIn = "12h") {
  return jwt.sign(payload, env.JWT_SECRET, { expiresIn });
}

export function verifyToken(token: string): TokenPayload | null {
  try {
    const decoded = jwt.verify(token, env.JWT_SECRET);
    if (typeof decoded !== "object" || !decoded.sub || !decoded.role || !decoded.email) {
      return null;
    }

    return {
      sub: decoded.sub as string,
      role: decoded.role as string,
      email: decoded.email as string
    };
  } catch {
    return null;
  }
}
