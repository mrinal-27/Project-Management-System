import { NextResponse } from "next/server";
import prisma from "@/lib/db";

export async function POST(req: Request) {
  try {
    const { name, description, managerId } = await req.json();

    const project = await prisma.project.create({
      data: { name, description, managerId }
    });

    return NextResponse.json(project);
  } catch {
    return NextResponse.json({ error: "Failed to create project" }, { status: 500 });
  }
}
