import { validateRequest } from "@/auth";
import SessionProvider from "./SessionProvider";
import Navbar from "@/components/Navbar";
import { Background } from "@/components/Background";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await validateRequest();

  return (
    <SessionProvider value={session}>
      <div className="min-h-screen">
        <Background />
        <Navbar />
        <div className="">{children}</div>
      </div>
    </SessionProvider>
  );
}
