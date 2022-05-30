import React from 'react';
import { IComments, IPost, IUser } from '../../types/IAppState';
import Comments from '../comments/Comments';
import styles from './Detail.module.scss';
import classNames from 'classnames';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';

interface IDetail {
    post?: IPost;
    user?: IUser;
    comments?: IComments;
    error: {
        show: boolean;
        messageId: string;
    };
}

const Detail: React.FC<IDetail> = ({ post, user, comments }) => {
    return (
        <>
            <div
                className={classNames(
                    styles.detail,
                    undefined === post ? styles.placeholder : ''
                )}
            >
                <div className={styles.back}>
                    <Link to="/">
                        <FormattedMessage
                            defaultMessage={`Back`}
                            id="detail.back"
                        />
                    </Link>
                </div>
                {undefined !== post ? (
                    <>
                        <h2>{post.title}</h2>
                        <div
                            className={classNames(
                                styles.author,
                                undefined === user ? styles.placeholder : ''
                            )}
                        >
                            {undefined !== user ? (
                                <>
                                    {user.username} - {user.name} -{' '}
                                    <a href={`mailto: ${user.email}`}>
                                        {user.email}
                                    </a>{' '}
                                    - {user.phone}
                                </>
                            ) : null}
                        </div>
                        <p>{post.body}</p>
                        <h3>
                            <FormattedMessage
                                defaultMessage={`Comments`}
                                id="detail.comments"
                            />
                        </h3>
                        <Comments comments={comments} />
                    </>
                ) : null}
            </div>
        </>
    );
};

export default Detail;
