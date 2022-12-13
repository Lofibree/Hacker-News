import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './NewItem.module.css'
// import EyeIcon from '@mui/icons-material/RemoveRedEyeOutlined'
import CommentIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import StarIcon from '@mui/icons-material/Star';

const NewsOneEl = ({ item, isFullNew }) => {

    return (
        <div className={styles.item}>
            <div className={styles.wrapper}>
                <div className={styles.info}>
                    <ul className={styles.newsDetails}>
                        <li>
                            <StarIcon />
                            <span>{item ? item.score : 'score'}</span>
                        </li>
                    </ul>
                    <div className={styles.details}>
                        <div className={styles.name}>{item ? item.by : 'author'}</div>
                        <div className={styles.additional}>Дата: {item ? item.time.split(',')[0] : 'time'}</div>
                        <div className={styles.additional}>Время: {item ? item.time.split(',')[1] : 'time'}</div>
                    </div>
                </div>
                <h3 className={styles.title}>
                    <NavLink to={`/news/${item.id}`}>{item ? item.title : 'title'}</NavLink>
                </h3>
                {isFullNew
                    ? ''
                    : <ul className={styles.newsDetails}>
                        <li>
                            <CommentIcon />
                            <span>{item.descendants}</span>
                        </li>
                    </ul>
                }
            </div>
        </div>
    );
};

export default NewsOneEl;