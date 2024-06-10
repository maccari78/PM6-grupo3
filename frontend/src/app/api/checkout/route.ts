import { IPost } from "@/components/VehiclesComponent/interfaces/IPost";
import { NextRequest, NextResponse } from "next/server";
import { Stripe } from "stripe";

interface IBody {
  postState: IPost;
  pricePost: number;
}

export async function POST(req: NextRequest) {
  const body: IBody = await req.json();
  const nameProduct = `${body.postState.car.brand} ${body.postState.car.model} ${body.postState.car.year}`;
  const priceProduct = body.pricePost as number;

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
    apiVersion: "2024-04-10",
  });

  const session = await stripe.checkout.sessions.create({
    success_url: `http://localhost:3000/successcheckout/${body.postState.id}`,
    cancel_url: `http://localhost:3000/`,
    line_items: [
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: nameProduct,
            images: [body.postState.car.image_url[0]],
          },
          unit_amount: priceProduct * 100,
        },
        quantity: 1,
      },
    ],
    mode: "payment",
  });

  console.log(session);

  return NextResponse.json(session);
}
