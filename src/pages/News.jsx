import React from 'react';
import main from '../store/main';
import {observer} from 'mobx-react-lite'
import NewsOneEl from '../components/NewOneEl/NewsOneEl';

const News = observer(() => {


    const newsEl = main.news.map(n => <NewsOneEl newEl={n} key={n.id}/>)

    return (
        <div>
            {/* {main.newsIds.map(n => {
            return (
                <div>
                    <div>{n}</div>
                </div>
            )
            })} */}
            {newsEl}
        </div>
    );
})

export default News;