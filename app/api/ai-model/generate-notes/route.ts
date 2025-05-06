/* eslint-disable @typescript-eslint/no-explicit-any */
// import { GoogleGenerativeAI } from "@google/generative-ai";

// const ai = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY!);

// const model = ai.getGenerativeModel({
//   model: "gemini-2.5-flash-preview-04-17",
// });

// export async function POST(req: Request) {
//   try {
//     const { prompt } = await req.json();

//     if (!prompt) {
//       return Response.json({ message: "Prompt is required." }, { status: 400 });
//     }
//     const finalPrompt = `Generate exam material detail content for each chapter, Make sure to includes all topic point in the content, make sure to give content in HTML format (Do not Add HTMLKL, Head, Body, title tag), The chapters: ${prompt}`;

//     const result = await model.generateContent([finalPrompt]);
//     const rawText = result.response.text().trim();
//     // console.log("rawText row", rawText);

//     // Remove Markdown code block formatting like ```json or ```html
//     const cleanedText = rawText
//       .replace(/^```(?:json|html)?\s*/, "")
//       .replace(/```$/, "")
//       .trim();

//     let parsed;
//     try {
//       parsed = JSON.parse(cleanedText);
//     } catch {
//       parsed = cleanedText; // likely HTML content
//     }

//     // console.log("parsed row", parsed);

//     return Response.json({
//       parsed,
//       message: "Notes generated successfully.",
//     });
//   } catch (error: any) {
//     console.error("Error generating notes:", error);

//     return Response.json(
//       {
//         message: "Failed to generate notes.",
//         error: error.message,
//       },
//       { status: 500 }
//     );
//   }
// }

import { GoogleGenerativeAI } from "@google/generative-ai";

const ai = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY!);
const model = ai.getGenerativeModel({
  model: "gemini-2.5-flash-preview-04-17",
});

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();

    if (!prompt) {
      return Response.json({ message: "Prompt is required." }, { status: 400 });
    }

    const finalPrompt = `Generate exam material detail content for each chapter. 
Ensure the content includes all topic points for each chapter. 
Provide the content in valid HTML format.  Do NOT include <html>, <head>, <body>, or <title> tags.
The chapter information is: ${prompt}`;

    const result = await model.generateContent([finalPrompt]);
    const rawText = result.response.text().trim();

    // 1. Remove leading/trailing whitespace and code blocks
    let cleanedText = rawText
      .replace(/^```(?:json|html)?\s*/, "") // Remove leading ```json or ```html (and whitespace)
      .replace(/```$/, "") // Remove trailing ```
      .trim();

    // 2. Handle potential JSON within the HTML (if the AI mistakenly formats it)
    let parsed: any;
    if (cleanedText.startsWith("{") || cleanedText.startsWith("[")) {
      try {
        parsed = JSON.parse(cleanedText);
        return Response.json({
          parsed,
          message: "Notes generated successfully (as JSON).",
        });
      } catch (jsonError) {
        // If it's not valid JSON, we assume it's HTML (or malformed output) and proceed.
        console.warn(
          "AI output was not valid JSON, proceeding as HTML. Original error:",
          jsonError
        );
        parsed = cleanedText; // Keep the cleanedText as is
      }
    } else {
      parsed = cleanedText;
    }

    cleanedText = cleanedText
      .replace(/<script[^>]*>.*?<\/script>/gi, "") // Remove script tags (VERY IMPORTANT)
      .replace(/<style[^>]*>.*?<\/style>/gi, "") // Remove style tags
      .replace(/<!--[\s\S]*?-->/g, "") // Remove HTML comments
      .replace(/<(\w+)\s*>/g, "<$1>") // Normalize tags with whitespace
      .replace(/<br>/gi, "<br/>") // Self-close <br> tags
      .trim();

    parsed = cleanedText;

    return Response.json({
      parsed,
      message: "Notes generated successfully.",
    });
  } catch (error: any) {
    console.error("Error generating notes:", error);
    return Response.json(
      {
        message: "Failed to generate notes.",
        error: error.message,
      },
      { status: 500 }
    );
  }
}
