/* eslint-disable react/prop-types */
import { useForm } from "react-hook-form";
import { useCreateGuest } from "./useCreateGuest";
import { useUpdateGuest } from "./useUpdateGuest";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import { flags } from "../../data/data-flags";
import { useState } from "react";
import Button from "../../ui/Button";

const CreateGuestForm = ({ guestToUpdate = {}, onCloseModal }) => {
    const { isCreating, createGuest } = useCreateGuest();
    const { isUpdating, updateGuest } = useUpdateGuest();
    const [countryFlag, setCountryFlag] = useState("");
    const isWorking = isCreating || isUpdating;

    const { id: updateId, ...updateValues } = guestToUpdate;

    const isUpdateSession = Boolean(updateId);

    const { register, handleSubmit, reset, formState } = useForm({
        defaultValues: isUpdateSession ? updateValues : {},
    });

    const { errors } = formState;

    // function onSuccess() {
    //     reset();
    //     onCloseModal?.();
    // }
    function handleNationalityChange(event) {
        const nationalityValue = event.target.value;

        const abbreviation = Object.keys(flags[0]).find(
            (key) => flags[0][key] === nationalityValue
        );

        if (abbreviation) {
            setCountryFlag(`https://flagcdn.com/${abbreviation.toLowerCase()}.svg`);
        }
    }
    function onSubmit(data) {
        const dataWithFlag = { ...data, countryFlag };
        if (isUpdateSession) {
            updateGuest(
                { newGuestData: dataWithFlag, id: updateId },
                {
                    onSuccess: () => {
                        reset();
                        onCloseModal?.();
                    },
                }
            );
        } else {
            createGuest(dataWithFlag, {
                onSuccess: () => {
                    reset();
                    onCloseModal?.();
                },
            });
        }
    }

    function onError(error) {
        console.log(error);
    }

    return (
        <Form
            onSubmit={handleSubmit(onSubmit, onError)}
            type={onCloseModal ? "modal" : "regular"}
        >
            <FormRow label="Guest Name" error={errors?.fullName?.message}>
                <Input
                    type="text"
                    id="fullName"
                    disabled={isWorking}
                    {...register("fullName", { required: "This field is required" })}
                />
            </FormRow>
            <FormRow label="Email address" error={errors?.email?.message}>
                <Input
                    type="text"
                    id="email"
                    disabled={isWorking}
                    {...register("email", {
                        required: "this field required",
                        pattern: {
                            value: /\S+@\S+\.\S+/,
                            message: "Please provide valid email",
                        },
                    })}
                />
            </FormRow>
            <FormRow label="Nationality" error={errors?.nationality?.message}>
                <Input
                    type="text"
                    id="nationality"
                    disabled={isWorking}
                    {...register("nationality", { required: "This field is required" })}
                    onChange={handleNationalityChange}
                />
            </FormRow>
            <FormRow label="National ID" error={errors?.nationalID?.message}>
                <Input
                    type="text"
                    id="nationalID"
                    disabled={isWorking}
                    {...register("nationalID", { required: "This field is required" })}
                />
            </FormRow>
            <FormRow >
                <Button
                    variation="secondary"
                    type="reset"
                    onClick={() => onCloseModal?.()}
                >
                    Cancel
                </Button>
                <Button disabled={isWorking}>
                    {isUpdateSession ? "Update Guest" : "Create Guest"}
                </Button>
            </FormRow>
        </Form>
    );
};

export default CreateGuestForm;
