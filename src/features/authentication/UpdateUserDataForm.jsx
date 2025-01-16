import { useState } from "react";
import { useUser } from "./useUser";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Button from "../../ui/Button";
import Input from "../../ui/Input";
import FileInput from "../../ui/FileInput";
import { useUpdateUser } from "./useUpdateUser";

const UpdateUserDataForm = () => {
    //We dont need the loading state and can immediately use the user data , bcs we know that it has already been loaded at this point
    const {
        user: {
            email,
            user_metadata: { fullName: currentFullName },
        },
    } = useUser();

    const { updateUser, isUpdating } = useUpdateUser();

    const [fullName, setFullName] = useState(currentFullName);
    const [avatar, setAvatar] = useState();

    function handleSubmit(e) {
        e.preventDefault();
        if (!fullName) return;
        updateUser(
            { fullName, avatar },
            {
                onSuccess: () => {
                    setAvatar(null);
                    e.target.reset();
                },
            }
        );
    }
    function handleCancel() {
        setFullName(currentFullName);
        setAvatar(null);
    }

    return (
        <Form onSubmit={handleSubmit}>
            <FormRow label="Email address">
                <Input value={email} disabled={true} />
            </FormRow>
            <FormRow label="Full Name">
                <Input
                    id="fullName"
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    disabled={isUpdating}
                />
            </FormRow>
            <FormRow label="Avatar image">
                <FileInput
                    id="avatar"
                    accept="image/*"
                    onChange={(e) => setAvatar(e.target.files[0])}
                    disabled={isUpdating}
                />
            </FormRow>
            <FormRow>
                <Button type="reset" variation="secondary" disabled={isUpdating} onClick={handleCancel}>
                    Cancel
                </Button>
                <Button disabled={isUpdating}>Update</Button>
            </FormRow>
        </Form>
    );
};

export default UpdateUserDataForm;
