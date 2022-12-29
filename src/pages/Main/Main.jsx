import React, { useState } from 'react';
import News from '../../components/News/News';
import main from '../../store/main';
import { observer } from 'mobx-react-lite'
import { useEffect } from 'react';
import { Box, Button, Container, FormControl, Select, Typography } from '@mui/material';
import styles from './Main.module.css'
import CachedIcon from '@mui/icons-material/Cached';
import Preloader from '../../components/Preloader/Preloader';
import { useLocation } from 'react-router-dom';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';


const Main = observer(() => {

    const location = useLocation()
    const [sortValue, setSortValue] = React.useState('')

    useEffect(() => {
        main.fetchNews()
        setInterval(() => {
            if (location.pathname === '/') {
                main.fetchNews()
                setSortValue('');
            }
        }, 60000)
        setSortValue('');
    }, [])
    const handleChange = (event) => {
        main.sortNews(event.target.value)
        setSortValue(event.target.value);
    }
    const handleReload = () => {
        main.fetchNews()
        setSortValue('');
    }

    return (
        <div>
            <Container maxWidth='md' sx={{ minHeight: 1000 }}>
                <Typography variant='h3' sx={{ margin: 2 }}>Last 100 news</Typography>

                <div className={styles.optionsBox}>
                    <Box sx={{ minWidth: 200 }}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Сортировать по</InputLabel>
                            <Select labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={sortValue}
                                label="Сортировать по"
                                onChange={handleChange}
                            >
                                <MenuItem value={'rating'}>Рейтингу</MenuItem>
                                <MenuItem value={'comments number'}>Количеству комментариев</MenuItem>
                                {/* <MenuItem value={30}>Thirty</MenuItem> */}
                            </Select>
                        </FormControl>
                    </Box>
                    <Button
                        size='large'
                        endIcon={<CachedIcon />}
                        variant='outlined'
                        onClick={handleReload}
                    >
                        Обновить
                    </Button>
                </div>
                {main.news.length <= 70
                    ? <Preloader />
                    : <News news={main.news} isLoadingNews={main.isLoadingNews} />
                }
            </Container>
        </div>
    );
})

export default Main;