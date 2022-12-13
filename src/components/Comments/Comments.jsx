import React from 'react';
import main from '../../store/main';
import CommentIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import styles from './Comments.module.css'
import Comment from '../Comment/Comment';

const Comments = () => {

    const commentsEl = main.comments.map(c => <Comment comment={c} />)

    return (
        <div>
            <div style={{ display: 'flex' }}>
                <h2>Комментарии</h2>
                <div className={styles.commentsCount}>
                    <CommentIcon />
                    <span>{commentsEl.length}</span>
                </div>
            </div>
            {/* <div>{partNew.descendants}</div> */}
            <div>{commentsEl}</div>
        </div>
    );
};

export default Comments;