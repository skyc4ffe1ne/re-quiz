import { validateRequest } from "@/auth";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function Home() {

    const { user } = await validateRequest()
    return (
        <div className="h-[60vh] w-full text-center flex justify-center items-center flex-col">
            <h1 className="text-6xl font-black tracking-tight text-secondary-foreground">
                Learn with your own quiz
            </h1>
            <p className="text-muted-foreground mt-6 mb-12 max-w-3xl mx-auto tracking-wide">
                How many times we read something interesting we try to memorize it, but
                then we end up forgetting it. We help you
                <span className="text-sky-400"> create your own quiz</span> for all the
                lost and forgotten concepts, to memorize them more effectively!
            </p>
            <Link href={
                {
                    pathname: `${user?.username}`,
                    query: { tab: "quiz" }
                }
            }>
                <Button variant="secondary" className="bg-accentbd text-accentbd-foreground hover:bg-accentbd-hover">
                    Get started{" "}
                </Button>
            </Link>
        </div>
    );
}
