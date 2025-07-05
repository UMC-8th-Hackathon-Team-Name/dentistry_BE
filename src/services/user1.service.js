import {
    responseFromUserEdit,
    responseFromUserProfile,
    responseFromUserRecentSearch,
 } from "../dtos/user1.dto.js";
import {
    createUserPrefer,
    delUser,
    delUserPrefer,
    delUserSearch,
    delUserSearchStation,
    getUserPrefer,
    getUserProfile,
    getUserSearch,
    getUserSearchAll,
    getUser,
} from "../repositories/user1.repository.js";

export const userEdit = async (data) => {
    const user = await getUser({ id: data.id });
    if (!user) {
        throw new UserNotFoundError("유저 정보를 가져오지 못 합니다.");
    }
    await delUserPrefer({ id: data.id });
    await createUserPrefer({
        id: data.id,
        facility: data.facility,
    });
    const editUser = await getUserPrefer({ id: data.id, facility: data.facility });
    return responseFromUserEdit(
        {
            user: { id: data.id },
            editUser
        });
};

export const userProfile = async (data) => {
    const user = await getUserProfile({ id: data.id });
    if (!user) {
        throw new UserNotFoundError("유저 정보를 가져오지 못 합니다.");
    }

    return responseFromUserProfile(user);

}

export const userDeleteProfile = async (data) => {
    const user = await getUser({ id: data.id });
    if (!user) {
        throw new UserNotFoundError("유저 정보를 가져오지 못 합니다.");
    }
    await delUserPrefer({ id: data.id });
    const search = await getUserSearch({ id: data.id });
    for (const item of search) {
        await delUserSearchStation({ id: item.id });
    }
    await delUserSearch({ id: search.id });
    const dUser = await delUser({ id: data.id });
    
    return responseFromUserProfile(dUser);
};

export const userRecentSearch = async (data) => {
    const user = await getUser({ id: data.id });
    if (!user) {
        throw new UserNotFoundError("유저 정보를 가져오지 못 합니다.");
    }
    const search = await getUserSearch({ id: data.id });
    let response = [];
    for (const item of search) {
        response.push(await getUserSearchAll({ id: item.id }));
    }
    return responseFromUserRecentSearch(...response);
};

export const UserDeleteSearch = async (data) => {
    const user = await getUser({ id: data.id });
    if (!user) {
        throw new UserNotFoundError("유저 정보를 가져오지 못 합니다.");
    }
    const search = await getUserSearch({ id: data.id });

    for (const item of search) {
        await delUserSearchStation({ id: item.id });
    }
    const dSearch = await delUserSearch({ id: search.id });
    return responseFromUserRecentSearch(dSearch);
}