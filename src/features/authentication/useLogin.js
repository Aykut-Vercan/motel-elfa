import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login as loginApi } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export function useLogin() {
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    //bu bir mutasyon cünkü sunucuda bişeyler değişecek fonksiyon calısınca ve onSuccess  error state işlemek kolay olacak
    const { mutate: login, isLoading } = useMutation({
        mutationFn: ({ email, password }) => loginApi({ email, password }),
        onSuccess: (user) => {
            queryClient.setQueryData(['user'], user.user)//reactQuery Cache manuel olarak ayarlamak için ancak güncelleme için setQueriesData kullanılmalı
            toast.success('Login successful');
            navigate('/dashboard', { replace: true }) //geri tusuna basarsa dönmeyi engeller 

        },
        onError: error => toast.error(error.message),
    });

    return { login, isLoading };
}
