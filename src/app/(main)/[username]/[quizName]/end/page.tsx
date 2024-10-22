"use client";
import { use } from "react";
import { Button } from "@/components/ui/button"
import { useQuiz } from "../QuizProvider"
import Link from "next/link"

type Params = Promise<{ username: string, quizName: string }>

export default function Page(props: {
    params: Params
}) {
    const params = use(props.params);
    const { state, dispatch } = useQuiz()

    return (
        <div className="mt-20 mx-auto flex items-center justify-center flex-col">
            <h3 className="leading-6 font-semibold mb-2 text-sky-500 dark:text-sky-400 text-sm">
                Your Score
            </h3>
            <h1 className="text-primary font-extrabold text-4xl sm:text-5xl lg:text-6xl tracking-tight text-center"> {state.quizScore.correctAnswer}  <span className="text-secondary"> / {state.quizScore.questionLength} </span> </h1>
            <div className="flex gap-4 mt-20">
                <Link href={`/${params.username}/${params.quizName}`}>
                    <Button onClick={() => dispatch(
                        {
                            type: "start"
                        }
                    )}> Try Again </Button>
                </Link>
                <Link href={`/${params.username}/${params.quizName}/review`}>
                    <Button variant="outline" onClick={() => dispatch(
                        {
                            type: "review"
                        }
                    )}> Wrong Answers </Button>
                </Link>
            </div>
        </div>
    )
}
