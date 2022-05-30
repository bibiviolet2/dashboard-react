import React, { useEffect } from 'react';
import useAppStateContext from '../../hooks/useAppStateContext';
import List from '../list/List';

const ListContainer: React.FC = () => {
    const { appState, getPostsCount, increasePostsLimit } =
        useAppStateContext();

    return (
        <List
            items={appState.posts.isLoaded ? appState.posts.data : undefined}
            limit={appState.list.limit}
            users={appState.users.isLoaded ? appState.users.data : undefined}
            comments={
                appState.comments.isLoaded ? appState.comments.data : undefined
            }
            showMore={
                appState.posts.isLoaded
                    ? getPostsCount() > appState.list.limit
                    : undefined
            }
            showMoreHandler={increasePostsLimit}
        />
    );
};

export default ListContainer;
