"use client";

import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { useQuiz } from "./QuizProvider";


type AnswersProps = {
    id: string;
    answer: string;
    idx: number;
    correctAnswer: number
}

export default function Answers({ id, answer, idx, correctAnswer }: AnswersProps) {

    const { dispatch, state } = useQuiz()

    const isMarked = state?.selectedAnswers[id] === idx
    return (
        <Button
            variant="outline"
            className={`w-full justify-start mb-2 font-normal text-base ${isMarked ? "border border-accentbd bg-accentbd" : ""}`}
            onClick={() => {
                dispatch(
                    {
                        type: "choosedAnswer",
                        payload: {
                            idx,
                            id,
                            correctAnswer,
                        }
                    }
                )
            }}
        >
            {answer} {state?.selectedAnswers[id] === idx && <Check className="ml-auto" />}
        </Button>
    )
}
