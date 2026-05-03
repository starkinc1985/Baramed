import { SignJWT, jwtVerify } from "jose";

const SECRET_ENV = "ADMIN_SESSION_SECRET";

export function getJwtSecretKey(): Uint8Array {
  const secret = process.env[SECRET_ENV];
  if (!secret || secret.length < 32) {
    throw new Error(
      `${SECRET_ENV} must be set to a random string at least 32 characters long`,
    );
  }
  return new TextEncoder().encode(secret);
}

export type AdminJwtPayload = {
  sub: string;
  email: string;
  role: "ADMINISTRATOR";
};

export async function signAdminToken(payload: AdminJwtPayload): Promise<string> {
  return new SignJWT({
    email: payload.email,
    role: payload.role,
  })
    .setProtectedHeader({ alg: "HS256" })
    .setSubject(payload.sub)
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(getJwtSecretKey());
}

export async function verifyAdminToken(
  token: string,
): Promise<AdminJwtPayload | null> {
  try {
    const { payload } = await jwtVerify(token, getJwtSecretKey(), {
      algorithms: ["HS256"],
    });
    const sub = payload.sub;
    const email = payload.email;
    const role = payload.role;
    if (
      typeof sub !== "string" ||
      typeof email !== "string" ||
      role !== "ADMINISTRATOR"
    ) {
      return null;
    }
    return { sub, email, role: "ADMINISTRATOR" };
  } catch {
    return null;
  }
}
