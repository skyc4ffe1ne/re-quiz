"use client";

import { useTransition, useState } from "react";

const initialAnswers = ["Answer 1", "Answer 2"];


import Answer from "./Answer";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Plus, ArrowRight } from "lucide-react";

import { createQuestionMutate } from "./mutation";

export default function MakeQuiz() {
    const [answers, setAnswers] = useState<string[]>(initialAnswers);
    const [error, setError] = useState<string>("");
    function handleNewAnswer() {
        setAnswers((a) => {
            const updateAnswers = [...a, `Answer ${answers.length + 1}`];
            console.log(updateAnswers.length)
            if (updateAnswers.length > 4) {
                setError("Max 4 answers")
            }
            return updateAnswers
        });
    }


    const mutation = createQuestionMutate();

    async function onSubmit(values: FormData) {
        if (!error) {
            setError("");
            mutation.mutate(values);
        }
    }

    return (
        <div className="mx-auto radius-xl px-4 py-2 w-1/2 border border-border_g bg-secondary rounded-xl">
            {error && <p> {error} </p>}
            <form action={onSubmit}>
                <Textarea
                    placeholder="Enter your question here"
                    className="resize-none w-full bg-transparent text-secondary-foreground border-border_g"
                    name="questionQuiz"
                />
                {answers.map((answer, idx) => (
                    <Answer
                        answer={answer}
                        idx={idx}
                        key={idx}
                        setDeleteAnswer={setAnswers}
                        answers={answers}
                        setError={setError}
                    />
                ))}
                <div className="flex justify-between items-center mt-6">
                    <Button
                        size="sm"
                        type="button"
                        variant="ghost"
                        className="border border-primary hover:bg-accent"
                        onClick={() => handleNewAnswer()}
                    >
                        <Plus size={16} />
                    </Button>

                    <Button
                        size="sm"
                        type="submit"
                        variant="ghost"
                        disabled={!!error}
                        className="bg-accentbd hover:bg-accentbd-hover"
                    >
                        <ArrowRight size={16} />
                    </Button>
                </div>
            </form>
        </div>
    );
}
