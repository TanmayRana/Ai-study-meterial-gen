/* eslint-disable @typescript-eslint/no-explicit-any */
// // pages/api/generate-study-material.js
// import { GoogleGenAI } from "@google/genai";

// const ai = new GoogleGenAI({
//   apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY,
// });
// const config = {
//   responseMimeType: "application/json",
// };
// const model = "gemini-2.5-flash-preview-04-17";

// export async function POST(req: Request, res: Response) {
//   //   const { prompt } = await req.json();
//   const { difficultyLevel, topic, studyType } = await req.json();

//   const defaultPrompt = `Generate a study material for ${topic} for ${studyType} and level of difficulty will be ${difficultyLevel} with summery of course, List of Chapters along with summery for each chapter, Topic list in each chapter, All result in JSON format`;

//   const contents = [
//     {
//       role: "user",
//       parts: [
//         {
//           text: defaultPrompt,
//         },
//       ],
//     },
//   ];

//   try {
//     const response = await ai.models.generateContent({
//       model,
//       config,
//       contents,
//     });

//     const textResponse = response.response.candidates[0].content.parts[0].text;

//     // Attempt to parse the JSON response
//     try {
//       const studyMaterialJSON = JSON.parse(textResponse);
//       res.status(200).json(studyMaterialJSON);
//     } catch (jsonError) {
//       console.error("Error parsing JSON:", jsonError);
//       console.error("Raw response from Gemini:", textResponse);
//       res.status(500).json({
//         message: "Failed to parse the generated study material as JSON.",
//       });
//     }
//   } catch (error) {
//     console.error("Error generating content:", error);
//     res.status(500).json({
//       message: "Failed to generate study material.",
//       error: error.message,
//     });
//   }
// }

// import { GoogleGenAI } from "@google/genai";

// import { GoogleGenerativeAI } from "@google/generative-ai";

// const ai = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY!);

// const config = {
//   responseMimeType: "application/json",
// };

// // const model = "gemini-2.5-flash-preview-04-17";

// const model = ai.getGenerativeModel({
//   model: "gemini-2.5-flash-preview-04-17",
// });

// export async function POST(req: Request) {
//   try {
//     const { formData } = await req.json();
//     console.log("formData=", formData);
//     const { difficultyLevel, topic, studyType } = formData;

//     const prompt = `Generate a study material for ${topic} for ${studyType} and level of difficulty will be ${difficultyLevel} with summary of course, list of chapters along with summary for each chapter, topic list in each chapter. Return the result strictly in raw JSON format only without markdown or code block formatting.`;

//     const contents = [
//       {
//         role: "user",
//         parts: [
//           {
//             text: prompt,
//           },
//         ],
//       },
//     ];
//   } catch (error: any) {
//     console.error("Error generating or parsing study material:", error);
//     return new Response(
//       JSON.stringify({
//         message: "Failed to generate or parse study material.",
//         error: error.message,
//       }),
//       { status: 500, headers: { "Content-Type": "application/json" } }
//     );
//   }
// }

// import { db } from "@/configs/db";
// import { STUDY_MATERIAL_TABLE } from "@/configs/schema";
// import { GoogleGenerativeAI } from "@google/generative-ai";

// const ai = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY!);

// const model = ai.getGenerativeModel({
//   model: "gemini-2.5-flash-preview-04-17",
// });

// export async function POST(req: Request) {
//   try {
//     const { formData } = await req.json();
//     console.log("formData=", formData);

//     const { difficultyLevel, topic, studyType, courseId, createdBy } = formData;

//     const prompt = `Generate a study material for ${topic} for ${studyType} and level of difficulty will be ${difficultyLevel} with summary of course, list of chapters along with summary for each chapter, topic list in each chapter. Return the result strictly in raw JSON format only without markdown or code block formatting.`;

//     const result = await model.generateContent([prompt]);
//     const textResponse = result.response.text().trim();

//     // Remove markdown code block formatting if present
//     let cleaned = textResponse;
//     if (cleaned.startsWith("```json")) {
//       cleaned = cleaned
//         .replace(/^```json/, "")
//         .replace(/```$/, "")
//         .trim();
//     } else if (cleaned.startsWith("```")) {
//       cleaned = cleaned.replace(/^```/, "").replace(/```$/, "").trim();
//     }

