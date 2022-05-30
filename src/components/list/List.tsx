import React from 'react';
import { IComments, IPost, IUser } from '../../types/IAppState';
import config from '../../config/config.json';
import PostItem from '../postItem/PostItem';
import styles from './List.module.scss';
import { FormattedMessage } from 'react-intl';

interface IList {
    items?: Record<number, IPost>;
    limit?: number;
    users?: Record<number, IUser>;
    comments?: Record<number, IComments>;
    showMore?: boolean;
    showMoreHandler?: () => void;
}
const List: React.FC<IList> = ({
    items,
    limit,
    users,
    comments,
    showMore,
    showMoreHandler,
}) => {
    const placeholders = (): JSX.Element[] => {
        let ret: JSX.Element[] = [];
        for (let i = 0; i < config.list.placeholders; i++) {
            ret.push(<PostItem key={i} />);
        }

        return ret;
    };

    return (
        <div className={styles.list}>
            {undefined === items
                ? placeholders()
                : Object.keys(items)
                      .slice(0, limit)
                      .map((key) => {
                          const numKey = parseInt(key);
                          return (
                              <PostItem
                                  key={key}
                                  post={items[numKey]}
                                  user={
                                      undefined === users ||
                                      undefined === users[items[numKey].userId]
                                          ? undefined
                                          : users[items[numKey].userId]
                                  }
                                  comments={
                                      undefined === comments ||
                                      undefined === comments[numKey]
                                          ? undefined
                                          : comments[numKey]
                                  }
                              />
                          );
                      })}
            {undefined !== showMoreHandler && (showMore ?? false) ? (
                <div className={styles.nextPosts}>
                    <button onClick={showMoreHandler}>
                        <FormattedMessage
                            defaultMessage={`Next posts`}
                            id="post.nextPosts"
                        />
                    </button>
                </div>
            ) : null}
        </div>
    );
};

export default List;
