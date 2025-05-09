// /* eslint-disable @typescript-eslint/no-explicit-any */
// import { db } from "@/configs/db";
// import { STUDY_MATERIAL_TABLE } from "@/configs/schema";
// import { inngest } from "@/inngest/client";
// import { GoogleGenerativeAI } from "@google/generative-ai";
// import JSON5 from "json5"; // Ensure you have installed json5

// const ai = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY!);
// const model = ai.getGenerativeModel({
//   model: "gemini-2.5-flash-preview-04-17",
// });

// export async function POST(req: Request) {
//   try {
//     const { formData } = await req.json();
//     const { difficultyLevel, topic, studyType, courseId, createdBy } = formData;

//     // Validate required fields
//     if (!difficultyLevel || !topic || !studyType || !courseId || !createdBy) {
//       return new Response(
//         JSON.stringify({ message: "Missing required fields in formData." }),
//         { status: 400, headers: { "Content-Type": "application/json" } }
//       );
//     }

//     const prompt = `Generate a study material for ${topic} for ${studyType} with a difficulty level of ${difficultyLevel}. The output should be a JSON object with the following structure and include **at least ten chapters**, each with an equivalent emoji:

//     {
//       "courseTitle": "Title of the course",
//       "level": "Easy | Medium | Hard",
//       "courseSummary": "A concise summary of the entire course. 🚀",
//       "chapters": [
//         {
//           "chapterNumber": 1,
//           "chapterTitle": "Introduction to the Topic",
//           "chapterSummary": "A brief overview of the fundamental concepts. 💡",
//           "emoji": "📚",
//           "topics": [
//             "Basic concept 1",
//             "Basic concept 2"
//           ]
//         },
//         {
//           "chapterNumber": 2,
//           "chapterTitle": "Deep Dive into Core Principles",
//           "chapterSummary": "Exploring the essential theories in detail. 🔍",
//           "emoji": "⚛️",
//           "topics": [
//             "Core principle A",
//             "Core principle B"
//           ]
//         },
//         {
//           "chapterNumber": 3,
//           "chapterTitle": "Practical Applications and Examples",
//           "chapterSummary": "Illustrating the concepts with real-world examples. 🛠️",
//           "emoji": "💡",
//           "topics": [
//             "Application case 1",
//             "Application case 2"
//           ]
//         },
//         {
//           "chapterNumber": 4,
//           "chapterTitle": "Advanced Concepts and Theories",
//           "chapterSummary": "Delving into more complex aspects of the subject. 🧠",
//           "emoji": "🚀",
//           "topics": [
//             "Advanced theory X",
//             "Advanced theory Y"
//           ]
//         },
//         {
//           "chapterNumber": 5,
//           "chapterTitle": "Problem-Solving Techniques",
//           "chapterSummary": "Strategies for tackling challenges related to the topic. 🧩",
//           "emoji": "🔑",
//           "topics": [
//             "Technique 1",
//             "Technique 2"
//           ]
//         },
//         {
//           "chapterNumber": 6,
//           "chapterTitle": "Case Studies and Analysis",
//           "chapterSummary": "Examining specific scenarios and their implications. 🧐",
//           "emoji": "📊",
//           "topics": [
//             "Case study A",
//             "Case study B"
//           ]
//         },
//         {
//           "chapterNumber": 7,
//           "chapterTitle": "Emerging Trends and Future Directions",
//           "chapterSummary": "Exploring the latest developments and potential future paths. 🌱",
//           "emoji": "🔮",
//           "topics": [
//             "Trend 1",
//             "Trend 2"
//           ]
//         },
//         {
//           "chapterNumber": 8,
//           "chapterTitle": "Review and Consolidation",
//           "chapterSummary": "Summarizing key takeaways and reinforcing learning. 🔄",
//           "emoji": "📝",
//           "topics": [
//             "Key concept review",
//             "Practice questions"
//           ]
//         },
//         {
//           "chapterNumber": 9,
//           "chapterTitle": "Further Exploration and Resources",
//           "chapterSummary": "Guiding learners to additional materials and learning avenues. 🔭",
//           "emoji": "🔗",
//           "topics": [
//             "Recommended readings",
//             "Online resources"
//           ]
//         },
//         {
//           "chapterNumber": 10,
//           "chapterTitle": "Final Assessment and Next Steps",
//           "chapterSummary": "Evaluating understanding and outlining future learning paths. ✅",
//           "emoji": "🎓",
//           "topics": [
//             "Quiz/Test",
//             "Next level studies"
//           ]
//         }
//       ]
//     }

