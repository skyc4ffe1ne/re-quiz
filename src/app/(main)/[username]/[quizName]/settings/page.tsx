import { Button } from "@/components/ui/button";
import MakeQuiz from "./MakeQuiz";
import PreviewQuiz from "./PreviewQuiz";
import Link from "next/link";

type Params = Promise<{ username: string, quizName: string }>
export default async function Page(props: {
    params: Params
}) {
    const { username, quizName } = await props.params

    return (
        <div className="w-full py-2 px-4">
            <MakeQuiz />
            <PreviewQuiz />
            <Link href={`/${username}/${quizName}`}>
                <Button> Go to the quiz </Button>
            </Link>
        </div>
    );
}
