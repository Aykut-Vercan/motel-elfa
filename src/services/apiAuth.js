import supabase, { supabaseUrl } from "./supabase";

export async function signup({ fullName, email, password }) {
    const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
            data: {
                fullName,
                avatar: "",
            },
        },
    });

    if (error) throw new Error(error.message);

    return data;
}

export async function login({ email, password }) {
    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
    });

    if (error) throw new Error(error.message);

    return data;
}
export async function getCurrentUser() {
    const { data: session } = await supabase.auth.getSession();
    if (!session.session) return null;

    const { data, error } = await supabase.auth.getUser();

    if (error) throw new Error(error.message);
    return data?.user;
}
export async function logout() {
    const { error } = await supabase.auth.signOut();
    if (error) throw new Error(error.message);
}

export async function updateCurrentUser({ password, avatar, fullName }) {
    // 1. Update password OR fullName
    let updateData;
    if (password) updateData = { password };
    if (fullName) updateData = { data: { fullName } };

    const { data, error } = await supabase.auth.updateUser(updateData);

    if (error) throw new Error(error.message);
    if (!avatar) return data;

    // 2. Upload the avatar image
    const fileName = `avatar-${data.user.id}`;

    await supabase.storage.from("avatars").remove([fileName]);

    const { error: storageError } = await supabase.storage
        .from("avatars")
        .upload(fileName, avatar);
    if (storageError) throw new Error(storageError.message);

    // 3. Avatar URL'sini oluştur ve cache-busting ekle
    const avatarUrl = `${supabaseUrl}/storage/v1/object/public/avatars/${fileName}?bust=${Date.now()}`;

    //3.update avatar in user
    const { data: updatedUser, error: updateAvatarError } =
        await supabase.auth.updateUser({
            data: {
                avatar: avatarUrl,
            },
        });

    if (updateAvatarError) throw new Error(updateAvatarError.message);
    return updatedUser;
}

export async function updateCurrentUserUpg({
    password,
    fullName,
    newAvatarFile,
    currentAvatarURL,
}) {
    // >#1. Update the fullName OR password
    // ->#1.1 Prep Update Data
    let updateData;
    if (password) updateData = { password };
    // update user_metadata therefore its data key per supabase API
    if (fullName) updateData = { data: { fullName } };

    // ->#1.2 Update User Data
    const { data: updatedUserData, error: updateUserError } = await supabase.auth.updateUser(updateData);
    if (updateUserError) {
        throw new Error(updateUserError.message);
    }
    // ->#1.3 Early return if no new Avatar file is provided
    if (!newAvatarFile) return;
    // >#2. Proceed w/ Uploading the new avatar image
    const currentAvatarFileName = currentAvatarURL.split("/").pop();
    const currentAvatarFileExists = currentAvatarURL !== "";
    // ->#2.1 Prepare the new avatar img name for storing
    const fileName = `avatar-${updatedUserData.user.id}-${Date.now()}`;
    // ->#2.2 Upsert the new avatar image
    if (currentAvatarFileExists) {
        // Step 1: Delete the existing file
        const { error: deleteAvatarError } = await supabase.storage.from("avatars").remove([currentAvatarFileName]);
        if (deleteAvatarError) {
            throw new Error("Error deleting the avatar file: " + deleteAvatarError.message);
        }
    }
    // Step 2: Upload the new file
    const { error: uploadNewAvatarError } = await supabase.storage
        .from("avatars")
        .upload(fileName, newAvatarFile, {
            cacheControl: "3600",
            upsert: false,
        });
    if (uploadNewAvatarError) {
        throw new Error(
            "Error uploading the new avatar file: " + uploadNewAvatarError.message
        );
    }

    console.log("File replaced successfully");
    // >#3. Update the avatar in the user data
    const { error: updateUserDataError } = await supabase.auth.updateUser({
        data: {
            avatar: `${supabaseUrl}/storage/v1/object/public/avatars/${fileName}`,
        },
    });
    if (updateUserDataError) {
        throw new Error(updateUserDataError.message);
    }
    return updatedUserData
}
