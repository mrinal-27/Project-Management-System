import { NextResponse } from "next/server";
import prisma from "@/lib/db";

export async function PUT(req: Request) {
  try {
    const data = await req.json();

    const updated = await prisma.user.update({
      where: { id: data.id },
      data: {
        birthday: data.birthday || null,
        gender: data.gender || null,
        phone: data.phone || null,
        bio: data.bio || null
      }
    });

    return NextResponse.json(updated);
  } catch (err) {
    return NextResponse.json({ error: "Update failed" }, { status: 500 });
  }
}
