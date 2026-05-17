import { redirect } from "next/navigation";
import { connectDB } from "@/lib/db";
import { User } from "@/models/User";
import SetupForm from "./SetupForm";

export default async function AdminSetupPage() {
  await connectDB();
  const count = await User.countDocuments();
  if (count > 0) {
    redirect("/admin/login");
  }
  return <SetupForm />;
}
