import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './NewsOneEl.module.css'

const NewsOneEl = ({ newEl }) => {

    return (
        <div className={styles.item}>
            <div className={styles.wrapper}>
                <div className={styles.info}>
                    <div>Рейтинг: {newEl ? newEl.score : 'score'}</div>
                    <div className={styles.details}>
                        <div>Дата: {newEl ? newEl.time : 'time'}</div>
                        <div className={styles.name}>Автор: {newEl ? newEl.by : 'author'}</div>
                    </div>

                    <div>Комментарии: {newEl ? newEl.descendants : 'comments'}</div>
                </div>
                <div>
                    <NavLink to={`/news/${newEl.id}`}>{newEl ? newEl.title : 'title'}</NavLink>
                </div>
                <ul className={styles.newsDetails}>

                </ul>
            </div>
        </div>
    );
};

export default NewsOneEl;