import { Router } from "express";
import { z } from "zod";
import { store } from "../../data/store.js";
import { signToken } from "../../lib/token.js";
import { requireAuth } from "../../middleware/auth.js";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(4)
});

export const authRouter = Router();

authRouter.post("/login", (req, res) => {
  const parsed = loginSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ message: "Invalid login payload." });
  }

  const user = store.users.find(
    (candidate) =>
      candidate.email.toLowerCase() === parsed.data.email.toLowerCase() && candidate.password === parsed.data.password
  );

  if (!user) {
    return res.status(401).json({ message: "Invalid credentials." });
  }

  const token = signToken({
    sub: user.id,
    role: user.role,
    email: user.email
  });

  return res.json({
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role
    }
  });
});

authRouter.get("/me", requireAuth, (req, res) => {
  return res.json({ user: req.authUser });
});
