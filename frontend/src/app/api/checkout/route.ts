import { NextRequest, NextResponse } from "next/server";
import { Stripe } from "stripe";

export async function POST(req: NextRequest) {
  const data = await req.json();
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    payment_method_types: ["card"],
    line_items: [
      {
        price: data.priceId,
        quantity: 1,
      },
    ],
    success_url: "http://localhost:3000/successcheckout",
    cancel_url: "http://localhost:3000",
  });

  console.log(session);

  return NextResponse.json({ url: session.url });
}
