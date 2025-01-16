import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { createUpdateGuest } from "../../services/apiGuests";

export function useCreateGuest() {
    const queryClient = useQueryClient();

    const { isLoading: isCreating, mutate: createGuest } = useMutation({
        mutationFn: createUpdateGuest,
        onSuccess: () => {
            toast.success("Guest successfully created")
            queryClient.invalidateQueries({
                queryKey: ['guests']
            })
        },
        onError: (err) => {
            toast.error(err.message)
        }
    })


    return { isCreating, createGuest }


}