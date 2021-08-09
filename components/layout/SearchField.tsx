import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
const Select = dynamic(() => import("react-select"), { ssr: false });

import { useSearchContext } from "../../context/SearchContext";
import { ActionTypes } from "../../reducers/SearchReducer";

import {
  fetchRegions,
  fetchProvinces,
  fetchCities,
  fetchStreets,
  fetchNumbers,
  APIErrorToast,
} from "../../api";

type Props = {
  context: "regions" | "provinces" | "cities" | "streets" | "numbers";
  disabled?: boolean;
  title: "Regione" | "Provincia" | "Città" | "Via" | "Civico";
  className?: string;
  menuPlacement: "auto" | "top" | "bottom";
};

interface SelectOption {
  label?: string;
  value?: string;
  egon?: string;
}

const makeSelectOptions = (
  data: string[],
): { label: string; value: string }[] =>
  data.map((d) => ({
    value: d,
    label: d === "VALLEDAOSTA" ? "VALLE D'AOSTA" : d,
  }));

const makeNumbersSelectOptions = (data: { number: string; egon: string }[]) =>
  data.map((d) => ({ value: d.number, label: d.number, egon: d.egon }));

const SearchField = ({
  context,
  disabled,
  title,
  className,
  menuPlacement,
}: Props) => {
  const { state, dispatch } = useSearchContext();
  const [fetchedData, setFetchedData] = useState<SelectOption[]>([
    { label: "", value: "", egon: "" },
  ]);

  const contextFn = ({
    get,
    fetch,
    payload,
    egon,
  }: {
    get?: boolean;
    fetch?: boolean;
    payload?: string;
    egon?: string;
  }) => {
    switch (context) {
      case "regions":
        return get
          ? state.region
          : fetch
          ? fetchRegions()
          : dispatch({ type: ActionTypes.SET_REGION, payload });
      case "provinces":
        return get
          ? state.province
          : fetch
          ? fetchProvinces(state.region!)
          : dispatch({ type: ActionTypes.SET_PROVINCE, payload });
      case "cities":
        return get
          ? state.city
          : fetch
          ? fetchCities(state.province!)
          : dispatch({ type: ActionTypes.SET_CITY, payload });
      case "streets":
        return get
          ? state.street
          : fetch
          ? fetchStreets(state.province!, state.city!)
          : dispatch({ type: ActionTypes.SET_STREET, payload });
      case "numbers":
        return get
          ? state.number
          : fetch
          ? fetchNumbers(state.province!, state.city!, state.street!)
          : dispatch({ type: ActionTypes.SET_NUMBER_EGON, payload, egon });
      default:
        return;
    }
  };

  const getValueByContext = () => {
    const data = contextFn({ get: true });

    if (!data) {
      return null;
    }

    return { label: data, value: data };
  };

  const fetchOptionsByContext = async () => {
    if (disabled) {
      return;
    }

    try {
      const data = await contextFn({ fetch: true });

      if (context === "numbers") {
        setFetchedData(makeNumbersSelectOptions(data));
        return;
      }

      setFetchedData(makeSelectOptions(data));
    } catch (e) {
      console.error(e);
      APIErrorToast(e);
    }
  };

  const setStateByContext = ({
    payload,
    egon,
  }: {
    payload: string;
    egon?: string;
  }) => {
    contextFn({ get: false, payload, egon });
  };

  useEffect(() => {
    fetchOptionsByContext();
  }, [state]);

  return (
    <div className="w-full">
      <h3 className="text-indigo-200 text-xl mb-3">{title}</h3>
      <Select
        isDisabled={disabled}
        cacheOptions
        defaultOptions
        options={fetchedData}
        menuPlacement={menuPlacement}
        styles={{
          control: (styles, { isDisabled }) => {
            return {
              ...styles,
              backgroundColor: isDisabled ? "#b0b0b0" : "#f7f7f7",
              fontStyle: isDisabled ? "italic" : "normal",
            };
          },
        }}
        value={getValueByContext()}
        onChange={({ value, egon }: any) => {
          setStateByContext({ payload: value, egon: egon });
        }}
        noOptionsMessage={({ inputValue }) =>
          !inputValue ? "" : "Nessun risultato"
        }
        className={`w-full text-blue-900 ${className}`}
        placeholder="Seleziona"
        filterOption={({ data }, query) => {
          if (!query) {
            return fetchedData.indexOf(data) < 50;
          }

          return data.label.toLowerCase().includes(query.toLowerCase());
        }}
      />
    </div>
  );
};

export default SearchField;
