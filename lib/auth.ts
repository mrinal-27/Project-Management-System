import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

export function auth(req: Request) {
  const header = req.headers.get("authorization");
  if (!header) return null;

  const token = header.replace("Bearer ", "");
  if (!token) return null;

  try {
    return jwt.verify(token, process.env.JWT_SECRET!);
  } catch {
    return null;
  }
}
