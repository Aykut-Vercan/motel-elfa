import { useForm } from "react-hook-form";
import { useUpdateUser } from "./useUpdateUser";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Button from "../../ui/Button";

const UpdatePasswordForm = () => {
    const { register, handleSubmit, formState, getValues, reset } = useForm();
    const { errors } = formState;

    const { updateUser, isUpdating } = useUpdateUser();

    function onSubmit({ password }) {
        updateUser({ password }, { onSuccess: reset });
    }

    return (
        <Form onSubmit={handleSubmit(onSubmit)}>
            <FormRow label="New password (min 8 chars)" error={errors?.password?.message}>
                <Input
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    disabled={isUpdating}
                    {...register("password", {
                        required: "this field required",
                        minLength: { value: 8, message: "Min 8 charecters" },
                    })}
                />
            </FormRow>
            <FormRow
                label="Confirm Password)"
                error={errors?.passwordConfirm?.message}
            >
                <Input
                    type="password"
                    id="passwordConfirm"
                    autoComplete="new-password"
                    disabled={isUpdating}
                    {...register("passwordConfirm", {
                        required: "this field required",
                        validate: (value) =>
                            value === getValues().password || "Passwords need to match",
                    })}
                />
            </FormRow>
            <FormRow>
                <Button onClick={reset} type="reset" variation="secondary">
                    Cancel
                </Button>
                <Button disabled={isUpdating}>
                    Update Password
                </Button>
            </FormRow>
        </Form>
    );
};

export default UpdatePasswordForm;
