import { validateRequest } from "@/auth"
import prisma from "@/lib/prisma"

export async function isAuthor(params: { username: string, quizName: string }) {
    const { user } = await validateRequest()

    if (!user) return false

    if (user.username !== params.username) return false

    const quiz = await prisma.quiz.findFirst({
        where: {
            user: {
                username: params.username
            },
            name: params.quizName
        }
    })


    return !!quiz
}
