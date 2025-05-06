// /* eslint-disable @typescript-eslint/no-explicit-any */
// import { GoogleGenerativeAI } from "@google/generative-ai";

// const ai = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY!);

// const model = ai.getGenerativeModel({
//   model: "gemini-2.5-flash-preview-04-17",
// });

// export async function POST(req: Request) {
//   try {
//     const { prompt } = await req.json();

//     const result = await model.generateContent([prompt]);
//     const response = await result.response;
//     const rawText = response.text().trim();

//     if (!rawText) {
//       return Response.json(
//         { message: "No response received from the model." },
//         { status: 500 }
//       );
//     }

//     // Clean markdown formatting and try to normalize JSON
//     let cleanedText = rawText
//       .replace(/^```(?:json)?\s*/, "")
//       .replace(/\s*```$/, "")
//       .trim();

//     // Normalize the keys if needed (e.g., missing quotes)
//     cleanedText = cleanedText
//       .replace(/([{,]\s*)([a-zA-Z0-9_-]+)\s*:/g, '$1"$2":')
//       .replace(/,(\s*[}\]])/g, "$1") // Remove trailing commas
//       .replace(/:\s*"(.*?)"/g, (match, value) => {
//         return `: "${value
//           .replace(/\\"/g, '"') // Unescape quotes
//           .replace(/[\r\n]+/g, "\\n")}"`; // Convert line breaks
//       });

//     try {
//       const parsed = JSON.parse(cleanedText);
//       console.log("parsed=", parsed);
//       return Response.json({
//         message: "Flashcards generated successfully.",
//         data: parsed,
//       });
//     } catch (jsonError: any) {
//       console.error("Error parsing JSON:", jsonError);
//       console.error("Cleaned Text:", cleanedText);
//       return Response.json(
//         {
//           message: "Failed to parse the model's output as JSON.",
//           error: jsonError.message,
//           raw: cleanedText,
//         },
//         { status: 500 }
//       );
//     }
//   } catch (error: any) {
//     console.error("Error generating flashcards:", error);
//     return Response.json(
//       {
//         message: "Server error while generating flashcards.",
//         error: error.message,
//       },
//       { status: 500 }
//     );
//   }
// }

/* eslint-disable @typescript-eslint/no-explicit-any */
// import { GoogleGenerativeAI } from "@google/generative-ai";

// const ai = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY!);

// const model = ai.getGenerativeModel({
//   model: "gemini-2.5-flash-preview-04-17",
// });

// export async function POST(req: Request) {
//   try {
//     const { prompt } = await req.json();

//     const result = await model.generateContent([prompt]);
//     const response = await result.response;
//     const rawText = response.text().trim();

//     if (!rawText) {
//       return Response.json(
//         { message: "No response received from the model." },
//         { status: 500 }
//       );
//     }

//     // Step 1: Remove Markdown code block formatting
//     let cleanedText = rawText
//       .replace(/^```(?:json)?\s*/, "")
//       .replace(/\s*```$/, "")
//       .trim();

//     // Step 2: Attempt to fix common JSON formatting issues
//     cleanedText = cleanedText
//       // Quote keys: { key: value } → { "key": value }
//       .replace(/([{,]\s*)([a-zA-Z0-9_-]+)\s*:/g, '$1"$2":')
//       // Remove trailing commas: [1,2,3,] or { "a": 1, }
//       .replace(/,\s*([\]}])/g, "$1")
//       // Escape newlines in strings
//       .replace(/:\s*"([^"]*)"/g, (match: string, value: string) => {
//         const escaped = value
//           .replace(/\\/g, "\\\\") // Escape backslashes
//           .replace(/"/g, '\\"') // Escape quotes
//           .replace(/\n/g, "\\n") // Escape newlines
//           .replace(/\r/g, ""); // Remove carriage returns
//         return `: "${escaped}"`;
//       });

//     // Optional: Log cleaned JSON string for debugging
//     console.log("Cleaned JSON text:\n", cleanedText);

//     try {
//       const parsed = JSON.parse(cleanedText);
//       console.log("Parsed JSON:", parsed);
//       return Response.json({
//         message: "Flashcards generated successfully.",
//         data: parsed,
//       });
//     } catch (jsonError: any) {
//       console.error("JSON parse error:", jsonError.message);
//       console.error("Problematic JSON:\n", cleanedText);
//       return Response.json(
//         {
//           message: "Failed to parse the model's output as JSON.",
//           error: jsonError.message,
//           raw: cleanedText,
//         },
//         { status: 500 }
//       );
//     }
//   } catch (error: any) {
//     console.error("Error generating flashcards:", error);
//     return Response.json(
//       {
//         message: "Server error while generating flashcards.",
//         error: error.message,
//       },
//       { status: 500 }
//     );
//   }
// }

/* eslint-disable @typescript-eslint/no-explicit-any */
import { GoogleGenerativeAI } from "@google/generative-ai";

const ai = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY!);

const model = ai.getGenerativeModel({
  model: "gemini-2.5-flash-preview-04-17",
});

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();

    const result = await model.generateContent([prompt]);
    const response = await result.response;
    const rawText = response.text().trim();

    if (!rawText) {
      return Response.json(
        { message: "No response received from the model." },
        { status: 500 }
      );
    }

    // Step 1: Remove Markdown code block formatting
    let cleanedText = rawText
      .replace(/^```(?:json)?\s*/, "")
      .replace(/\s*```$/, "")
      .trim();

    // Step 2: Attempt to fix common JSON formatting issues
    cleanedText = cleanedText
      // Quote keys: { key: value } → { "key": value }
      .replace(/([{,]\s*)([a-zA-Z0-9_-]+)\s*:/g, '$1"$2":')
      // Remove trailing commas: [1,2,3,] or { "a": 1, }
      .replace(/,\s*([\]}])/g, "$1")
      // Escape newlines in strings
      .replace(/:\s*"([^"]*)"/g, (match: string, value: string) => {
        const escaped = value
          .replace(/\\/g, "\\\\") // Escape backslashes
          .replace(/"/g, '\\"') // Escape quotes
          .replace(/\n/g, "\\n") // Escape newlines
          .replace(/\r/g, ""); // Remove carriage returns
        return `: "${escaped}"`;
      });

    // Optional: Log cleaned JSON string for debugging
    console.log("Cleaned JSON text:\n", cleanedText);

    try {
      const parsed = JSON.parse(cleanedText);
      console.log("Parsed JSON:", parsed);
      return Response.json({
        message: "Flashcards generated successfully.",
        data: parsed,
      });
    } catch (jsonError: any) {
      console.error("JSON parse error:", jsonError.message);
      console.error("Problematic JSON:\n", cleanedText);
      let attemptedParsedRaw: any = null;
      try {
        attemptedParsedRaw = JSON.parse(cleanedText);
      } catch (e) {
        console.error("Failed to parse raw text as JSON:", e);
      }
      return Response.json(
        {
          message: "Failed to parse the model's output as JSON.",
          error: jsonError.message,
          raw: cleanedText,
          attemptedParsed: attemptedParsedRaw, // Include the attempted parse
        },
        { status: 500 }
      );
    }
  } catch (error: any) {
    console.error("Error generating flashcards:", error);
    return Response.json(
      {
        message: "Server error while generating flashcards.",
        error: error.message,
      },
      { status: 500 }
    );
  }
}
