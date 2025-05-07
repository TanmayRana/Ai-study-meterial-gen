import { db } from "@/configs/db";
import { STUDY_MATERIAL_TABLE } from "@/configs/schema";
import { desc, eq } from "drizzle-orm";

export async function POST(req: Request) {
  try {
    const { createdBy } = await req.json();

    const result = await db
      .select()
      .from(STUDY_MATERIAL_TABLE)
      .where(eq(STUDY_MATERIAL_TABLE.createdBy, createdBy))
      .orderBy(desc(STUDY_MATERIAL_TABLE.id));

    return Response.json({ result, message: "Courses fetched successfully." });
  } catch (error) {
    console.log(error);
    return Response.json({
      message: "Something went wrong while fetching courses.",
    });
  }
}

// export async function GET(req: Request) {
//   try {
//     const reqUrl = req.url;
//     const { searchParams } = new URL(reqUrl);
//     const courseId = searchParams.get("courseId");

//     const course = await db
//       .select()
//       .from(STUDY_MATERIAL_TABLE)
//       .where(eq(STUDY_MATERIAL_TABLE?.courseId, courseId));

//     return Response.json({
//       result: course[0],
//       message: "Course fetched successfully.",
//     });
//   } catch (error) {
//     console.log(error);
//     return Response.json({
//       message: "Something went wrong while fetching course.",
//     });
//   }
// }

export async function GET(req: Request) {
  try {
    const reqUrl = req.url;
    const { searchParams } = new URL(reqUrl);
    const courseId = searchParams.get("courseId");

    if (!courseId) {
      return Response.json(
        { message: "Missing courseId in query." },
        { status: 400 }
      );
    }

    const course = await db
      .select()
      .from(STUDY_MATERIAL_TABLE)
      .where(eq(STUDY_MATERIAL_TABLE.courseId, courseId));

    return Response.json({
      result: course[0],
      message: "Course fetched successfully.",
    });
  } catch (error) {
    console.log(error);
    return Response.json(
      { message: "Something went wrong while fetching course." },
      { status: 500 }
    );
  }
}
