import React from 'react';
import main from '../../store/main';
import {observer} from 'mobx-react-lite'
import NewsOneEl from '../NewOneEl/NewsOneEl';

const News = observer(() => {


    const newsEl = main.news.map(n => <NewsOneEl newEl={n} key={n.id}/>)

    return (
        <div>
            {newsEl}
        </div>
    );
})

export default News;