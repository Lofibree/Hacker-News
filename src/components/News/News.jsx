import React from 'react';
import main from '../../store/main';
import {observer} from 'mobx-react-lite'
import NewsOneEl from '../NewOneEl/NewsOneEl';
import { Grid } from '@mui/material';



const News = observer(() => {


    const newsEl = main.news.map(n => <NewsOneEl newEl={n} key={n.id}/>)

    return (
        <div>
            <Grid container spacing={4} >
                <Grid xs={12} item>
                    {newsEl}
                </Grid>
            </Grid>
        </div>
    );
})

export default News;