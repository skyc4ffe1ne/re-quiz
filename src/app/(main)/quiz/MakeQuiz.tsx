"use client";

import { useState } from "react";

import { createQuestion } from "./action";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const initialAnswers = ["Answer 1", "Answer 2"];

import { questionSchema, questionValues } from "@/lib/validation";

import { Textarea } from "@/components/ui/textarea";
import Answer from "./Answer";
import { Button } from "@/components/ui/button";
import { Plus, ArrowRight } from "lucide-react";
import { Form } from "@/components/ui/form";

export default function MakeQuiz() {
  const [answers, setAnswers] = useState<string[]>(initialAnswers);
  const [error, setError] = useState<string>("");
  function handleNewAnswer() {
    const checkLenght = answers.length;
    if (checkLenght <= 4) {
      setAnswers((a) => (a = [...a, `Answer ${checkLenght + 1}`]));
    } else {
      setError("Max 4 answer");
    }
  }

  async function onSubmit(values: questionValues) {
    setError("");
    await createQuestion(values);
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
          />
        ))}
        <button type="submit"> test </button>
      </form>
      <div className="flex justify-between items-center mt-6">
        <Button
          size="sm"
          type="button"
          variant="ghost"
          className="border border-primary"
          onClick={() => handleNewAnswer()}
        >
          <Plus size={16} />
        </Button>

        <Button size="sm" type="submit" variant="ghost" className="bg-accentbd">
          <ArrowRight size={16} />
        </Button>
      </div>
    </div>
  );
}