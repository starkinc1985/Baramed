import Proivder from "./Provider";

/**
 * Public site shell (header, footer, theme). Routes outside `app/(site)/` (e.g. /admin) use
 * only the root `app/layout.tsx` without this wrapper.
 */
export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Proivder>{children}</Proivder>;
}
