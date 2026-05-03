import { redirect } from "next/navigation";

import { prisma } from "@/lib/prisma";
import SetupForm from "./SetupForm";

export default async function AdminSetupPage() {
  const count = await prisma.user.count();
  if (count > 0) {
    redirect("/admin/login");
  }
  return <SetupForm />;
}
