"use client";

import { useForm } from "react-hook-form";
import { loginSchema, loginValues } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";

import { login } from "./action";
import { useState, useTransition } from "react";


import Link from "next/link"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { LoaderCircle } from "lucide-react";

export default function LoginForm() {
    const [error, setError] = useState<string>();
    const [isPending, startTransition] = useTransition();

    const form = useForm<loginValues>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            username: "",
            password: "",
        },
    });

    async function onSubmit(values: loginValues) {
        setError(undefined);
        startTransition(async () => {
            const { error } = await login(values);
            if (error) setError(error);
        });
    }


    return (
        <>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className={`w-1/2 ${error ? "mt-5" : "mt-10"}`}>
                    {error && <p className="text-destructive mb-5"> {error}</p>}
                    <FormField
                        control={form.control}
                        name="username"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="max-w-96">Username</FormLabel>
                                <FormControl>
                                    <Input placeholder="username" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem className="mt-2 max-w-96">
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <Input type="password" placeholder="password" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <div className="flex flex-col">
                        <Button type="submit" className="mt-4"> Login
                            {isPending && <LoaderCircle size={32} className="animate-spin" />}
                        </Button>
                        <Link href="/signup" className="mt-2 hover:underline underline-offset-2">Don&apos;t have an account ?</Link>
                    </div>
                </form>
            </Form>
        </>
    );
}
