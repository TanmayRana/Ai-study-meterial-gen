/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-explicit-any */
// import { db } from "@/configs/db";
// import { USER_TABLE } from "@/configs/schema";
// import { eq } from "drizzle-orm";
// import Stripe from "stripe";

// export async function POST(req: Request) {
//   const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
//   let data;
//   let eventType;
//   // Check if webhook signing is configured.
//   const webhookSecret = process.env.STRIPE_WEB_HOOK_KEY;
//   if (webhookSecret) {
//     // Retrieve the event by verifying the signature using the raw body and secret.
//     let event;
//     let signature = req.headers["stripe-signature"];

//     try {
//       event = stripe.webhooks.constructEvent(
//         req.body,
//         signature,
//         webhookSecret
//       );
//     } catch (err) {
//       console.log(`⚠️  Webhook signature verification failed.`);
//       return res.sendStatus(400);
//     }
//     // Extract the object from the event.
//     data = event.data;
//     eventType = event.type;
//   } else {
//     // Webhook signing is recommended, but if the secret is not configured in `config.js`,
//     // retrieve the event data directly from the request body.
//     data = req.body.data;
//     eventType = req.body.type;
//   }

//   switch (eventType) {
//     case "checkout.session.completed":
//       // Payment is successful and the subscription is created.
//       // You should provision the subscription and save the customer ID to your database.
//       await db
//         .update(USER_TABLE)
//         .set({ isMember: true })
//         .where(eq(USER_TABLE.email, data.customer_details.email))
//         .execute();

//       break;
//     case "invoice.paid":
//       // Continue to provision the subscription as payments continue to be made.
//       // Store the status in your database and check when a user accesses your service.
//       // This approach helps you avoid hitting rate limits.
//       //   Record to Payment-Record Table
//       break;
//     case "invoice.payment_failed":
//       // The payment failed or the customer does not have a valid payment method.
//       // The subscription becomes past_due. Notify your customer and send them to the
//       // customer portal to update their payment information.
//       break;
//     default:
//     // Unhandled event type
//   }
// }

import { NextApiRequest, NextApiResponse } from "next";
import { db } from "@/configs/db";
import { USER_TABLE } from "@/configs/schema";
import { eq } from "drizzle-orm";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export default async function POST(req: NextApiRequest, res: NextApiResponse) {
  const webhookSecret = process.env.STRIPE_WEBHOOK_KEY;

  let data;
  let eventType;

  if (webhookSecret) {
    // Retrieve the event by verifying the signature using the raw body and secret.
    let event;
    let signature = req.headers["stripe-signature"];

    try {
      event = stripe.webhooks.constructEvent(
        req.body,
        signature!,
        webhookSecret
      );
    } catch (err: any) {
      console.log(`⚠️  Webhook signature verification failed.`);
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }
    // Extract the object from the event.
    data = event.data;
    eventType = event.type;
  } else {
    // Webhook signing is recommended, but if the secret is not configured in `config.js`,
    // retrieve the event data directly from the request body.
    data = req.body.data;
    eventType = req.body.type;
  }

  switch (eventType) {
    case "checkout.session.completed":
      // Payment is successful and the subscription is created.
      // You should provision the subscription and save the customer ID to your database.
      await db
        .update(USER_TABLE)
        .set({ isMember: true, customerId: data.customer_details.id })
        .where(eq(USER_TABLE.email, data.customer_details.email));

      break;
    case "invoice.paid":
      // Continue to provision the subscription as payments continue to be made.
      // Store the status in your database and check when a user accesses your service.
      // This approach helps you avoid hitting rate limits.
      break;
    case "invoice.payment_failed":
      // The payment failed or the customer does not have a valid payment method.
      // The subscription becomes past_due. Notify your customer and send them to the
      // customer portal to update their payment information.
      await db
        .update(USER_TABLE)
        .set({ isMember: false })
        .where(eq(USER_TABLE.email, data.customer_details.email));

      break;
    default:
    // Unhandled event type
  }

  res.status(200).json({ received: "success" });
}
