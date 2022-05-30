import React from 'react';
import { IComments } from '../../types/IAppState';
import config from '../../config/config.json';
import Comment from '../comment/Comment';

interface ICommentsList {
    comments?: IComments;
}

const Comments: React.FC<ICommentsList> = ({ comments }) => {
    const placeholders = (): JSX.Element[] => {
        let ret: JSX.Element[] = [];
        for (let i = 0; i < config.comments.placeholders; i++) {
            ret.push(<Comment key={i} />);
        }

        return ret;
    };

    return (
        <div>
            {undefined === comments
                ? placeholders()
                : comments.map((comment, key) => (
                      <Comment comment={comment} key={key} />
                  ))}
        </div>
    );
};

export default Comments;
