import { responseFromUserEdit } from "../dtos/user1.dto.js";
import {
    createUserPrefer,
    delUserPrefer,
    getUserPrefer
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