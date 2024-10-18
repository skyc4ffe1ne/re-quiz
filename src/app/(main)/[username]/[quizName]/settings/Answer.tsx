import { useFormContext } from "react-hook-form"


import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { QuizAnswer } from "@/components/QuizAnswer";

import { Trash2 } from "lucide-react";
import { FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";

type AnswerProps = {
    idx: number;
    answer: string;
    setDeleteAnswer: React.Dispatch<React.SetStateAction<string[]>>;
    answers: string[];
    setError: React.Dispatch<React.SetStateAction<string>>;
};
export default function Answer({
    idx,
    answer,
    setDeleteAnswer,
    answers,
    setError,
}: AnswerProps) {
    function handleDeleteAnswer(idx: number) {
        setDeleteAnswer(
            (a: string[]) => {
                const removeAnswer = a.filter((el: string) => el !== answers[idx])
                if (removeAnswer.length <= 4) {
                    setError("")
                }
                return removeAnswer
            },

        );
    }


    const { control } = useFormContext()

    return (
        <div
            key={idx}
            className="flex items-center gap-4 border border-border_g rounded-lg px-4 py-2 mt-4"
        >
            <FormField
                control={control}
                name="correctAnswer"
                render={({ field }) => (
                    <FormItem className="flex items-center">
                        <FormControl>
                            <Checkbox checked={field.value === idx}
                                onCheckedChange={(checked) => {
                                    return checked ? field.onChange(idx) : field.onChange(undefined);
                                }}
                                className="rounded-full" {...field} />
                        </FormControl>
                    </FormItem>
                )} />
            <FormField
                control={control}
                name={`answer${idx}`}
                render={({ field }) => (
                    <FormItem className="w-full">
                        <FormControl>
                            <QuizAnswer placeholder={answer} {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>

                )} />
            <Button size="sm" type="button" variant="ghost" onClick={() => handleDeleteAnswer(idx)}>
                <Trash2 size={16} />
            </Button>
        </div>
    );
}
