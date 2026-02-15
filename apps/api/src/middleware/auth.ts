import type { NextFunction, Request, Response } from "express";
import type { UserRole } from "@contractor/shared";
import { verifyToken } from "../lib/token.js";

declare global {
  namespace Express {
    interface Request {
      authUser?: {
        id: string;
        role: UserRole;
        email: string;
      };
    }
  }
}

export function requireAuth(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.header("authorization");
  const token = authHeader?.startsWith("Bearer ") ? authHeader.replace("Bearer ", "") : undefined;

  if (!token) {
    return res.status(401).json({ message: "Missing bearer token." });
  }

  const payload = verifyToken(token);
  if (!payload) {
    return res.status(401).json({ message: "Invalid token." });
  }

  req.authUser = {
    id: payload.sub,
    role: payload.role as UserRole,
    email: payload.email
  };

  return next();
}

export function requireRole(roles: UserRole[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.authUser) {
      return res.status(401).json({ message: "Not authenticated." });
    }

    if (!roles.includes(req.authUser.role)) {
      return res.status(403).json({ message: "Forbidden for current role." });
    }

    return next();
  };
}
