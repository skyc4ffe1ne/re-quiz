import MakeQuiz from "./MakeQuiz";
import PreviewQuiz from "./PreviewQuiz";
export default function Page() {
    return (
        <div className="w-full py-2 px-4">
            <MakeQuiz />
            <PreviewQuiz />
        </div>
    );
}
