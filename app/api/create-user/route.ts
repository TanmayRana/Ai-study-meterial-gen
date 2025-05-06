import { inngest } from "@/inngest/client";

export async function POST(request: Request) {
  const { user } = await request.json();

  const result = await inngest.send({
    name: "user.create",
    data: {
      user: user,
    },
  });

  return Response.json({
    result: result,
    message: "User created successfully!",
    status: 200,
  });
}
