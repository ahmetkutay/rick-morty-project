// src/state/actions/locationActions.ts
export const SET_LOCATIONS = "SET_LOCATIONS";

export const setLocations = (locations: any) => ({
  type: SET_LOCATIONS,
  payload: locations,
});
