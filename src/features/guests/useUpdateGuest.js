import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createUpdateGuest } from "../../services/apiGuests";
import toast from "react-hot-toast";

export function useUpdateGuest() {
    const queryClient = useQueryClient();

    const { isLoading: isUpdating, mutate: updateGuest } = useMutation({
        mutationFn: ({ newGuestData, id }) => createUpdateGuest(newGuestData, id),
        onSuccess: () => {
            toast.success("Guest successfully updated");
            queryClient.invalidateQueries({ queryKey: ["guests"] });
        },
        onError: (err) => toast.error(err.message),
    });

    return { isUpdating, updateGuest };
}