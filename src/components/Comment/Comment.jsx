import { observer } from 'mobx-react-lite';
import React from 'react';
import { useState } from 'react';
import NestedComment from '../NestedComment/NestedComment';
import styles from './Comment.module.css'


const Comment = observer(({ comment }) => {

    const [nestedComments, setNestedComments] = useState([])

    const fetchNestedComments = (id) => {
        try {
            comment.kids.map(id => {
                fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`)
                    .then(response => response.json())
                    .then(json => {
                        setNestedComments([...nestedComments, json])
                    })
            })
        } catch (err) {
            console.warn(err)
            console.log('Не удалось получить вложенные комментарии')
        }
    }
    // console.log(nestedComments)

    return (
        <div className={styles.item}>
            <div className={styles.itemHeader}>
                <h2>{comment.by}</h2>
                <div>Дата: {comment.time}</div>
            </div>
            <div>{comment.text}</div>
            {comment.kids
                ? <button onClick={() => fetchNestedComments(comment.id)}>
                    fetch nested comments
                </button>
                : ''
            }
            {(nestedComments ? nestedComments : Array(5)).map(n => {
                return (<NestedComment nestedComments={n} />)
            })}
        </div>
    );
})

export default Comment;