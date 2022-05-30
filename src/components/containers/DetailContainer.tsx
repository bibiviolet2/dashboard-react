import { useParams } from 'react-router';
import React from 'react';
import Detail from '../detail/Detail';
import useAppStateContext from '../../hooks/useAppStateContext';

const DetailContainer: React.FC = () => {
    const { id } = useParams();
    const { appState } = useAppStateContext();

    return (
        <Detail
            error={{
                show:
                    appState.posts.isLoaded &&
                    undefined !== id &&
                    undefined === appState.posts.data[parseInt(id)],
                messageId: 'error.postNotFound',
            }}
            post={
                appState.posts.isLoaded &&
                undefined !== id &&
                undefined !== appState.posts.data[parseInt(id)]
                    ? appState.posts.data[parseInt(id)]
                    : undefined
            }
            comments={
                appState.comments.isLoaded &&
                undefined !== id &&
                undefined !== appState.comments.data[parseInt(id)]
                    ? appState.comments.data[parseInt(id)]
                    : undefined
            }
            user={
                appState.users.isLoaded &&
                appState.posts.isLoaded &&
                undefined !== id &&
                undefined !== appState.posts.data[parseInt(id)] &&
                undefined !==
                    appState.users.data[
                        appState.posts.data[parseInt(id)].userId
                    ]
                    ? appState.users.data[
                          appState.posts.data[parseInt(id)].userId
                      ]
                    : undefined
            }
        />
    );
};

export default DetailContainer;
