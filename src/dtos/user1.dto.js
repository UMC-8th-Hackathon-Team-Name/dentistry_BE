export const bodyToUserEdit = (body) => {
    return {
        id: body.id,
        categoryIds: body.categoryIds,
    }
};

export const bodyToUserId = (body) => {
    return {
        id: body.id,
    }
};

export const responseFromUserEdit = ({user, editUser }) => {
    return {
        user,
        category: editUser
    }
};

export const responseFromUserProfile = (user) => {
    return {
        user
    }
}

export const responseFromUserDelete = (user) => {
    return {
        user
    }
}


export const responseFromUserRecentSearch = (user) => {
    return {
        user
    }
}
