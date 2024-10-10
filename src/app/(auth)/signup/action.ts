"use server";

import prisma from "@/lib/prisma";

import { lucia } from "@/auth";
import { hash } from "@node-rs/argon2";
import { generateIdFromEntropySize } from "lucia";

import { signUpSchema, SignUpValues } from "@/lib/validation";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function signUp(credentials: SignUpValues) {
  console.log(credentials);
  const { username, password, email } = signUpSchema.parse(credentials);

  const checkUsername = await prisma.user.findFirst({
    where: {
      username: {
        equals: username.toLowerCase(),
      },
    },
  });

  if (checkUsername) {
    return {
      error: "Username not avaible",
    };
  }

  const checkEmail = await prisma.user.findFirst({
    where: {
      email: {
        equals: email,
      },
    },
  });

  if (checkEmail) {
    return {
      error: "Username not avaible",
    };
  }

  const passwordHash = await hash(password, {
    memoryCost: 19456,
    timeCost: 2,
    outputLen: 32,
    parallelism: 1,
  });

  const id = generateIdFromEntropySize(10);

  await prisma.user.create({
    data: {
      email,
      username,
      id,
      passwordHash,
    },
  });

  const session = await lucia.createSession(id, {});
  const sessionCookie = lucia.createSessionCookie(session.id);
  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes,
  );

  return redirect("/");
}
