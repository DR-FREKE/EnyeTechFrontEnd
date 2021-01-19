import React, { useState } from "react";

export const AppContext = React.createContext();

const ContextProvider = AppContext.Provider;
export const Consumer = AppContext.Consumer;

export const Provider = (props) => {
  const initialState = {
    profile: [],
    itemOnPage: [],
    status: "",
    size: 0,
    currentPage: 1,
    loading: true,
    filtering: false,
    author: "Solomon Ndifereke",
    display: false,
  };
  const [state, setState] = useState(initialState);

  return (
    <ContextProvider value={[state, setState]}>
      {props.children}
    </ContextProvider>
  );
};