//     const parsedJSON = JSON.parse(cleaned);
//     const dbResult = await db
//       .insert(STUDY_MATERIAL_TABLE)
//       .values({
//         courseId: courseId,
//         createdBy: createdBy,
//         courseType: studyType,
//         difficultyLevel: difficultyLevel,
//         topic: topic,
//         courseLayout: parsedJSON,
//       })
//       .returning("*");

//     return new Response(JSON.stringify(parsedJSON), {
//       status: 200,
//       headers: { "Content-Type": "application/json" },
//     });
//   } catch (error: any) {
//     console.error("Error generating or parsing study material:", error);
//     return new Response(
//       JSON.stringify({
//         message: "Failed to generate or parse study material.",
//         error: error.message,
//       }),
//       { status: 500, headers: { "Content-Type": "application/json" } }
//     );
//   }
// }

// import { db } from "@/configs/db";
// import { STUDY_MATERIAL_TABLE } from "@/configs/schema";
// import { inngest } from "@/inngest/client";
// import { GoogleGenerativeAI } from "@google/generative-ai";

// const ai = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY!);

// const model = ai.getGenerativeModel({
//   model: "gemini-2.5-flash-preview-04-17",
// });

// export async function POST(req: Request) {
//   try {
//     const { formData } = await req.json();
//     // console.log("formData=", formData);

//     const { difficultyLevel, topic, studyType, courseId, createdBy } = formData;

//     if (!difficultyLevel || !topic || !studyType || !courseId || !createdBy) {
//       return new Response(
//         JSON.stringify({ message: "Missing required fields in formData." }),
//         { status: 400, headers: { "Content-Type": "application/json" } }
//       );
//     }

//     const prompt = `Generate a study material for ${topic} for ${studyType} with a difficulty level of ${difficultyLevel}. The output should be a JSON object with the following structure and include **at least ten chapters**, each with an equivalent emoji:

// {
//   "courseSummary": "A concise summary of the entire course. 🚀",
//   "chapters": [
//     {
//       "chapterNumber": 1,
//       "chapterTitle": "Introduction to the Topic",
//       "chapterSummary": "A brief overview of the fundamental concepts. 💡",
//       "emoji": "📚",
//       "topics": [
//         "Basic concept 1",
//         "Basic concept 2"
//       ]
//     },
//     {
//       "chapterNumber": 2,
//       "chapterTitle": "Deep Dive into Core Principles",
//       "chapterSummary": "Exploring the essential theories in detail. 🔍",
//       "emoji": "⚛️",
//       "topics": [
//         "Core principle A",
//         "Core principle B"
//       ]
//     },
//     {
//       "chapterNumber": 3,
//       "chapterTitle": "Practical Applications and Examples",
//       "chapterSummary": "Illustrating the concepts with real-world examples. 🛠️",
//       "emoji": "💡",
//       "topics": [
//         "Application case 1",
//         "Application case 2"
//       ]
//     },
//     {
//       "chapterNumber": 4,
//       "chapterTitle": "Advanced Concepts and Theories",
//       "chapterSummary": "Delving into more complex aspects of the subject. 🧠",
//       "emoji": "🚀",
//       "topics": [
//         "Advanced theory X",
//         "Advanced theory Y"
//       ]
//     },
//     {
//       "chapterNumber": 5,
//       "chapterTitle": "Problem-Solving Techniques",
//       "chapterSummary": "Strategies for tackling challenges related to the topic. 🧩",
//       "emoji": "🔑",
//       "topics": [
//         "Technique 1",
//         "Technique 2"
//       ]
//     },
//     {
//       "chapterNumber": 6,
//       "chapterTitle": "Case Studies and Analysis",
//       "chapterSummary": "Examining specific scenarios and their implications. 🧐",
//       "emoji": "📊",
//       "topics": [
//         "Case study A",
//         "Case study B"
//       ]
//     },
//     {
//       "chapterNumber": 7,
//       "chapterTitle": "Emerging Trends and Future Directions",
//       "chapterSummary": "Exploring the latest developments and potential future paths. 🌱",
//       "emoji": "🔮",
//       "topics": [
//         "Trend 1",
//         "Trend 2"
//       ]
//     },
//     {
//       "chapterNumber": 8,
//       "chapterTitle": "Review and Consolidation",
//       "chapterSummary": "Summarizing key takeaways and reinforcing learning. 🔄",
//       "emoji": "📝",
//       "topics": [
//         "Key concept review",
//         "Practice questions"
//       ]
//     },
//     {
//       "chapterNumber": 9,
//       "chapterTitle": "Further Exploration and Resources",
//       "chapterSummary": "Guiding learners to additional materials and learning avenues. 🔭",
//       "emoji": "🔗",
//       "topics": [
//         "Recommended readings",
//         "Online resources"
//       ]
//     },
//     {
//       "chapterNumber": 10,
//       "chapterTitle": "Final Assessment and Next Steps",
//       "chapterSummary": "Evaluating understanding and outlining future learning paths. ✅",
//       "emoji": "🎓",
//       "topics": [
//         "Quiz/Test",
//         "Next level studies"
//       ]
//     }
//   ]
// }

