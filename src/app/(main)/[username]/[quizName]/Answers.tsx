import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";


type AnswersProps = {
    id: string;
    answer: string;
    idx: number;
    dispatch: React.Dispatch<any>;
    state: { selectedAnswers: { [id: string]: number } }
}

export default function Answers({ id, answer, idx, dispatch, state }: AnswersProps) {


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
                        }
                    }
                )
            }}
        >
            {answer} {state?.selectedAnswers[id] === idx && <Check className="ml-auto" />}
        </Button>
    )
}
