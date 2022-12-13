import { observer } from 'mobx-react-lite';
import React from 'react';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import main from '../../store/main';
import styles from './ParticularNew.module.css'
import Comment from '../Comment/Comment';

const ParticularNew = observer(() => {

    const navigate = useNavigate()
    const {id} = useParams()
    useEffect(() => {
        main.fetchOne(id)
    }, [])
    const goBack = () => navigate(-1)
    const partNew = main.particularNew
    const commentsEl = main.comments.map(c => <Comment comment={c}/>)
    // debugger
    return (
        <div className={styles.item}>
            <button onClick={goBack}>Go back</button>
            <h1>{partNew ? partNew.title : 'title'}</h1>
            <a href={`${partNew.url}`}>Перейти на страницу новости</a>
            <div>Дата: {partNew ? partNew.time : 'time'}</div>
            <div>Автор: {partNew ? partNew.by : 'author'}</div>
            <h2>Комментарии</h2>
            <div>{partNew.descendants}</div>
            <div>{commentsEl}</div>
        </div>
    );
})

export default ParticularNew;