// Please ensure the entire response is a valid JSON string adhering to the structure above, contains at least ten distinct chapters, and each chapter object includes an "emoji" field with a relevant emoji. Feel free to choose emojis that you believe best represent the chapter's theme. I've provided some examples, but you can use your own judgment. The course summary should also have a relevant emoji.
// `;

//     const result = await model.generateContent([prompt]);
//     const textResponse = result.response.text().trim();

//     // Remove markdown/code block formatting if present
//     const cleanedText = textResponse
//       .replace(/^```json/, "")
//       .replace(/^```/, "")
//       .replace(/```$/, "")
//       .trim();

//     const parsedJSON = JSON.parse(cleanedText);

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

//     const res = await inngest.send({
//       name: "notes.generate",
//       data: {
//         course: dbResult[0],
//       },
//     });

//     // console.log("res notes=", res);

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

// import { db } from "@/configs/db";
// import { STUDY_MATERIAL_TABLE } from "@/configs/schema";
// import { inngest } from "@/inngest/client";
// import { GoogleGenerativeAI } from "@google/generative-ai";

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
//     const textResponse = result.response.text().trim();

//     // Clean AI output (remove Markdown code blocks if present)
//     let cleanedText = textResponse
//       .replace(/^```json/, "")
//       .replace(/^```/, "")
//       .replace(/```$/, "")
//       .trim();

//     // Optional: fix common issues like trailing commas
//     cleanedText = cleanedText.replace(/,\s*}/g, "}").replace(/,\s*]/g, "]");

//     // Debug log to inspect AI response
//     // console.log("CleanedText from Gemini:\n", cleanedText);

//     // Safely parse JSON
//     // let parsedJSON;
//     // try {
//     //   parsedJSON = JSON.parse(cleanedText);
//     // } catch (parseErr: any) {
//     //   return new Response(
//     //     JSON.stringify({
//     //       message: "Failed to parse AI-generated JSON.",
//     //       error: parseErr.message,
//     //       raw: cleanedText,
//     //     }),
//     //     { status: 500, headers: { "Content-Type": "application/json" } }
//     //   );
//     // }

//     // Save to DB
//     const dbResult = await db
//       .insert(STUDY_MATERIAL_TABLE)
//       .values({
//         courseId,
//         createdBy,
//         courseType: studyType,
//         difficultyLevel,
//         topic,
//         courseLayout: JSON.parse(cleanedText),
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

/*
You are an educational content generator. Given a topic, study type, and difficulty level, return a JSON object with the following structure only. Do not include any markdown or commentary.

### INPUT
- Topic: ${topic}
- Study Type: ${studyType}
- Difficulty Level: ${difficultyLevel}

### OUTPUT FORMAT (in strict JSON)
{
  "courseTitle": "Title of the course",
  "level": "Easy | Medium | Hard",
  "courseSummary": "Short summary of the course...",
  "chapters": [
    {
  "chapterNumber": 1,
      "chapterTitle": "Chapter 1 title",
      "chapterSummary": "Short summary of Chapter 1",
      "topics": [
        "Topic 1 in Chapter 1",
        "Topic 2 in Chapter 1"
      ]
    },
    {
     "chapterNumber": 2,
      "chapterTitle": "Chapter 2 title",
      "chapterSummary": "Short summary of Chapter 2",
      "topics": [
        "Topic 1 in Chapter 2",
        "Topic 2 in Chapter 2"
      ]
    }
  ]
}
Return only valid JSON without markdown/code blocks.
`

*/

/*
const prompt = `Generate a study material for ${topic} for ${studyType} with a difficulty level of ${difficultyLevel}. The output should be a JSON object with the following structure:

{
 "courseTitle": "Title of the course",
  "level": "Easy | Medium | Hard",
  "courseSummary": "A concise summary of the entire course.",
  "chapters": [
    {
      "chapterNumber": 1,
      "chapterTitle": "Title of the first chapter",
      "chapterSummary": "A brief summary of this chapter.",
      "topics": [
        "Topic 1 within chapter 1",
        "Topic 2 within chapter 1",
        // ... more topics
      ]
    },
    {
      "chapterNumber": 2,
      "chapterTitle": "Title of the second chapter",
      "chapterSummary": "A brief summary of this chapter.",
      "topics": [
        "Topic A within chapter 2",
        "Topic B within chapter 2",
        // ... more topics
      ]
    },
    // ... more chapters
  ]
}

Please ensure the entire response is a valid JSON string adhering to the structure above.`;
*/

