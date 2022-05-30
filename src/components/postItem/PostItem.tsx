import React from 'react';
import { IComment, IPost, IUser } from '../../types/IAppState';
import classNames from 'classnames';
import styles from './PostItem.module.scss';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';

interface IPostItem {
    post?: IPost;
    user?: IUser;
    comments?: Array<IComment>;
}

const PostItem: React.FC<IPostItem> = ({ post, user, comments }) => {
    return (
        <article
            className={classNames(
                styles.postItem,
                undefined === post ? styles.placeholder : ''
            )}
        >
            {undefined !== post ? (
                <>
                    <h2>
                        <Link to={`/${post.id}`}>{post.title}</Link>
                    </h2>
                    <div
                        className={classNames(
                            styles.author,
                            undefined === user ? styles.placeholder : ''
                        )}
                    >
                        {undefined !== user
                            ? `${user.username} (${user.email})`
                            : null}
                    </div>
                    <p>{post.body}</p>
                    <div className={styles.moreInfo}>
                        <span>
                            <FormattedMessage
                                defaultMessage={`Show more...`}
                                id="post.showMore"
                            />
                        </span>
                        {undefined !== comments ? (
                            <span>
                                <FormattedMessage
                                    defaultMessage={`Comments`}
                                    id="post.comments"
                                />{' '}
                                ({comments.length})
                            </span>
                        ) : (
                            <span
                                className={classNames(
                                    styles.comments,
                                    styles.placeholder
                                )}
                            ></span>
                        )}
                    </div>
                </>
            ) : null}
        </article>
    );
};

export default PostItem;
