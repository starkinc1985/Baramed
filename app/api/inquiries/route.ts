import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { optionalString, requiredInt, requiredString } from "@/lib/validators";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const name = requiredString(body.name, "name");
    const email = requiredString(body.email, "email");
    const phone = optionalString(body.phone);
    const company = optionalString(body.company);
    const subject = optionalString(body.subject);
    const message = requiredString(body.message, "message");

    const type =
      body.type === "QUOTE" || body.type === "CONTACT" ? body.type : "CONTACT";

    const items = Array.isArray(body.items) ? body.items : [];
    const attachments = Array.isArray(body.attachments) ? body.attachments : [];

    const inquiry = await prisma.inquiry.create({
      data: {
        type,
        name,
        email,
        phone,
        company,
        subject,
        message,
        items: {
          create: items.map((it: any) => ({
            productId: typeof it.productId === "string" ? it.productId : null,
            productCodeSnapshot: optionalString(it.productCode),
            productNameSnapshot: optionalString(it.productName),
            quantity: requiredInt(it.quantity, "quantity"),
            notes: optionalString(it.notes),
          })),
        },
        attachments: {
          create: attachments.map((a: any) => ({
            fileName: requiredString(a.fileName, "fileName"),
            mimeType: optionalString(a.mimeType),
            size: typeof a.size === "number" ? a.size : null,
            url: requiredString(a.url, "url"),
          })),
        },
      },
      include: { items: true, attachments: true },
    });

    return NextResponse.json({ inquiry });
  } catch (e) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "Bad request" },
      { status: 400 },
    );
  }
}

