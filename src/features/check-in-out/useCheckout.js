import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useCheckout() {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const { mutate: checkout, isLoading: isCheckingOut } = useMutation({

        mutationFn: (bookingId) =>
            updateBooking(bookingId, { status: "checked-out" }),

        onSuccess: (data) => {
            //onSuccess ilgili mutationFn dönen degeri alıyor
            toast.success(`Booking #${data.id} successfully checked out`);
            queryClient.invalidateQueries({ active: true }); //queryKey gecmedende yapabiliriz bu şekilde yapmak sayfadaki bütün queryleri active edip tekrar calıstırır.
            navigate("/");
        },

        onError: () => toast.error("There was an error while checking out"),
    });

    return { checkout, isCheckingOut };
}
