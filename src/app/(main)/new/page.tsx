"use client";
import { quizSchema, quizValues } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { createQuiz } from "./action";
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
import { useState, useTransition } from "react";
import { LoaderCircle } from "lucide-react";

export default function Page() {
    const [isPending, startTransition] = useTransition()
    const [error, setError] = useState<string>()

    const form = useForm<quizValues>({
        resolver: zodResolver(quizSchema),
        defaultValues: {
            quizName: "",
            description: "",
        },
    });

    async function onSubmit(values: quizValues) {
        startTransition(async () => {
            const { error } = await createQuiz(values)
            if (error) setError(error)
        })
    }


    if (isPending) return <LoaderCircle size={48} className="animate-spin" />
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
                {error && <p className="text-destructive"> {error} </p>}
                <FormField
                    control={form.control}
                    name="quizName"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel> Quiz name </FormLabel>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel> Description </FormLabel>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button type="submit" className="w-full">
                    Create Quiz
                </Button>
            </form>
        </Form>
    );
}
