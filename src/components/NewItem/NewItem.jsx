import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './NewItem.module.css'
import CommentIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import StarIcon from '@mui/icons-material/Star';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { observer } from 'mobx-react-lite';
import { Paper } from '@mui/material';


const NewItem = observer(({ item, isFullNew }) => {
    // debugger
    return (
        <div className={styles.item}>
            <div className={styles.wrapper}>
                <div className={styles.info}>
                    <div style={{ display: 'flex' }}>
                        <span className={styles.starIconBox}>
                            <StarIcon />
                            <span>{item.length !== 0 ? item.score : 'score'}</span>
                        </span>
                        <div className={styles.details}>
                            <div className={styles.name}>{item && item.by ? item.by : 'author'}</div>
                            <div className={styles.additional}>Дата: {item && item.time ? item.time.split(',')[0] : 'time'}</div>
                            <div className={styles.additional}>Время: {item && item.time ? item.time.split(',')[1] : 'time'}</div>
                        </div>
                    </div>
                    {item && item.url
                        ? <a href={item ? item.url : '#'} target="_blank" title='Перейти в источник новости' className={styles.externalLink}><ExitToAppIcon /></a>
                        : ''
                    }
                </div>
                <h3 className={styles.title}>
                    <NavLink to={`/news/${item && item.id ? item.id : ''}`}>
                        {item && item.title ? item.title : 'title'}
                    </NavLink>
                </h3>
                {isFullNew
                    ? <>
                        {item.text
                            ? <p dangerouslySetInnerHTML={{ __html: item.text }} style={{ padding: '20px' }}></p>
                            : ''
                        }
                    </>
                    : <div className={styles.commentIconBox}>
                        <CommentIcon />
                        <span>{item ? item.descendants : 'descendants'}</span>
                    </div>
                }
            </div>
        </div>
    );
})

export default NewItem;