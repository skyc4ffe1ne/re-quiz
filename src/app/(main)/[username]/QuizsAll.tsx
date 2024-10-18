import { QuizAllProps } from "@/lib/types";
import Link from "next/link";

export default function QuizsAll({ linkName, description, quizName }: QuizAllProps) {
    return (
        <div className="border-t p-8">
            <Link
                href={`/${linkName}/${quizName}`}
                className="text-xl tracking-tight font-medium text-secondary-foreground hover:underline underline-offset-4"
            >
                {quizName}
            </Link>
            <p className="mt-2 text-muted-foreground"> {description} </p>
        </div>
    );
}
