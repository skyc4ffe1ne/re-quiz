import { QuizAllProps } from "@/lib/types";
import Link from "next/link";

export default function QuizsAll({ linkName, description }: QuizAllProps) {
    return (
        <div className="border-t p-8">
            <Link
                href={`/quiz/${linkName}`}
                className="text-xl tracking-tight font-medium text-secondary-foreground hover:underline underline-offset-4"
            >
                {linkName}
            </Link>
            <p className="mt-2 text-muted-foreground"> {description} </p>
        </div>
    );
}
