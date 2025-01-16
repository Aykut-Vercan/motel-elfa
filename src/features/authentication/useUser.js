import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "../../services/apiAuth";

export function useUser() {
    // temel olarak mevcut kullanıcıyı alacak ve önbellekte saklayacaktır.
    //gerekli olduğu her seferinde yeniden indirilmesi gerekmeyecektir.
    const { isLoading, data: user, isFetching } = useQuery({
        queryKey: ['user'],
        queryFn: getCurrentUser,
    })

    const isAuthenticated = user?.role === 'authenticated'

    return { isLoading, user, isAuthenticated, isFetching }
}