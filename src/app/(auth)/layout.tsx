import { validateRequest } from "@/auth";
import { redirect } from "next/navigation";

export default async function layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {

    const session = await validateRequest()
    if (session.user) redirect("/")
    return (
        <main className="w-full flex justify-center items-center min-h-screen">
            {children}
        </main>
    );
}
