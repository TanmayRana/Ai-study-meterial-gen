/* eslint-disable @typescript-eslint/no-explicit-any */
// import { db } from "@/configs/db";
// import { CHAPTER_NODE_TABLE, STUDY_TYPE_CONTENT_TABLE } from "@/configs/schema";
// import { eq } from "drizzle-orm";

// export async function POST(req: Request) {
//   const { courseId, studyType } = await req.json();

//   if (studyType === "ALL") {
//     const notes = await db
//       .select()
//       .from(CHAPTER_NODE_TABLE)
//       .where(eq(CHAPTER_NODE_TABLE.courseId, courseId));

//     const constentList = await db
//       .select()
//       .from(STUDY_TYPE_CONTENT_TABLE)
//       .where(eq(STUDY_TYPE_CONTENT_TABLE.courseId, courseId));

//     const result = {
//       notes: notes,
//       flashcard: constentList.find((item) => item?.type === "flashcard"),
//       quiz: null,
//       qa: null,
//     };

//     return Response.json(result);
//   } else if (studyType === "notes") {
//     const notes = await db
//       .select()
//       .from(CHAPTER_NODE_TABLE)
//       .where(eq(CHAPTER_NODE_TABLE.courseId, courseId));

//     return Response.json(notes);
//   }
// }

import { db } from "@/configs/db";
import { CHAPTER_NODE_TABLE, STUDY_TYPE_CONTENT_TABLE } from "@/configs/schema";
import { and, eq } from "drizzle-orm";

export async function POST(req: Request) {
  try {
    const { courseId, studyType } = await req.json();
    console.log("courseId:", courseId);
    console.log("studyType:", studyType);

    if (studyType === "ALL") {
      const notes = await db
        .select()
        .from(CHAPTER_NODE_TABLE)
        .where(eq(CHAPTER_NODE_TABLE.courseId, courseId));

      const contentList = await db
        .select()
        .from(STUDY_TYPE_CONTENT_TABLE)
        .where(eq(STUDY_TYPE_CONTENT_TABLE.courseId, courseId));

      const result = {
        notes: notes,
        flashcard:
          contentList.find((item) => item?.type === "flashcard") || null,
        quiz: contentList.find((item) => item?.type === "quiz") || null,
        qa: contentList.find((item) => item?.type === "qa") || null,
      };

      return new Response(JSON.stringify(result), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }

    if (studyType === "notes") {
      const notes = await db
        .select()
        .from(CHAPTER_NODE_TABLE)
        .where(eq(CHAPTER_NODE_TABLE.courseId, courseId));

      return new Response(JSON.stringify(notes), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }

    const result = await db
      .select()
      .from(STUDY_TYPE_CONTENT_TABLE)
      .where(
        and(
          eq(STUDY_TYPE_CONTENT_TABLE.courseId, courseId),
          eq(STUDY_TYPE_CONTENT_TABLE.type, studyType)
        )
      );

    return new Response(JSON.stringify(result[0]), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
