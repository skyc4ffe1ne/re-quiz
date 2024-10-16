import { useToast } from "@/hooks/use-toast"


import {
    useMutation,
    QueryFilters,
    useQueryClient,
} from "@tanstack/react-query";
import { createQuestion } from "./action";

export function createQuestionMutate() {
    const toast = useToast()
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: createQuestion,
        onSuccess: async (newQuestion) => {
            console.log("newQuestion", newQuestion)
            const queryFilter: QueryFilters = { queryKey: ["quiz-preview"] };

            await queryClient.cancelQueries(queryFilter);

            queryClient.setQueriesData(queryFilter, (oldData) => {
                const newData = [...oldData, newQuestion];
                return newData;
            });

            queryClient.invalidateQueries({
                queryKey: queryFilter.queryKey,
                predicate(query) {
                    return !query.state.data;
                },
            });
        },

        onError(error) {
            console.error(error);
            toast({
                variant: "destructive",
                description: "Failed to create, please try again"
            })
        },
    });

    return mutation;
}
