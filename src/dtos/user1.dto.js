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