import { prisma } from "../db.config.js";
export const createUserPrefer = async (data) => {
    const prefers = await prisma.preferFacility.createMany({
        data: data.categoryIds.map(facilityId => ({
            userId: data.id,
            facilityId: facilityId,
        })),
    });
    return prefers;
};

export const getUserPrefer = async (data) => {
    const facilities = await prisma.facility.findMany({
    where: {
      id: {
        in: data.categoryIds,
      },
    },
  })
  return facilities;
};

export const delUserPrefer = async (data) => {
    const prefer = await prisma.preferFacility.deleteMany({
        where: { userId: data.id },
    });
    return prefer;
};

export const getUserProfile = async (data) => {
    const user = await prisma.user.findFirst({
        where: { id: data.id },
        include: {
            PreferFacilities: {
                include: {
                    facility: true,
                },
            },
        },
    });
    return user;
}

export const getUserSearch = async (data) => {
    const user = await prisma.search.findMany({
        where: { userId: data.id },
    });
    console.log("getUserSearch", user);
    return user;
};
export const delUserSearch = async (data) => {
    const search = await prisma.search.deleteMany({
        where: { id: data.id },
    });
    return search;
};
export const delUserSearchStation = async (data) => {
    const search = await prisma.searchStation.deleteMany({
        where: { searchId: data.id },
    });
    return search;
};

export const delUser = async (data) => {
    const user = await prisma.user.delete({
        where: { id: data.id },
    });
    return user;
}

export const getUserSearchAll = async (data) => {
    const search = await prisma.searchStation.findMany({
        where: { searchId: data.id },
        include: {
            station: true,
        },
    });
    return search;
};
