import { prisma } from "../db.config.js";
export const getStationCoordinate = async (data) => {
  const station = await prisma.subwayStation.findFirst({
    where: {
      name: data,
    },
  });
  if (station == null) {
    return -1;
  }
  return {
    lat: station.latitude,
    lon: station.longitude,
  };
};
export const getStationCode = async (data) => {
  const station = await prisma.subwayStation.findFirst({
    where: {
      name: data,
    },
  });
  if (station == null) {
    return -1;
  }
  return station.code;
};
