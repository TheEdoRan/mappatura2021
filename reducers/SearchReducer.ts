export enum ActionTypes {
  RESET = "RESET",
  SET_REGION = "SET_REGION",
  SET_PROVINCE = "SET_PROVINCE",
  SET_CITY = "SET_CITY",
  SET_STREET = "SET_STREET",
  SET_NUMBER_EGON = "SET_NUMBER_EGON",
}

export interface SearchState {
  region?: string;
  province?: string;
  city?: string;
  street?: string;
  number?: string;
  egon?: string;
}

export const initialSearchState: SearchState = {
  region: "",
  province: "",
  city: "",
  street: "",
  number: "",
  egon: "",
};

export interface SearchDispatchAction {
  type: ActionTypes;
  payload?: string;
  egon?: string;
}

const resetState = (): SearchState => initialSearchState;

export const reducer = (
  state: SearchState,
  action: SearchDispatchAction,
): SearchState => {
  switch (action.type) {
    case ActionTypes.RESET:
      return resetState();
    case ActionTypes.SET_REGION:
      return { ...resetState(), region: action.payload };
    case ActionTypes.SET_PROVINCE:
      return {
        ...resetState(),
        region: state.region,
        province: action.payload,
      };
    case ActionTypes.SET_CITY:
      return {
        ...resetState(),
        region: state.region,
        province: state.province,
        city: action.payload,
      };
    case ActionTypes.SET_STREET:
      return {
        ...resetState(),
        region: state.region,
        province: state.province,
        city: state.city,
        street: action.payload,
      };
    case ActionTypes.SET_NUMBER_EGON:
      return {
        ...resetState(),
        region: state.region,
        province: state.province,
        city: state.city,
        street: state.street,
        number: action.payload,
        egon: action.egon,
      };
    default:
      return state;
  }
};
