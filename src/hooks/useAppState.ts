import {
  IAppState,
  IComment,
  IComments,
  IDataStateTypes,
  IPost,
  IUser,
} from "../types/IAppState";
import { useEffect, useReducer } from "react";
import { useDebug } from "./useDebug";
import config from "../config/config.json";
import { loadDataToState } from "../api/loadDataToState";

type IAppStateActionTypes =
  | "fetch-posts"
  | "fetch-comments"
  | "fetch-users"
  | "set-limit";

interface IAppStateAction {
  type: IAppStateActionTypes;
  data: Record<number, IDataStateTypes> | number;
}

const getAppStateReducer = (
  state: IAppState,
  action: IAppStateAction
): IAppState => {
  switch (action.type) {
    case "fetch-posts":
      return {
        ...state,
        posts: {
          isLoaded: true,
          data: action.data as Record<number, IPost>,
        },
      };
    case "fetch-comments":
      return {
        ...state,
        comments: {
          isLoaded: true,
          data: action.data as Record<number, IComments>,
        },
      };
    case "fetch-users":
      return {
        ...state,
        users: {
          isLoaded: true,
          data: action.data as Record<number, IUser>,
        },
      };
    case "set-limit":
      return {
        ...state,
        list: {
          limit: action.data as number,
        },
      };
  }
  return {
    ...state,
  };
};

const initialState: IAppState = {
  posts: {
    isLoaded: false,
    data: {},
  },
  comments: {
    isLoaded: false,
    data: {},
  },
  users: {
    isLoaded: false,
    data: {},
  },
  list: {
    limit: config.list.pager.perPage,
  },
};

const processData = (
  data: Array<IPost | IUser>
): Record<number, IDataStateTypes> => {
  let stateData: Record<number, IDataStateTypes> = {};

  data.forEach((item) => {
    stateData[item.id] = item;
  });

  return stateData;
};

const processCommentsData = (
  data: Array<IComment>
): Record<number, IDataStateTypes> => {
  let stateData: Record<number, IComments> = {};

  data.forEach((item) => {
    if (undefined === stateData[item.postId]) {
      stateData[item.postId] = [];
    }
    stateData[item.postId].push(item);
  });

  return stateData;
};

const useAppState = (): {
  appState: IAppState;
  getPostsCount: () => number;
  increasePostsLimit: () => void;
} => {
  const [state, dispatch] = useReducer(getAppStateReducer, initialState);
  const isDebugMode = useDebug();

  const getPostsCount = (): number => {
    if (state.posts.isLoaded) {
      return Object.keys(state.posts.data).length;
    }
    return 0;
  };

  const increasePostsLimit = () => {
    if (getPostsCount() > state.list.limit) {
      dispatch({
        type: "set-limit",
        data: state.list.limit + config.list.pager.perPage,
      });
    }
  };

  const loadPosts = async () => {
    await loadDataToState<IPost>(
      dispatch,
      isDebugMode,
      config.endpoints.posts,
      "fetch-posts",
      processData
    );
  };

  const loadUsers = async () => {
    await loadDataToState<IUser>(
      dispatch,
      isDebugMode,
      config.endpoints.users,
      "fetch-users",
      processData
    );
  };

  const loadComments = async () => {
    await loadDataToState(
      dispatch,
      isDebugMode,
      config.endpoints.comments,
      "fetch-comments",
      processCommentsData
    );
  };

  useEffect(() => {
    if (!state.posts.isLoaded) {
      (async () => {
        await loadPosts();
      })();
    }
  }, []);

  useEffect(() => {
    if (state.posts.isLoaded && !state.users.isLoaded) {
      (async () => {
        await loadUsers();
      })();
    }
  }, [state.posts.isLoaded]);

  useEffect(() => {
    if (state.users.isLoaded && !state.comments.isLoaded) {
      (async () => {
        await loadComments();
      })();
    }
  }, [state.users.isLoaded]);

  useEffect(() => {
    if (isDebugMode) {
      console.log("State has changed: ", state);
    }
  }, [state]);

  return { appState: state, getPostsCount, increasePostsLimit };
};

export default useAppState;

export { IAppStateAction, IAppStateActionTypes };
