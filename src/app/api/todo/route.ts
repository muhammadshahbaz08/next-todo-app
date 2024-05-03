import { NextRequest, NextResponse } from "next/server";
import { sql } from "@vercel/postgres";
import { eq } from "drizzle-orm";
import { db, todoTable } from "@/lib/drizzle";

export const GET = async (request: NextRequest) => {
  try {
    await sql`CREATE TABLE IF NOT EXISTS Todos(id serial, Task varchar(255))`;
    const res = await db.select().from(todoTable);
    return NextResponse.json(res);
  } catch (err) {
    console.log(err);
    return NextResponse.json({ message: "Something went Wrong." });
  }
};

export const POST = async (request: NextRequest) => {
  const req = await request.json();
  try {
    if (req.task) {
      const res = await db
        .insert(todoTable)
        .values({
          task: req.task,
        })
        .returning();

      return NextResponse.json({ message: "Data Added Successfully" });
    } else {
      throw new Error(`Task Feild is Required!`);
    }
  } catch (err) {
    return NextResponse.json({ message: (err as { message: string }).message });
  }
};

export const DELETE = async (request: NextRequest) => {
  const req = await request.json();
  try {
    if (req.id) {
      const res = await db
        .delete(todoTable)
        .where(eq(todoTable.id, req.id))
        .returning();

      return NextResponse.json({
        message: `Data with id:${req.id} Deleted Successfully`,
      });
    } else {
      throw new Error(`Task ID is Required For Task Deletion`);
    }
  } catch (err) {
    console.log(err);
    return NextResponse.json({ message: "Something went Wrong." });
  }
};
