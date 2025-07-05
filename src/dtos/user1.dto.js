export const bodyToUserEdit = (body) => {
    return {
        id: body.id,
        categoryIds: body.categoryIds,
    }
};
export const responseFromUserEdit = ({user, editUser }) => {
    return {
        user,
        category: editUser
    }
};

export const bodyToUserProfile = (body) => {
    return {
        id: body.id,
    }
}

export const responseFromUserProfile = (user) => {
    return {
        user
    }
}

export const bodyToUserDelete = (body) => {
    return {
        id: body.id,
    }
}

export const responseFromUserDelete = (user) => {
    return {
        user
    }
}