import { inngest } from "@/inngest/client";

export async function POST(request: Request) {
  const { course } = await request.json();

  const result = await inngest.send({
    name: "notes.generate",
    data: {
      course: course,
    },
  });

  return Response.json({
    result: result,
    message: "Notes generated successfully!",
    status: 200,
  });
}
