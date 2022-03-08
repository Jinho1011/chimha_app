const initialState = {
  youtube: {},
};

export default (state = initialState, action: any) => {
  switch (action.type) {
    case "INIT_STATE": {
      const category = action.category;
      const data = action.data;

      return {
        ...state,
        [category]: data,
      };
    }
    default:
      return state;
  }
};