//     Please ensure the entire response is a valid JSON string adhering to the structure above, contains at least ten distinct chapters, and each chapter object includes an "emoji" field with a relevant emoji. Feel free to choose emojis that you believe best represent the chapter's theme. I've provided some examples, but you can use your own judgment. The course summary should also have a relevant emoji.
//     `;

//     const result = await model.generateContent([prompt]);
//     const textResponse = (await result.response.text()).trim();

//     // Remove any markdown fences if present
//     let cleanedText = textResponse
//       .replace(/^```(?:json)?\s*/, "")
//       .replace(/\s*```$/, "")
//       .trim();

//     // 1.  Handle common JSON errors with regex replacements
//     cleanedText = cleanedText
//       .replace(/([{,]\s*)([a-zA-Z0-9_-]+)\s*:/g, '$1"$2":') // Quote keys
//       .replace(/,(\s*[}\]])/g, "$1") // Remove trailing commas
//       .replace(/:\s*"(.*?)"/g, (match, value) => {
//         return `: "${value
//           .replace(/\\"/g, '"') // Unescape quotes
//           .replace(/[\r\n]+/g, "\\n")}"`; // Convert newlines and carriage returns to escaped newlines
//       });

//     let parsedJSON;
//     try {
//       // Attempt to parse using JSON5 for greater leniency
//       parsedJSON = JSON5.parse(cleanedText);
//     } catch (parseErr: any) {
//       console.error("Failed to parse AI-generated JSON using JSON5:", parseErr);
//       // 2.  Alternative parsing with standard JSON, after more aggressive cleanup
//       try {
//         cleanedText = cleanedText
//           .replace(/([{,]\s*)([a-zA-Z0-9_-]+)\s*:/g, '$1"$2":') // Ensure keys are quoted
//           .replace(/,(\s*[}\]])/g, "$1") // Remove trailing commas
//           .replace(/:\s*"(.*?)"/g, (match, value) => {
//             return `: "${value
//               .replace(/\\"/g, '"')
//               .replace(/[\r\n]+/g, "\\n")}"`;
//           });
//         parsedJSON = JSON.parse(cleanedText);
//         console.warn(
//           "JSON5 parse failed; falling back to standard JSON after cleanup."
//         );
//       } catch (jsonParseErr: any) {
//         // 3.  If all else fails, return the error.
//         return new Response(
//           JSON.stringify({
//             message:
//               "Failed to parse AI-generated JSON, even after aggressive repair.",
//             error: jsonParseErr.message,
//             raw: cleanedText,
//           }),
//           { status: 500, headers: { "Content-Type": "application/json" } }
//         );
//       }
//     }

//     // Save to DB
//     const dbResult = await db
//       .insert(STUDY_MATERIAL_TABLE)
//       .values({
//         courseId,
//         createdBy,
//         courseType: studyType,
//         difficultyLevel,
//         topic,
//         courseLayout: parsedJSON,
//       })
//       .returning();

//     // Trigger event
//     await inngest.send({
//       name: "notes.generate",
//       data: {
//         course: dbResult[0],
//       },
//     });

