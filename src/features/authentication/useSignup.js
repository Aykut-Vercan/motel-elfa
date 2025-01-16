import { useMutation } from "@tanstack/react-query";
import { signup as signupApi } from "../../services/apiAuth";
import toast from "react-hot-toast";
//import { useNavigate } from "react-router-dom";

export function useSignup() {
    //  const navigate = useNavigate();
    const { mutate: signup, isLoading } = useMutation({
        mutationFn: ({ email, password, fullName }) => signupApi({ email, password, fullName }),

        onSuccess: (user) => {
            console.log(user)
            toast.success("Account successfully created! Please verify the new account from the user's email address");
            // navigate("/dashboard", { replace: true }); //geri tusuna basarsa dönmeyi engeller
        },
        onError: (error) => toast.error(`${error.message}: ${error.cause.message}`),
    });

    return { signup, isLoading };
}
