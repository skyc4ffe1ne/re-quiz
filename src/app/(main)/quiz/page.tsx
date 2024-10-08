"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Plus, Trash2 } from "lucide-react";

import { QuizAnswer } from "@/components/QuizAnswer";
import Answer from "./Answer";

const initialAnswers = ["Answer 1", "Answer 2"];

// 1. Quiz ID <- e quando clicco su quiz id mi mostra tutti i miniquiz dell'utente
//  Quando clicco su un miniquiz prendo l'id

export default function Page() {
    const [answers, setAnswers] = useState<string[]>(initialAnswers);

    function handleNewAnswer() {
        const checkLenght = answers.length;
        setAnswers((a) => (a = [...a, `Answer ${checkLenght + 1}`]));
    }

    return (
        <div className="w-full border border-white py-2 px-4">
            <section className="mx-auto radius-xl px-4 py-2 w-1/2 border border-red-400 bg-secondary rounded-xl">
                <input
                    type="text"
                    placeholder="Enter your question here"
                    className="w-full bg-transparent text-secondary-foreground"
                />

                {answers.map((answer, idx) => (
                    <Answer
                        answer={answer}
                        idx={idx}
                        key={idx}
                        setDeleteAnswer={setAnswers}
                        answers={answers}
                    />
                ))}

                <Button
                    size="sm"
                    variant="ghost"
                    className="border border-primary mt-4"
                    onClick={() => handleNewAnswer()}
                >
                    <Plus size={16} />
                </Button>
            </section>
        </div>
    );
}
