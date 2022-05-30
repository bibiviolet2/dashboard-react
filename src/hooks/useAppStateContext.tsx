import React, { PropsWithChildren } from "react";
import { IAppState } from "../types/IAppState";
import App from "../App";

interface IAppStateApi {
  appState: IAppState;
  getPostsCount: () => number;
  increasePostsLimit: () => void;
}

const AppStateContext = React.createContext<IAppStateApi | undefined>(
  undefined
);

const AppStateProvider: React.FC<
  PropsWithChildren<{
    appState: IAppState;
    getPostsCount: () => number;
    increasePostsLimit: () => void;
  }>
> = ({ appState, getPostsCount, increasePostsLimit, children }) => {
  return (
    <AppStateContext.Provider
      value={{ appState, getPostsCount, increasePostsLimit }}
    >
      {children}
    </AppStateContext.Provider>
  );
};

const useAppStateContext = (): IAppStateApi => {
  const context = React.useContext(AppStateContext);

  if (undefined === context) {
    throw new Error(
      "useAppStateContext must be used within a AppStateProvider"
    );
  }

  return context;
};

export default useAppStateContext;
export { AppStateProvider, IAppStateApi };
