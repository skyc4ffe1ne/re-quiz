import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { QuizAnswer } from "@/components/QuizAnswer";

import { Trash2 } from "lucide-react";

type AnswerProps = {
  idx: number;
  answer: string;
  setDeleteAnswer: React.Dispatch<React.SetStateAction<string[]>>;
  answers: string[];
};
export default function Answer({
  idx,
  answer,
  setDeleteAnswer,
  answers,
}: AnswerProps) {
  function handleDeleteAnswer(idx: number) {
    setDeleteAnswer(
      (a: string[]) => (a = a.filter((el: string) => el !== answers[idx])),
    );
  }

  return (
    <div
      key={idx}
      className="flex items-center gap-4 border border-border_g rounded-lg px-4 py-2 mt-4"
    >
      <Checkbox className="rounded-full" name="correctAnswer" value={idx} />
      <QuizAnswer placeholder={answer} name={`answer${idx}`} />
      <Button size="sm" variant="ghost" onClick={() => handleDeleteAnswer(idx)}>
        <Trash2 size={16} />
      </Button>
    </div>
  );
}
