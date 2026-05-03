<<<<<<< HEAD
import { Inter } from "next/font/google";
import "../globals.css";
import type { Metadata } from "next";
import Proivder from "./Provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Bäramed | Surgical Instruments",
  description: "Premium surgical instruments and medical equipment",
  icons: {
    icon: "/images/favicon.ico",
  },
};

export default function RootLayout({
=======
import Proivder from "./Provider";

/**
 * Public site shell (header, footer, theme). Routes outside `app/(site)/` (e.g. /admin) use
 * only the root `app/layout.tsx` without this wrapper.
 */
export default function SiteLayout({
>>>>>>> 6f7bc4d (Moiz db commit)
  children,
}: {
  children: React.ReactNode;
}) {
<<<<<<< HEAD
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`dark:bg-black ${inter.className}`}>
        <Proivder>{children}</Proivder>
      </body>
    </html>
  );
=======
  return <Proivder>{children}</Proivder>;
>>>>>>> 6f7bc4d (Moiz db commit)
}
