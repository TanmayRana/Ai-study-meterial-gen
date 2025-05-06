// import Stripe from "stripe";

import Stripe from "stripe";

// export async function POST(request: Request) {
//   const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

//   // This is the url to which the customer will be redirected when they're done
//   // managing their billing with the portal.
//   //   const returnUrl = process.env.HOST_URL;
//   const returnUrl = "https://student-attendance-tracking-delta.vercel.app/";
//   const customerId = await request.json();

//   const portalSession = await stripe.billingPortal.sessions.create({
//     customer: customerId,
//     return_url: returnUrl,
//   });

//   return new Response(JSON.stringify(portalSession));
// }

// import Stripe from "stripe";

// export async function POST(request: Request) {
//   const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
//     apiVersion: "2023-10-16", // Always specify API version
//   });

//   const { customerId } = await request.json(); // ✅ Destructure properly

//   if (!customerId) {
//     return new Response(JSON.stringify({ error: "Customer ID is required" }), {
//       status: 400,
//       headers: { "Content-Type": "application/json" },
//     });
//   }

//   const returnUrl = "https://student-attendance-tracking-delta.vercel.app/";

//   const portalSession = await stripe.billingPortal.sessions.create({
//     customer: customerId, // ✅ Now correctly a string
//     return_url: returnUrl,
//   });

//   return Response.json({ url: portalSession.url });
// }

// import Stripe from "stripe";
// import { NextResponse } from "next/server";

// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

// export async function POST(request: Request) {
//   try {
//     const { customerId } = await request.json();

//     if (!customerId) {
//       return NextResponse.json(
//         { error: "Missing customerId" },
//         { status: 400 }
//       );
//     }

//     const portalSession = await stripe.billingPortal.sessions.create({
//       customer: customerId,
//       return_url: "https://student-attendance-tracking-delta.vercel.app/",
//     });

//     return NextResponse.json({ url: portalSession.url });
//   } catch (error) {
//     console.error("[STRIPE_MANAGE_PAYMENT_ERROR]", error);
//     return NextResponse.json(
//       { error: "Something went wrong while creating portal session." },
//       { status: 500 }
//     );
//   }
// }

// import Stripe from "stripe";
// import { NextResponse } from "next/server";

// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

// export async function POST(request: Request) {
//   try {
//     const { customerId } = await request.json();

//     if (!customerId) {
//       return NextResponse.json(
//         { error: "Missing customerId" },
//         { status: 400 }
//       );
//     }

//     // Ensure Stripe is initialized and the secret key is correctly set.
//     if (!stripe) {
//       console.error("Stripe is not initialized.");
//       return NextResponse.json(
//         {
//           error:
//             "Stripe is not initialized.  Check your server-side configuration.",
//         },
//         { status: 500 }
//       );
//     }

//     try {
//       const portalSession = await stripe.billingPortal.sessions.create({
//         customer: customerId,
//         return_url: "https://student-attendance-tracking-delta.vercel.app/", // Use your actual return URL
//       });

//       return NextResponse.json({ url: portalSession.url });
//     } catch (stripeError: any) {
//       console.error("[STRIPE_MANAGE_PAYMENT_ERROR] Stripe Error:", stripeError);
//       return NextResponse.json(
//         {
//           error: `Stripe error: ${
//             stripeError.message || "Failed to create portal session"
//           }`,
//         },
//         { status: 500 }
//       );
//     }
//   } catch (error: any) {
//     console.error("[STRIPE_MANAGE_PAYMENT_ERROR]  General Error:", error);
//     return NextResponse.json(
//       {
//         error:
//           "Something went wrong while creating portal session: " +
//           error.message,
//       },
//       { status: 500 }
//     );
//   }
// }

export async function POST(request: Request) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

  //   const returnUrl = "https://my-clerk-mongoapp.vercel.app";
  // TODO: Change this to your actual return URL
  const returnUrl = "https://my-clerk-mongoapp.vercel.app";
  const { customerId } = await request.json();
  console.log("customerId", customerId);

  const portalSession = await stripe.billingPortal.sessions.create({
    customer: customerId,
    return_url: returnUrl,
  });

  return Response.json({ url: portalSession.url });
}
