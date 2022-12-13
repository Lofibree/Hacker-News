import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './NewsOneEl.module.css'

const NewsOneEl = ({newEl}) => {
    
    return (
        <div className={styles.item}>
            <div>
                <NavLink to={`/news/${newEl.id}`}>{newEl ? newEl.title : 'title'}</NavLink>
            </div>
            <div>Рейтинг: {newEl ? newEl.score : 'score'}</div>
            <div>Дата: {newEl ? newEl.time : 'time'}</div>
            <div>Автор: {newEl ? newEl.by : 'author'}</div>
            <div>Комментарии: {newEl ? newEl.descendants : 'comments'}</div>
        </div>
    );
};

export default NewsOneEl;