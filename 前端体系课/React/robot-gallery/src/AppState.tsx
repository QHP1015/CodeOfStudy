import React, { useState, ReactDOM, ReactChild } from "react";

interface AppStateValue {
  username: string;
  shoppingCart: {
    items: { id: number; name: string }[];
  };
}

const defaultContextValue: AppStateValue = {
  username: "qhp",
  shoppingCart: {
    items: [],
  },
};

export const appContext = React.createContext(defaultContextValue);
export const appSetStateContext = React.createContext<React.Dispatch<React.SetStateAction<AppStateValue>> | undefined>(
  undefined
);

interface Props {
  children: ReactChild;
}

export const AppStateProvider: React.FC<Props> = (props: Props) => {
  const [state, setState] = useState(defaultContextValue);

  return (
    <appContext.Provider value={state}>
      <appSetStateContext.Provider value={setState}>{props.children}</appSetStateContext.Provider>
    </appContext.Provider>
  );
};
