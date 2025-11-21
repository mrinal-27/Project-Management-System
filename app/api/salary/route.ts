import { NextResponse } from "next/server";
import prisma from "@/lib/db";

export async function GET() {
  const salaries = await prisma.salary.findMany();
  return NextResponse.json(salaries);
}
