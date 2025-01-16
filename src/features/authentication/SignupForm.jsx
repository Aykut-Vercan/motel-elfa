import { useForm } from "react-hook-form";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import { useSignup } from "./useSignup";

//Email regex: /\S+@\S+\.\S+/

const SignupForm = () => {
    const { signup, isLoading } = useSignup();

    const { register, formState, getValues, handleSubmit, reset } = useForm();
    const { errors } = formState;

    function onSubmit({ fullName, email, password }) {
        signup(
            { fullName, email, password },
            {
                onSettled: reset
            }
        );
    }

    return (
        <Form onSubmit={handleSubmit(onSubmit)}>
            <FormRow label="Full Name" error={errors?.fullName?.message}>
                <Input
                    type="text"
                    id="fullName"
                    disabled={isLoading}
                    {...register("fullName", { required: "this field required" })}
                />
            </FormRow>
            <FormRow label="Email address" error={errors?.email?.message}>
                <Input
                    type="text"
                    id="email"
                    disabled={isLoading}
                    {...register("email", {
                        required: "this field required",
                        pattern: {
                            value: /\S+@\S+\.\S+/,
                            message: "Please provide valid email",
                        },
                    })}
                />
            </FormRow>
            <FormRow label="Password (min 8 chars)" error={errors?.password?.message}>
                <Input
                    type="password"
                    id="password"
                    disabled={isLoading}
                    {...register("password", {
                        required: "this field required",
                        minLength: { value: 8, message: "Min 8 charecters" },
                    })}
                />
            </FormRow>
            <FormRow label="Repeat password" error={errors?.passwordConfirm?.message}>
                <Input
                    type="password"
                    id="passwordConfirm"
                    disabled={isLoading}
                    {...register("passwordConfirm", {
                        required: "this field required",
                        validate: (value) =>
                            value === getValues().password || "Passwords need to match",
                    })}
                />
            </FormRow>
            <FormRow>
                <Button variation="danger" type="reset" disabled={isLoading} onClick={reset}>Cancel</Button>
                <Button disabled={isLoading}> Create new user</Button>
            </FormRow>
        </Form>
    );
};

export default SignupForm;
