import {
    useMutation,
    QueryFilters,
    useQueryClient,
} from "@tanstack/react-query";
import { createQuestion } from "./action";
import { useToast } from "@/hooks/use-toast";

export function createQuestionMutate() {
    const queryClient = useQueryClient();

    const { toast } = useToast()

    const mutation = useMutation({
        mutationFn: createQuestion,
        onSuccess: async (newQuestion) => {
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

            toast({
                title: "Quiz Created successfully!"
            })
        },

        onError(error) {
            console.error(error);
            toast({
                variant: "destructive",
                title: "Something went wrong!",
                description: "There was a problem with ur request."
            })
        },
    });

    return mutation;
}
