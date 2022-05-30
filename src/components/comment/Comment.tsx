import { IComment } from '../../types/IAppState';
import React from 'react';
import classNames from 'classnames';
import styles from './Comment.module.scss';

interface ICommentItem {
    comment?: IComment;
}
const Comment: React.FC<ICommentItem> = ({ comment }) => {
    return (
        <div
            className={classNames(
                styles.comment,
                undefined === comment ? styles.placeholder : ''
            )}
        >
            {undefined !== comment ? (
                <>
                    <div className={styles.title}>
                        {comment.name} ({comment.email})
                    </div>
                    <p>{comment.body}</p>
                </>
            ) : null}
        </div>
    );
};

export default Comment;
