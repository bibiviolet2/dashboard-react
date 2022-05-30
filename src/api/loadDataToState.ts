import { IDataStateTypes } from "../types/IAppState";
import { Dispatch } from "react";
import { IAppStateAction, IAppStateActionTypes } from "../hooks/useAppState";
import { loadData } from "./loadData";
import config from "../config/config.json";

const loadDataToState = async <Type>(
  dispatch: Dispatch<IAppStateAction>,
  isDebugMode: boolean,
  endpoint: string,
  actionType: IAppStateActionTypes,
  processData: (data: Array<Type>) => Record<number, IDataStateTypes>
) => {
  let fetchedData: Array<Type> | undefined = await loadData<Type>(
    endpoint,
    isDebugMode
  );

  // this timeout is here just for fun, I want to look at the placeholders :))
  setTimeout(() => {
    dispatch({
      type: actionType,
      data: processData(fetchedData ?? <Type[]>[]),
    });
  }, config.fetchDelay);
};

export { loadDataToState };
