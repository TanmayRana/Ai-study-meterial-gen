/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { db } from "@/configs/db";
import { inngest } from "./client";
import {
  CHAPTER_NODE_TABLE,
  STUDY_MATERIAL_TABLE,
  STUDY_TYPE_CONTENT_TABLE,
  USER_TABLE,
} from "@/configs/schema";
import { eq } from "drizzle-orm";
import axios from "axios";

// npx inngest-cli@latest dev

export const helloWorld = inngest.createFunction(
  { id: "hello-world" },
  { event: "test/hello.world" },
  async ({ event, step }) => {
    await step.sleep("wait-a-moment", "1s");
    return { message: `Hello ${event.data.email}!` };
  }
);

export const CreateNewUser = inngest.createFunction(
  { id: "create-user" },
  { event: "user.create" },
  async ({ event, step }) => {
    await step.run("Chaeck User and create new if not in db", async () => {
      const { user } = event.data;
      if (!user) return;

      const result = await db
        .select()
        .from(USER_TABLE)
        .where(eq(USER_TABLE.email, user?.primaryEmailAddress?.emailAddress));

      // console.log("result", result);

      if (result.length === 0) {
        const userResp = await db
          .insert(USER_TABLE)
          .values({
            name: user?.fullName,
            email: user?.primaryEmailAddress?.emailAddress,
          })
          .returning({ id: USER_TABLE.id });

        // console.log("userResp", userResp);
      }
    });

    return "User created successfully!";
  }

  //   Step send email to user
);

// export const GenerateNotes = inngest.createFunction(
//   { id: "generate-course" },
//   { event: "notes.generate" },
//   async ({ event, step }) => {
//     const { course } = event.data;
//     // console.log("course in inngest data", course[0].courseLayout);

//     await step.run("Generate Chapter Notes", async () => {
//       const chapters = course[0].courseLayout?.chapters;

//       console.log("chapters", chapters);
//       // const chapterArray = Array.isArray(chapters) ? chapters : [chapters];

//       // if (!Array.isArray(chapters) || chapters.length === 0) {
//       //   console.warn("No chapters found in courseLayout");
//       //   return;
//       // }

//       // Loop through chapters sequentially or in parallel
//       for (const chapter of chapters) {
//         const prompt = `Generate exam material detail content for each chapter.
// Make sure to include all topic points in the content.
// Return the content strictly in HTML format (without <html>, <head>, <body>, or <title> tags).
// Chapter details: ${JSON.stringify(chapter)}`;

//         try {
//           // const result = await fetch(
//           //   `${process.env.NEXT_PUBLIC_APP_URL}/api/ai-model/generate-notes`,
//           //   {
//           //     method: "POST",
//           //     headers: {
//           //       "Content-Type": "application/json",
//           //     },
//           //     body: { prompt },
//           //   }
//           // );

//           const result = await axios.post(
//             `${process.env.NEXT_PUBLIC_APP_URL}/api/ai-model/generate-notes`,
//             {
//               prompt,
//             }
//           );

//           const responseData = result.data;
//           console.log(
//             `Generated notes for chapter "${chapter?.course_title}"`,
//             responseData
//           );

//           return responseData;
//         } catch (err) {
//           console.error(
//             `Failed to generate notes for chapter "${chapter?.course_title}"`,
//             err
//           );
//         }
//       }
//     });
//   }
// );

// export const GenerateNotes = inngest.createFunction(
//   { id: "generate-course" },
//   { event: "notes.generate" },
//   async ({ event, step }) => {
//     const { course } = event.data;

//     return await step.run("Generate Chapter Notes", async () => {
//       const chapters = course?.[0]?.courseLayout?.chapters;

//       if (!Array.isArray(chapters) || chapters.length === 0) {
//         console.warn("No chapters found in courseLayout");
//         return "No chapters to process.";
//       }

//       const notesResults = [];
//       const index = 0;

//       for (const chapter of chapters) {
//         const prompt = `Generate exam material detail content for each chapter.
// Make sure to include all topic points in the content.
// Return the content strictly in HTML format (without <html>, <head>, <body>, or <title> tags).
// Chapter details: ${JSON.stringify(chapter)}`;

//         try {
//           const result = await axios.post(
//             `${process.env.NEXT_PUBLIC_APP_URL}/api/ai-model/generate-notes`,
//             { prompt }
//           );

//           const responseData = result.data;

//           console.log(
//             `Generated notes for chapter "${chapter?.course_title}"`,
//             responseData
//           );

//           // notesResults.push({
//           //   chapterTitle: chapter?.course_title,
//           //   notes: responseData,
//           // });

//           await db.insert(CHAPTER_NODE_TABLE).values({
//             chapterId: index,
//             courseId: course?.courseId,
//             notes: responseData,
//           });
//           index++;
//         } catch (err) {
//           console.error(
//             `Failed to generate notes for chapter "${chapter?.course_title}"`,
//             err
//           );
//         }
//       }

//       // return notesResults;
//     });
//   }
// );