//     return new Response(JSON.stringify(dbResult[0]), {
//       status: 200,
//       headers: { "Content-Type": "application/json" },
//     });
//   } catch (error: any) {
//     console.error("Error generating or parsing study material:", error);
//     return new Response(
//       JSON.stringify({
//         message: "Failed to generate or save study material.",
//         error: error.message,
//       }),
//       { status: 500, headers: { "Content-Type": "application/json" } }
//     );
//   }
// }

// /* eslint-disable @typescript-eslint/no-explicit-any */
// import { db } from "@/configs/db";
// import { STUDY_MATERIAL_TABLE } from "@/configs/schema";
// import { inngest } from "@/inngest/client";
// import { GoogleGenerativeAI } from "@google/generative-ai";
// import JSON5 from "json5"; // Ensure you have installed json5

// const ai = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY!);
// const model = ai.getGenerativeModel({
//   model: "gemini-2.5-flash-preview-04-17",
// });

// export async function POST(req: Request) {
//   try {
//     const { formData } = await req.json();
//     const { difficultyLevel, topic, studyType, courseId, createdBy } = formData;

//     // Validate required fields
//     if (!difficultyLevel || !topic || !studyType || !courseId || !createdBy) {
//       return new Response(
//         JSON.stringify({ message: "Missing required fields in formData." }),
//         { status: 400, headers: { "Content-Type": "application/json" } }
//       );
//     }

//     const prompt = `Generate a study material for ${topic} for ${studyType} with a difficulty level of ${difficultyLevel}. The output should be a JSON object with the following structure and include **at least ten chapters**, each with an equivalent emoji:

//     {
//       "courseTitle": "Title of the course",
//       "level": "Easy | Medium | Hard",
//       "courseSummary": "A concise summary of the entire course. 🚀",
//       "chapters": [
//         {
//           "chapterNumber": 1,
//           "chapterTitle": "Introduction to the Topic",
//           "chapterSummary": "A brief overview of the fundamental concepts. 💡",
//           "emoji": "📚",
//           "topics": [
//             "Basic concept 1",
//             "Basic concept 2"
//           ]
//         },
//         {
//           "chapterNumber": 2,
//           "chapterTitle": "Deep Dive into Core Principles",
//           "chapterSummary": "Exploring the essential theories in detail. 🔍",
//           "emoji": "⚛️",
//           "topics": [
//             "Core principle A",
//             "Core principle B"
//           ]
//         },
//         {
//           "chapterNumber": 3,
//           "chapterTitle": "Practical Applications and Examples",
//           "chapterSummary": "Illustrating the concepts with real-world examples. 🛠️",
//           "emoji": "💡",
//           "topics": [
//             "Application case 1",
//             "Application case 2"
//           ]
//         },
//         {
//           "chapterNumber": 4,
//           "chapterTitle": "Advanced Concepts and Theories",
//           "chapterSummary": "Delving into more complex aspects of the subject. 🧠",
//           "emoji": "🚀",
//           "topics": [
//             "Advanced theory X",
//             "Advanced theory Y"
//           ]
//         },
//         {
//           "chapterNumber": 5,
//           "chapterTitle": "Problem-Solving Techniques",
//           "chapterSummary": "Strategies for tackling challenges related to the topic. 🧩",
//           "emoji": "🔑",
//           "topics": [
//             "Technique 1",
//             "Technique 2"
//           ]
//         },
//         {
//           "chapterNumber": 6,
//           "chapterTitle": "Case Studies and Analysis",
//           "chapterSummary": "Examining specific scenarios and their implications. 🧐",
//           "emoji": "📊",
//           "topics": [
//             "Case study A",
//             "Case study B"
//           ]
//         },
//         {
//           "chapterNumber": 7,
//           "chapterTitle": "Emerging Trends and Future Directions",
//           "chapterSummary": "Exploring the latest developments and potential future paths. 🌱",
//           "emoji": "🔮",
//           "topics": [
//             "Trend 1",
//             "Trend 2"
//           ]
//         },
//         {
//           "chapterNumber": 8,
//           "chapterTitle": "Review and Consolidation",
//           "chapterSummary": "Summarizing key takeaways and reinforcing learning. 🔄",
//           "emoji": "📝",
//           "topics": [
//             "Key concept review",
//             "Practice questions"
//           ]
//         },
//         {
//           "chapterNumber": 9,
//           "chapterTitle": "Further Exploration and Resources",
//           "chapterSummary": "Guiding learners to additional materials and learning avenues. 🔭",
//           "emoji": "🔗",
//           "topics": [
//             "Recommended readings",
//             "Online resources"
//           ]
//         },
//         {
//           "chapterNumber": 10,
//           "chapterTitle": "Final Assessment and Next Steps",
//           "chapterSummary": "Evaluating understanding and outlining future learning paths. ✅",
//           "emoji": "🎓",
//           "topics": [
//             "Quiz/Test",
//             "Next level studies"
//           ]
//         }
//       ]
//     }

