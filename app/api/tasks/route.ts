import { NextResponse } from "next/server";
import prisma from "@/lib/db";

export async function GET() {
  const tasks = await prisma.task.findMany({
    orderBy: { id: "desc" }, // optional but useful
  });

  return NextResponse.json(tasks);
}
