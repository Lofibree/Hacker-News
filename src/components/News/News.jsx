import React, { useState } from 'react';
import main from '../../store/main';
import { observer } from 'mobx-react-lite'
import NewItem from '../NewItem/NewItem';
import { Container, Grid, Pagination, Skeleton, Stack } from '@mui/material';


const News = observer((props) => {

    return (
        <div>
            <Grid container spacing={4}>
                <Grid xs={12} item>
                    {props.isLoadingNews
                        ? [...Array(100)].map(n => <Skeleton variant='rectangular' sx={{margin: 1, height: '200px'}} />)
                        : props.news.map(n => <NewItem item={n} key={n.id} isFullNew={false} />)
                    }
                </Grid>
            </Grid>
        </div>
    );
})

export default News;