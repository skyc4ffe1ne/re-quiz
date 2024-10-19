import { validateRequest } from "@/auth"
import prisma from "@/lib/prisma"

export async function isAuthor(params: { username: string, quizName: string }) {
    const { user } = await validateRequest()

    if (!user) return false

    const takeQuiz = await prisma.quiz.findFirst({
        where: {
            name: {
                equals: params.quizName
            }
        }
    })

    if (!takeQuiz) return false

    return takeQuiz.userId === user.id
}
