import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteGuest as deleteCabinApi } from "../../services/apiGuests";
import toast from "react-hot-toast";

export function useDeleteGuest() {
    const queryClient = useQueryClient();
    const { isLoading: isDeleting, mutate: deleteGuest } = useMutation({
        mutationFn: deleteCabinApi,
        onSuccess: () => {
            toast.success("Guest successfully deleted !");
            queryClient.invalidateQueries({ queryKey: ["guests"] });
        },
        onError: (err) => {
            toast.error(err.message);
        },
    });

    return { isDeleting, deleteGuest };
}