//     Please ensure the entire response is a valid JSON string adhering to the structure above, contains at least ten distinct chapters, and each chapter object includes an "emoji" field with a relevant emoji. Feel free to choose emojis that you believe best represent the chapter's theme. I've provided some examples, but you can use your own judgment. The course summary should also have a relevant emoji.
//     `;

//     const result = await model.generateContent([prompt]);
//     const textResponse = (await result.response.text()).trim();

//     // Remove any markdown fences if present
//     let cleanedText = textResponse
//       .replace(/^```(?:json)?\s*/, "")
//       .replace(/\s*```$/, "")
//       .trim();

//     // More aggressive cleaning: remove any leading/trailing non-JSON characters
//     cleanedText = cleanedText.replace(/^[^\{]*/, "").replace(/[^\}]*$/, "");

//     // Remove non-ASCII characters
//     cleanedText = cleanedText.replace(/[^\x00-\x7F]/g, "");

//     // 1.  Handle common JSON errors with regex replacements
//     cleanedText = cleanedText
//       .replace(/([{,]\s*)([a-zA-Z0-9_-]+)\s*:/g, '$1"$2":') // Quote keys
//       .replace(/,(\s*[}\]])/g, "$1") // Remove trailing commas
//       .replace(/:\s*"(.*?)"/g, (match, value) => {
//         return `: "${value
//           .replace(/\\"/g, '"') // Unescape quotes
//           .replace(/[\r\n]+/g, "\\n")
//           .replace(/[\u0000-\u001F\u007F-\u009F]/g, "")}"`; // Remove control characters
//       });

//     let parsedJSON;
//     try {
//       // Attempt to parse using JSON5 for greater leniency
//       parsedJSON = JSON5.parse(cleanedText);
//     } catch (parseErr: any) {
//       console.error("Failed to parse AI-generated JSON using JSON5:", parseErr);
//       // 2.  Alternative parsing with standard JSON, after more aggressive cleanup
//       try {
//         cleanedText = cleanedText
//           .replace(/([{,]\s*)([a-zA-Z0-9_-]+)\s*:/g, '$1"$2":') // Ensure keys are quoted
//           .replace(/,(\s*[}\]])/g, "$1") // Remove trailing commas
//           .replace(/:\s*"(.*?)"/g, (match, value) => {
//             return `: "${value
//               .replace(/\\"/g, '"')
//               .replace(/[\r\n]+/g, "\\n")
//               .replace(/[\u0000-\u001F\u007F-\u009F]/g, "")}"`;
//           });
//         parsedJSON = JSON.parse(cleanedText);
//         console.warn(
//           "JSON5 parse failed; falling back to standard JSON after cleanup."
//         );
//       } catch (jsonParseErr: any) {
//         // 3.  If all else fails, return the error.
//         return new Response(
//           JSON.stringify({
//             message:
//               "Failed to parse AI-generated JSON, even after aggressive repair.",
//             error: jsonParseErr.message,
//             raw: cleanedText,
//           }),
//           { status: 500, headers: { "Content-Type": "application/json" } }
//         );
//       }
//     }

