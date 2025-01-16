import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getAllGuests } from "../../services/apiGuests";

export function useAllGuests() {
    const queryClient = useQueryClient()
    //Query
    const { isLoading, data: { data: guests, count } = {}, error, } = useQuery({
        queryKey: ["guests"],
        queryFn: () => getAllGuests(),
    });
     queryClient.setQueryData(["allGuests", guests])
    return { isLoading, error, guests, count };
}