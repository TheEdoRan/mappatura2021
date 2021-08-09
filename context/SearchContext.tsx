import { createContext, useContext, useReducer } from "react";
import {
  SearchState,
  initialSearchState,
  SearchDispatchAction,
  reducer,
} from "../reducers/SearchReducer";

interface ContextProps {
  state: SearchState;
  dispatch: React.Dispatch<SearchDispatchAction>;
}

const SearchContext = createContext<ContextProps>({
  state: initialSearchState,
  dispatch: () => {},
});

export const useSearchContext = () => useContext(SearchContext);

type Props = {
  children?: React.ReactNode;
};

export const SearchContextProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(reducer, initialSearchState);

  return (
    <SearchContext.Provider value={{ state, dispatch }}>
      {children}
    </SearchContext.Provider>
  );
};
