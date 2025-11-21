import { NextResponse } from "next/server";
import prisma from "@/lib/db";

export async function PUT(req: Request) {
  try {
    const { taskId } = await req.json();

    if (!taskId) {
      return NextResponse.json(
        { error: "Missing taskId" },
        { status: 400 }
      );
    }

    const updated = await prisma.task.update({
      where: { id: taskId },
      data: { status: "Completed" },
    });

    return NextResponse.json(updated);
  } catch (err) {
    console.error("Complete Task Error:", err);
    return NextResponse.json(
      { error: "Unable to update task" },
      { status: 500 }
    );
  }
}
