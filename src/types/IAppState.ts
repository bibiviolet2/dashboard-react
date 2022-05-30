interface IPost {
  userId: number;
  id: number;
  title: string;
  body: string;
}

interface IComment {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
}

type IComments = Array<IComment>;

interface IUser {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
}

type IDataTypes = IPost | IUser | IComment;
type IDataStateTypes = IPost | IUser | IComments;

interface IAppStateData<Type> {
  isLoaded: boolean;
  data: Record<number, Type>;
}

interface IAppState {
  posts: IAppStateData<IPost>;
  comments: IAppStateData<IComments>;
  users: IAppStateData<IUser>;
  list: {
    limit: number;
  };
}

export {
  IUser,
  IPost,
  IComment,
  IComments,
  IAppState,
  IAppStateData,
  IDataTypes,
  IDataStateTypes,
};