/*
const prompt = `Generate a study material for ${topic} for ${studyType} with a difficulty level of ${difficultyLevel}. The output should be a JSON object with the following structure and include **at least ten chapters**:

{
"courseTitle": "Title of the course",
  "level": "Easy | Medium | Hard",
  "courseSummary": "A concise summary of the entire course.",
  "chapters": [
    {
      "chapterNumber": 1,
      "chapterTitle": "Title of the first chapter",
      "chapterSummary": "A brief summary of this chapter.",
      "topics": [
        "Topic 1 within chapter 1",
        "Topic 2 within chapter 1"
        // ... more topics
      ]
    },
    {
      "chapterNumber": 2,
      "chapterTitle": "Title of the second chapter",
      "chapterSummary": "A brief summary of this chapter.",
      "topics": [
        "Topic A within chapter 2",
        "Topic B within chapter 2"
        // ... more topics
      ]
    },
    // ... at least 8 more chapter objects following this structure
    {
      "chapterNumber": 10,
      "chapterTitle": "Title of the tenth chapter",
      "chapterSummary": "A brief summary of this chapter.",
      "topics": [
        "Topic X within chapter 10",
        "Topic Y within chapter 10"
        // ... more topics
      ]
    }
  ]
}

Please ensure the entire response is a valid JSON string adhering to the structure above and contains at least ten distinct chapters.`;
*/

// import { db } from "@/configs/db";
// import { STUDY_MATERIAL_TABLE } from "@/configs/schema";
// import { inngest } from "@/inngest/client";
// import { GoogleGenerativeAI } from "@google/generative-ai";

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
//     const textResponse = result.response.text().trim();

//     // Clean AI output and attempt to fix common JSON errors
//     let cleanedText = textResponse
//       .replace(/^```json/, "")
//       .replace(/^```/, "")
//       .replace(/```$/, "")
//       .trim();

//     // Fix common JSON errors.  This is critical.
//     cleanedText = cleanedText
//       .replace(/([{,]\s*)([a-zA-Z0-9_-]+)\s*:/g, '$1"$2":') // Quote keys
//       .replace(/,(\s*[}\]])/g, "$1") // Remove trailing commas
//       .replace(/:\s*"(.*?)"/g, (match, value) => {
//         // Handle escaped quotes and newlines
//         return `: "${value.replace(/\\"/g, '"').replace(/\n/g, "\\n")}"`;
//       });

//     // Attempt to parse, with retry logic and more robust error handling.
//     let parsedJSON;
//     try {
//       parsedJSON = JSON.parse(cleanedText);
//     } catch (parseErr: any) {
//       console.error("JSON Parse Error, Attempting Repair:", parseErr);
//       try {
//         // Last ditch effort:  Replace unescaped newlines and tabs
//         cleanedText = cleanedText.replace(/\n/g, "\\n").replace(/\t/g, "\\t");
//         parsedJSON = JSON.parse(cleanedText);
//         console.warn("JSON Parse recovered with aggressive repair.");
//       } catch (secondParseError: any) {
//         return new Response(
//           JSON.stringify({
//             message: "Failed to parse AI-generated JSON, even after repair.",
//             error: secondParseError.message,
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

// import { db } from "@/configs/db";
// import { STUDY_MATERIAL_TABLE } from "@/configs/schema";
// import { inngest } from "@/inngest/client";
// import { GoogleGenerativeAI } from "@google/generative-ai";

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
//     const textResponse = result.response.text().trim();

//     // Clean AI output and attempt to fix common JSON errors
//     let cleanedText = textResponse
//       .replace(/^```json/, "")
//       .replace(/^```/, "")
//       .replace(/```$/, "")
//       .trim();

//     // Fix common JSON errors. This is critical.
//     cleanedText = cleanedText
//       .replace(/([{,]\s*)([a-zA-Z0-9_-]+)\s*:/g, '$1"$2":') // Quote keys
//       .replace(/,(\s*[}\]])/g, "$1") // Remove trailing commas
//       .replace(/:\s*"(.*?)"/g, (match, value) => {
//         // Handle escaped quotes and newlines
//         return `: "${value
//           .replace(/\\"/g, '"')
//           .replace(/\n/g, "\\n")
//           .replace(/\r/g, "\\r")}"`; // Include carriage return
//       });

