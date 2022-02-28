export const INIT_STATE = "INIT_STATE";

export const initState = (category: string, data: Object) => {
  return { type: INIT_STATE, category, data };
};
