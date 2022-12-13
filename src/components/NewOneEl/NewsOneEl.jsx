import React from 'react';
import styles from './NewsOneEl.module.css'

const NewsOneEl = ({newEl}) => {
    
    return (
        <div className={styles.item}>
            <div><a href={newEl.url}>{newEl ? newEl.title : 'title'}</a></div>
            <div>Рейтинг: {newEl ? newEl.score : 'score'}</div>
            <div>Дата: {newEl ? newEl.time : 'time'}</div>
            <div>Автор: {newEl ? newEl.by : 'author'}</div>
        </div>
    );
};

export default NewsOneEl;