//     // Attempt to parse, with retry logic and more robust error handling.
//     let parsedJSON;
//     try {
//       parsedJSON = JSON.parse(cleanedText);
//     } catch (parseErr: any) {
//       console.error("JSON Parse Error, Attempting Repair:", parseErr);
//       try {
//         // Last ditch effort: Replace unescaped newlines and tabs
//         cleanedText = cleanedText
//           .replace(/\n/g, "\\n")
//           .replace(/\t/g, "\\t")
//           .replace(/\r/g, "\\r"); // Keep carriage returns
//         parsedJSON = JSON.parse(cleanedText);
//         console.warn("JSON Parse recovered with aggressive repair.");
//       } catch (secondParseError: any) {
//         return new Response(
//           JSON.stringify({
//             message: "Failed to parse AI-generated JSON, even after repair.",
//             error: secondParseError.message,
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
//     const cleanedText = textResponse
//       .replace(/^```(?:json)?\s*/, "")
//       .replace(/\s*```$/, "")
//       .trim();

//     let parsedJSON;
//     try {
//       // Attempt to parse using JSON5 for greater leniency
//       parsedJSON = JSON5.parse(cleanedText);
//     } catch (parseErr: any) {
//       console.error("Failed to parse AI-generated JSON using JSON5:", parseErr);
//       return new Response(
//         JSON.stringify({
//           message: "Failed to parse AI-generated JSON.",
//           error: parseErr.message,
//           raw: cleanedText,
//         }),
//         { status: 500, headers: { "Content-Type": "application/json" } }
//       );
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

import { db } from "@/configs/db";
import { STUDY_MATERIAL_TABLE } from "@/configs/schema";
import { inngest } from "@/inngest/client";
import { GoogleGenerativeAI } from "@google/generative-ai";
import JSON5 from "json5"; // Ensure you have installed json5

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
    const textResponse = (await result.response.text()).trim();

    // Remove any markdown fences if present
    let cleanedText = textResponse
      .replace(/^```(?:json)?\s*/, "")
      .replace(/\s*```$/, "")
      .trim();

    // 1.  Handle common JSON errors with regex replacements
    cleanedText = cleanedText
      .replace(/([{,]\s*)([a-zA-Z0-9_-]+)\s*:/g, '$1"$2":') // Quote keys
      .replace(/,(\s*[}\]])/g, "$1") // Remove trailing commas
      .replace(/:\s*"(.*?)"/g, (match, value) => {
        return `: "${value
          .replace(/\\"/g, '"') // Unescape quotes
          .replace(/[\r\n]+/g, "\\n")}"`; // Convert newlines and carriage returns to escaped newlines
      });

    let parsedJSON;
    try {
      // Attempt to parse using JSON5 for greater leniency
      parsedJSON = JSON5.parse(cleanedText);
    } catch (parseErr: any) {
      console.error("Failed to parse AI-generated JSON using JSON5:", parseErr);
      // 2.  Alternative parsing with standard JSON, after more aggressive cleanup
      try {
        cleanedText = cleanedText
          .replace(/([{,]\s*)([a-zA-Z0-9_-]+)\s*:/g, '$1"$2":') // Ensure keys are quoted
          .replace(/,(\s*[}\]])/g, "$1") // Remove trailing commas
          .replace(/:\s*"(.*?)"/g, (match, value) => {
            return `: "${value
              .replace(/\\"/g, '"')
              .replace(/[\r\n]+/g, "\\n")}"`;
          });
        parsedJSON = JSON.parse(cleanedText);
        console.warn(
          "JSON5 parse failed; falling back to standard JSON after cleanup."
        );
      } catch (jsonParseErr: any) {
        // 3.  If all else fails, return the error.
        return new Response(
          JSON.stringify({
            message:
              "Failed to parse AI-generated JSON, even after aggressive repair.",
            error: jsonParseErr.message,
            raw: cleanedText,
          }),
          { status: 500, headers: { "Content-Type": "application/json" } }
        );
      }
    }

    // Save to DB
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

    // Trigger event
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
    console.error("Error generating or parsing study material:", error);
    return new Response(
      JSON.stringify({
        message: "Failed to generate or save study material.",
        error: error.message,
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
