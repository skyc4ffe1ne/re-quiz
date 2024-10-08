import { Button } from "@/components/ui/button";
import { Checkbox } from "@radix-ui/react-checkbox";
import { QuizAnswer } from "@/components/QuizAnswer";

import { Trash2 } from "lucide-react";

export default function Answer({ idx, answer, setDeleteAnswer, answers }) {
    function handleDeleteAnswer(idx: string) {
        setDeleteAnswer((a) => (a = a.filter((el) => el !== answers[idx])));
        console.log(answers);
    }

    return (
        <div
            key={idx}
            className="flex items-center gap-4 border border-red-400 rounded-lg px-4 py-2 mt-4"
        >
            <Checkbox className="rounded-full" />
            <QuizAnswer placeholder={answer} />
            <Button size="sm" variant="ghost" onClick={() => handleDeleteAnswer(idx)}>
                <Trash2 size={16} />
            </Button>
        </div>
    );
}
