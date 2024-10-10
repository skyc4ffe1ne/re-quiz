import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
    return (
        <div className="bg-primary h-[60vh] w-full text-center flex justify-center items-center flex-col">
            <h1 className="text-6xl font-black tracking-tighter text-primary-foreground">
                {" "}
                Learn with your own quiz{" "}
            </h1>
            <p className="text-secondary mt-6 mb-12 max-w-3xl mx-auto tracking-wider">
                How many times we read something interesting we try to memorize it, but
                then we end up forgetting it. We help you create your own quiz for all
                the lost and forgotten concepts, to memorize them more effectively!
            </p>

            <Link href="/quiz">
                <Button variant="secondary">Get a demo </Button>
            </Link>
        </div>
    );
}
