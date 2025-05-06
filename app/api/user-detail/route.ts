import { db } from "@/configs/db";
import { USER_TABLE } from "@/configs/schema";
import { eq } from "drizzle-orm";

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email) {
      return Response.json({ message: "Email is required", status: 400 });
    }

    const result = await db
      .select()
      .from(USER_TABLE)
      .where(eq(USER_TABLE.email, email))
      .execute();

    const user = result[0];

    if (!user) {
      return Response.json({ message: "User not found", status: 404 });
    }

    return Response.json({
      user,
      message: "User detail fetched successfully!",
      status: 200,
    });
  } catch (error) {
    console.error("Error fetching user detail:", error);
    return Response.json({
      message: "Internal server error",
      status: 500,
    });
  }
}
