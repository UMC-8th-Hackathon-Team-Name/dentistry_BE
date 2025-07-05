export const bodyToUserEdit = (body) => {
    return {
        id: body.id,
        facility: body.facility,
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
        facility: editUser
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
