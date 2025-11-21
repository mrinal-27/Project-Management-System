import { NextResponse } from "next/server";
import prisma from "@/lib/db";

export async function PUT(req: Request) {
  try {
    const { userId, amount } = await req.json();

    const salary = await prisma.salary.upsert({
      where: { userId },
      update: { amount },
      create: { userId, amount }
    });

    return NextResponse.json(salary);
  } catch {
    return NextResponse.json({ error: "Failed to update salary" }, { status: 500 });
  }
}