export const GenerateNotes = inngest.createFunction(
  { id: "generate-course" },
  { event: "notes.generate" },
  async ({ event, step }) => {
    const { course } = event.data;

    const notesResult = await step.run("Generate Chapter Notes", async () => {
      // const chapters = course?.[0]?.courseLayout?.chapters;
      // const courseId = course?.[0]?.courseId;
      const chapters = course?.courseLayout?.chapters;
      const courseId = course?.courseId;

      if (!Array.isArray(chapters) || chapters.length === 0) {
        console.warn("No chapters found in courseLayout");
        return "No chapters to process.";
      }

      if (!courseId) {
        console.error("Missing courseId in event data");
        return "Course ID is missing.";
      }

      let index = 0;

      for (const chapter of chapters) {
        const prompt = `Generate exam material detail content for each chapter, Make sure to includes all topic point in the content, make sure to give content in HTML format (Do not Add HTML, Head, Body, title tag), The chapters:: ${JSON.stringify(
          chapter
        )}`;

        try {
          const result = await axios.post(
            `${process.env.NEXT_PUBLIC_APP_URL}/api/ai-model/generate-notes`,
            { prompt }
          );

          const responseData = result.data.parsed;

          console.log(
            `Generated notes for chapter "${chapter?.courseTitle}"`,
            responseData
          );

          await db.insert(CHAPTER_NODE_TABLE).values({
            chapterId: String(index),
            courseId,
            notes: responseData,
          });

          index++;
        } catch (err) {
          console.error(
            `Failed to generate notes for chapter "${chapter?.courseTitle}"`,
            err
          );
        }
      }

      return "Notes generation complete.";
    });

    const updateCourseStatus = await step.run(
      "Update Course Status",
      async () => {
        const courseId = course?.courseId;
        const result = await db
          .update(STUDY_MATERIAL_TABLE)
          .set({
            status: "Ready",
          })
          .where(eq(STUDY_MATERIAL_TABLE.courseId, courseId));

        return "Course status updated to 'generated'.";
      }
    );
  }
);

// export const GenerateStudyTypeContent = inngest.createFunction(
//   { id: "generate-study-type-content" },
//   { event: "study-type-content.generate" },
//   async ({ event, step }) => {
//     const { courseId, studyType, prompt, recordId } = event.data;

//     const FlashcardAiResult = await step.run(
//       "Generate Flashcard Ai Response",
//       async () => {
//         const result = await axios.post(`${process.env.NEXT_PUBLIC_APP_URL}/api/ai-model/generate-flashcards`, {
//           prompt,
//         });
//         return result.data.data;
//       }
//     );

//     const DBResult = await step.run("Save Flashcard Ai Response", async () => {
//       const result = await db
//         .update(STUDY_TYPE_CONTENT_TABLE)
//         .values({
//           content: FlashcardAiResult,
//         })
//         .where(eq(STUDY_TYPE_CONTENT_TABLE.id, recordId));

//       return "Flashcard Ai Response saved to DB.";
//     });
//   }
// );

// export const GenerateStudyTypeContent = inngest.createFunction(
//   { id: "generate-study-type-content" },
//   { event: "study-type-content.generate" },
//   async ({ event, step }) => {
//     const { courseId, studyType, prompt, recordId } = event.data;

//     // Step 1: Generate Flashcards via AI
//     const AiResult = await step.run(
//       "Generate Flashcard AI Response",
//       async () => {
//         try {
//           const res = await axios.post(
//             `${process.env.NEXT_PUBLIC_APP_URL}/api/ai-model/generate-flashcards`,
//             { prompt }
//           );

//           if (!res.data || !res.data.data) {
//             throw new Error("Invalid AI response: Missing data field.");
//           }

//           return res.data.data;
//         } catch (error: any) {
//           console.error("AI generation failed:", error);
//           throw new Error("Failed to generate flashcards using AI.");
//         }
//       }
//     );

//     // Step 2: Save flashcards to the DB
//     const dbResult = await step.run("Save Flashcards to DB", async () => {
//       try {
//         await db
//           .update(STUDY_TYPE_CONTENT_TABLE)
//           .set({ content: AiResult, status: "Ready" })
//           .where(eq(STUDY_TYPE_CONTENT_TABLE.id, recordId));

//         return "Flashcards saved to database.";
//       } catch (error: any) {
//         console.error("DB update failed:", error);
//         throw new Error("Failed to save flashcards to the database.");
//       }
//     });

//     return {
//       message: "Study type content generated and saved successfully.",
//       courseId,
//       studyType,
//       recordId,
//     };
//   }
// );

export const GenerateStudyTypeContent = inngest.createFunction(
  { id: "generate-study-type-content" },
  { event: "study-type-content.generate" },
  async ({ event, step }) => {
    const { courseId, studyType, prompt, recordId } = event.data;

    // Step 1: Generate Flashcards via AI
    const aiResult = await step.run(
      "Generate Flashcard AI Response",
      async () => {
        try {
          const res = await axios.post(
            `${process.env.NEXT_PUBLIC_APP_URL}/api/ai-model/generate-flashcards`,
            { prompt }
          );

          const data = res?.data?.data;

          if (!data) {
            throw new Error("Invalid AI response: Missing data field.");
          }

          return data;
        } catch (error: any) {
          console.error("AI generation failed:", error?.message || error);
          throw new Error("Failed to generate flashcards using AI.");
        }
      }
    );

    // Step 2: Save flashcards to the DB
    await step.run("Save Flashcards to DB", async () => {
      try {
        await db
          .update(STUDY_TYPE_CONTENT_TABLE)
          .set({ content: aiResult, status: "Ready" })
          .where(eq(STUDY_TYPE_CONTENT_TABLE.id, recordId));
      } catch (error: any) {
        console.error("DB update failed:", error?.message || error);
        throw new Error("Failed to save flashcards to the database.");
      }
    });

    return {
      message: "Study type content generated and saved successfully.",
      courseId,
      studyType,
      recordId,
    };
  }
);
