import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Inquiry } from "@/models/Inquiry";
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
    const type = body.type === "QUOTE" || body.type === "CONTACT" ? body.type : "CONTACT";

    const items = Array.isArray(body.items) ? body.items : [];
    const attachments = Array.isArray(body.attachments) ? body.attachments : [];

    await connectDB();

    const inquiry = await Inquiry.create({
      type,
      name,
      email,
      phone,
      company,
      subject,
      message,
      items: items.map((it: any) => ({
        productId: typeof it.productId === "string" ? it.productId : undefined,
        productCodeSnapshot: optionalString(it.productCode),
        productNameSnapshot: optionalString(it.productName),
        quantity: requiredInt(it.quantity, "quantity"),
        notes: optionalString(it.notes),
      })),
      attachments: attachments.map((a: any) => ({
        fileName: requiredString(a.fileName, "fileName"),
        mimeType: optionalString(a.mimeType),
        size: typeof a.size === "number" ? a.size : undefined,
        url: requiredString(a.url, "url"),
      })),
    });

    return NextResponse.json({ inquiry });
  } catch (e) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "Bad request" },
      { status: 400 },
    );
  }
}
