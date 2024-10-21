import { isAuthor } from "./isAuthor";
import CarouselQuizName from "./CarouselQuizName";
import HeaderQuizName from "./HeaderQuizName";

export default async function Page({ params }: { params: { username: string, quizName: string } }) {

    const checkAuthor = await isAuthor(params)

    return (
        <div className="mx-auto max-w-6xl">
            <HeaderQuizName checkAuthor={checkAuthor} />
            <CarouselQuizName />
        </div>
    );
}
