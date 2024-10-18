import { Button } from "@/components/ui/button";

export default function QuizEmpty() {
    return (
        <div className="bg-accent">
            <h2> Still not ready ? </h2>
            <p>
                Start to <span className="text-sky-400"> create you own quiz </span>, To
                learn faster and memorize more effectively. Get in the game!
            </p>

            <Button> Create Quiz </Button>
        </div>
    );
}
