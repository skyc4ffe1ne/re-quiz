"use server";

import prisma from "@/lib/prisma";
import { loginSchema, loginValues } from "@/lib/validation";

import { verify } from "@node-rs/argon2";
import { lucia } from "@/auth";

import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { isRedirectError } from "next/dist/client/components/redirect";

export async function login(
  credential: loginValues,
): Promise<{ error: string }> {
  try {
    const { username, password } = loginSchema.parse(credential);

    const existingUser = await prisma.user.findFirst({
      where: {
        username: {
          equals: username,
        },
      },
    });

    if (!existingUser || !existingUser.passwordHash) {
      return {
        error: "Username or Password not correct",
      };
    }

    const validatePassword = await verify(existingUser.passwordHash, password, {
      memoryCost: 19456,
      timeCost: 2,
      outputLen: 32,
      parallelism: 1,
    });

    if (!validatePassword) {
      return {
        error: "Username or Password not correct",
      };
    }

    const session = await lucia.createSession(existingUser.id, {});
    const sessionCookie = lucia.createSessionCookie(session.id);
    cookies().set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes,
    );

    return redirect("/");
  } catch (error) {
    if (isRedirectError(error)) throw error;
    console.error(error);
    return {
      error: "Something went wrong. Please try again",
    };
  }
}
