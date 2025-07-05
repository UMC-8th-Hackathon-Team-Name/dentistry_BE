export const bodyToSearch = (body, query) => {
  return {
    start: query.start,
    end: query.end,
  };
};
export const responseFromSearch = (data) => {
  return {
    routes: data,
  };
};
export const bodyToFacilitySearch = (body, query) => {
  return {
    start: query.start,
    end: query.end,
  };
};
export const responseFromFacilitySearch = (data) => {
  return {
    line: data.stationCount,
    stations: data.stationFacilities,
  };
};
