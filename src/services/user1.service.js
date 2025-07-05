import {
    responseFromUserEdit,
    responseFromUserProfile,
 } from "../dtos/user1.dto.js";
import {
    createUserPrefer,
    delUser,
    delUserPrefer,
    delUserSearch,
    getUserPrefer,
    getUserProfile,
    getUserSearch
} from "../repositories/user1.repository.js";

export const userEdit = async (data) => {
    await delUserPrefer({ id: data.id });
    await createUserPrefer({
        id: data.id,
        categoryIds: data.categoryIds,
    });
    const editUser = await getUserPrefer({ id: data.id, categoryIds: data.categoryIds });
    return responseFromUserEdit(
        {
            user: { id: data.id },
            editUser
        });
};

export const userProfile = async (data) => {
    const user = await getUserProfile({ id: data.id });
    if (!user) {
        throw new Error("User not found");
    }

    return responseFromUserProfile(user);

}

export const userDeleteProfile = async (data) => {
    await delUserPrefer({ id: data.id });
    const search = await getUserSearch({ id: data.id });
    for (const item of search) {
        await delUserSearch({ id: item.id });
    }
    const user = await delUser({ id: data.id });
    return responseFromUserProfile(user);
};