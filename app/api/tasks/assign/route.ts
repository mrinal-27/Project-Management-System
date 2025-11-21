import { NextResponse } from "next/server";
import prisma from "@/lib/db";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, email, projectId, deadline, priority } = body;

    if (!title || !email || !projectId) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // find the user by email
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    // create the task
    const task = await prisma.task.create({
      data: {
        title,
        status: "Pending",
        projectId,
        userId: user.id,

        // NEW FIELDS
        deadline: deadline ? new Date(deadline) : null,
        priority: priority || "Medium",
      },
    });

    return NextResponse.json(task);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
