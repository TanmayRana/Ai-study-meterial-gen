// import { db } from "@/configs/db";
// import { STUDY_TYPE_CONTENT_TABLE } from "@/configs/schema";
// import { inngest } from "@/inngest/client";

// export async function POST(req: Request) {
//   const { courseId, chapters, type } = await req.json();

//   if (type === "flashcard") {
//     const finalPrompt = `Generate a maximum of 15 flashcards in JSON format about ${chapters}. Include a variety of question types, such as:

//           * Definition questions (e.g., "What is a...")
//           * Comparison questions (e.g., "What is the difference between...")
//           * Code snippet completion (e.g., "Complete the following navigation code: \`Navigator.______(context, ...)\`")
//           * Purpose-based questions (e.g., "What is the purpose of the \`Expanded\` widget?")

//           Each flashcard should be in JSON format with "front" and "back" keys.`;
//   } else if (type === "quiz") {
//     const finalPrompt = `Generate a maximum of 10 multiple-choice quiz questions in JSON format about ${chapters}

// Each question object in the JSON array should have the following keys:

// * "question": The full text of the quiz question.
// * "options": An array of objects, where each object has the following keys:
//     * "id": A string to identify the option (e.g., "A", "B", "C", "D").
//     * "text": The text of the option.
// * "correctAnswerId": A string representing the "id" of the correct option from the "options" array.

// Ensure a variety of question types covering definitions, concepts, code snippets, and best practices within the specified topics.`;
//   }

//   const result = await db
//     .insert(STUDY_TYPE_CONTENT_TABLE)
//     .values({
//       courseId,
//       type,
//     })
//     .returning({ id: STUDY_TYPE_CONTENT_TABLE.id });

//   await inngest.send({
//     name: "study-type-content.generate",
//     data: {
//       courseId: courseId,
//       studyType: type,
//       prompt: finalPrompt,
//       recordId: result[0].id,
//     },
//   });

//   return Response.json({
//     id: result[0].id,
//     message: "Flashcards generation started.",
//   });
// }

import { db } from "@/configs/db";
import { STUDY_TYPE_CONTENT_TABLE } from "@/configs/schema";
import { inngest } from "@/inngest/client";

export async function POST(req: Request) {
  const { courseId, chapters, type } = await req.json();
  let finalPrompt: string | undefined;

  if (type === "flashcard") {
    finalPrompt = `Generate a maximum of 15 flashcards in JSON format about ${chapters}. Include a variety of question types, such as:

          * Definition questions (e.g., "What is a...")
          * Comparison questions (e.g., "What is the difference between...")
          * Code snippet completion (e.g., "Complete the following navigation code: \`Navigator.______(context, ...)\`")
          * Purpose-based questions (e.g., "What is the purpose of the \`Expanded\` widget?")

          Each flashcard should be in JSON format with "front" and "back" keys.`;
  } else if (type === "quiz") {
    finalPrompt = `Generate a maximum of 10 multiple-choice quiz questions in JSON format about ${chapters}

      Each question object in the JSON array should have the following keys:


      * "index": A number representing the question number.

      * "question": The full text of the quiz question.
      * "options": An array of objects, where each object has the following keys:
          * "id": A string to identify the option (e.g., "A", "B", "C", "D").
          * "text": The text of the option.
      * "correctAnswerId": A string representing the "id" of the correct option from the "options" array.

      Ensure a variety of question types covering definitions, concepts, code snippets, and best practices within the specified topics.`;
  }

  if (!finalPrompt) {
    return Response.json(
      { message: "Invalid study type provided." },
      { status: 400 }
    );
  }

  const result = await db
    .insert(STUDY_TYPE_CONTENT_TABLE)
    .values({
      courseId,
      type,
    })
    .returning({ id: STUDY_TYPE_CONTENT_TABLE.id });

  await inngest.send({
    name: "study-type-content.generate",
    data: {
      courseId: courseId,
      studyType: type,
      prompt: finalPrompt,
      recordId: result[0].id,
    },
  });

  return Response.json({
    id: result[0].id,
    message: `${
      type === "flashcard" ? "Flashcards" : "Quiz"
    } generation started.`,
  });
}
