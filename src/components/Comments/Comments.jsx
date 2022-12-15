import React, { useState } from 'react';
import main from '../../store/main';
import CommentIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import styles from './Comments.module.css'
import Comment from '../Comment/Comment';
import { observer } from 'mobx-react-lite';
import { Grid, Paper, Skeleton, Typography } from '@mui/material';
import { Button } from '@mui/material';
import CachedIcon from '@mui/icons-material/Cached';
import { Box } from '@mui/material';
import { Container } from '@mui/system';


const Comments = observer(({ commentsCount }) => {

    const commentsEl = main.comments.map((c, index) => <Comment comment={c} index={index} />)
    const handleReload = () => {
        main.fetchComments()
    }
    return (
        <Paper sx={{ marginBottom: 20, paddingBottom: 15 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="h5" sx={{ padding: 5, display: 'flex', alignItems: 'center' }}>
                    Комментарии
                    <span className={styles.commentsCount}>
                        <CommentIcon />
                        <span>{commentsCount ? commentsCount : '0'}</span>
                    </span>
                </Typography>
                <div className={styles.btn}>
                    <Button
                        size='large'
                        endIcon={<CachedIcon />}
                        variant='outlined'
                        onClick={handleReload}
                    >
                        Обновить
                    </Button>
                </div>
            </Box>
            <div className={styles.commentsBox}>
                {main.isLoadingComments
                    ? <Skeleton variant='rounded' sx={{ width: { sm: '500px', xs: '400px', md: '800px' }, height: {sm: '500px', xs: '400px', md: '800px'} }} className={styles.skeleton} />
                    : <>
                        {commentsEl.length !== 0
                            ? commentsEl
                            : <Typography variant="h6" sx={{ padding: 5, marginLeft: 5 }}>Пока нет комментариев</Typography>
                        }
                    </>
                }
            </div>
        </Paper>
    );
})

export default Comments;