//     // Save to DB
//     const dbResult = await db
//       .insert(STUDY_MATERIAL_TABLE)
//       .values({
//         courseId,
//         createdBy,
//         courseType: studyType,
//         difficultyLevel,
//         topic,
//         courseLayout: parsedJSON,
//       })
//       .returning();

//     // Trigger event
//     await inngest.send({
//       name: "notes.generate",
//       data: {
//         course: dbResult[0],
//       },
//     });

//     return new Response(JSON.stringify(dbResult[0]), {
//       status: 200,
//       headers: { "Content-Type": "application/json" },
//     });
//   } catch (error: any) {
//     console.error("Error generating or parsing study material:", error);
//     return new Response(
//       JSON.stringify({
//         message: "Failed to generate or save study material.",
//         error: error.message,
//       }),
//       { status: 500, headers: { "Content-Type": "application/json" } }
//     );
//   }
// }

/* eslint-disable @typescript-eslint/no-explicit-any */
import { db } from "@/configs/db";
import { STUDY_MATERIAL_TABLE } from "@/configs/schema";
import { inngest } from "@/inngest/client";
import { GoogleGenerativeAI } from "@google/generative-ai";
import JSON5 from "json5"; // Ensure JSON5 is installed

const ai = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY!);
const model = ai.getGenerativeModel({
  model: "gemini-2.5-flash-preview-04-17",
});

export async function POST(req: Request) {
  try {
    const { formData } = await req.json();
    const { difficultyLevel, topic, studyType, courseId, createdBy } = formData;

    // Validate required fields
    if (!difficultyLevel || !topic || !studyType || !courseId || !createdBy) {
      return new Response(
        JSON.stringify({ message: "Missing required fields in formData." }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const prompt = `Generate a study material for ${topic} for ${studyType} with a difficulty level of ${difficultyLevel}. The output should be a JSON object with the following structure and include **at least ten chapters**, each with an equivalent emoji:

    {
      "courseTitle": "Title of the course",
      "level": "Easy | Medium | Hard",
      "courseSummary": "A concise summary of the entire course. 🚀",
      "chapters": [
        {
          "chapterNumber": 1,
          "chapterTitle": "Introduction to the Topic",
          "chapterSummary": "A brief overview of the fundamental concepts. 💡",
          "emoji": "📚",
          "topics": [
            "Basic concept 1",
            "Basic concept 2"
          ]
        },
        {
          "chapterNumber": 2,
          "chapterTitle": "Deep Dive into Core Principles",
          "chapterSummary": "Exploring the essential theories in detail. 🔍",
          "emoji": "⚛️",
          "topics": [
            "Core principle A",
            "Core principle B"
          ]
        },
        {
          "chapterNumber": 3,
          "chapterTitle": "Practical Applications and Examples",
          "chapterSummary": "Illustrating the concepts with real-world examples. 🛠️",
          "emoji": "💡",
          "topics": [
            "Application case 1",
            "Application case 2"
          ]
        },
        {
          "chapterNumber": 4,
          "chapterTitle": "Advanced Concepts and Theories",
          "chapterSummary": "Delving into more complex aspects of the subject. 🧠",
          "emoji": "🚀",
          "topics": [
            "Advanced theory X",
            "Advanced theory Y"
          ]
        },
        {
          "chapterNumber": 5,
          "chapterTitle": "Problem-Solving Techniques",
          "chapterSummary": "Strategies for tackling challenges related to the topic. 🧩",
          "emoji": "🔑",
          "topics": [
            "Technique 1",
            "Technique 2"
          ]
        },
        {
          "chapterNumber": 6,
          "chapterTitle": "Case Studies and Analysis",
          "chapterSummary": "Examining specific scenarios and their implications. 🧐",
          "emoji": "📊",
          "topics": [
            "Case study A",
            "Case study B"
          ]
        },
        {
          "chapterNumber": 7,
          "chapterTitle": "Emerging Trends and Future Directions",
          "chapterSummary": "Exploring the latest developments and potential future paths. 🌱",
          "emoji": "🔮",
          "topics": [
            "Trend 1",
            "Trend 2"
          ]
        },
        {
          "chapterNumber": 8,
          "chapterTitle": "Review and Consolidation",
          "chapterSummary": "Summarizing key takeaways and reinforcing learning. 🔄",
          "emoji": "📝",
          "topics": [
            "Key concept review",
            "Practice questions"
          ]
        },
        {
          "chapterNumber": 9,
          "chapterTitle": "Further Exploration and Resources",
          "chapterSummary": "Guiding learners to additional materials and learning avenues. 🔭",
          "emoji": "🔗",
          "topics": [
            "Recommended readings",
            "Online resources"
          ]
        },
        {
          "chapterNumber": 10,
          "chapterTitle": "Final Assessment and Next Steps",
          "chapterSummary": "Evaluating understanding and outlining future learning paths. ✅",
          "emoji": "🎓",
          "topics": [
            "Quiz/Test",
            "Next level studies"
          ]
        }
      ]
    }

    Please ensure the entire response is a valid JSON string adhering to the structure above, contains at least ten distinct chapters, and each chapter object includes an "emoji" field with a relevant emoji. Feel free to choose emojis that you believe best represent the chapter's theme. I've provided some examples, but you can use your own judgment. The course summary should also have a relevant emoji.
    `;

    const result = await model.generateContent([prompt]);
    let textResponse = (await result.response.text()).trim();

    // Remove potential markdown fences
    textResponse = textResponse
      .replace(/^```(?:json)?\s*/, "")
      .replace(/\s*```$/, "")
      .trim();

    // Remove non-ASCII characters early in cleaning
    textResponse = textResponse.replace(/[^\x00-\x7F]/g, "");

    // Additional cleaning to fix common JSON issues
    textResponse = textResponse
      .replace(/([{,]\s*)([a-zA-Z0-9_-]+)\s*:/g, '$1"$2":') // Quote keys
      .replace(/,(\s*[}\]])/g, "$1") // Remove trailing commas
      .replace(/:\s*"(.*?)"/g, (match, value) => {
        return `: "${value
          .replace(/\\"/g, '"')
          .replace(/[\r\n]+/g, "\\n")
          .replace(/[\u0000-\u001F\u007F-\u009F]/g, "")}"`;
      });

    let parsedJSON;
    try {
      parsedJSON = JSON5.parse(textResponse);
    } catch (parseErr: any) {
      console.error("Failed to parse JSON5:", parseErr);
      try {
        parsedJSON = JSON.parse(textResponse);
        console.warn("JSON5 parsing failed; fallback to standard JSON.");
      } catch (jsonParseErr: any) {
        return new Response(
          JSON.stringify({
            message: "Parsing error despite cleanup.",
            error: jsonParseErr.message,
            raw: textResponse,
          }),
          { status: 500, headers: { "Content-Type": "application/json" } }
        );
      }
    }

    // Save to database
    const dbResult = await db
      .insert(STUDY_MATERIAL_TABLE)
      .values({
        courseId,
        createdBy,
        courseType: studyType,
        difficultyLevel,
        topic,
        courseLayout: parsedJSON,
      })
      .returning();

    // Trigger event for generated notes
    await inngest.send({
      name: "notes.generate",
      data: {
        course: dbResult[0],
      },
    });

    return new Response(JSON.stringify(dbResult[0]), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error: any) {
    console.error("Error in study material generation:", error);
    return new Response(
      JSON.stringify({
        message: "Error in generating study material.",
        error: error.message,
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
