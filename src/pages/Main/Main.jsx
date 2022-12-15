import React, { useState } from 'react';
import News from '../../components/News/News';
import main from '../../store/main';
import { observer } from 'mobx-react-lite'
import { useEffect } from 'react';
import { Button, Container } from '@mui/material';
import styles from './Main.module.css'
import CachedIcon from '@mui/icons-material/Cached';
import Preloader from '../../components/Preloader/Preloader';
import { useLocation } from 'react-router-dom';



const Main = observer(() => {
    const location = useLocation()

    useEffect(() => {
        main.fetchNews()
    }, [])

    const handleReload = () => {
        main.fetchNews()
    }

    // setTimeout(() => {
    //     if (location.pathname === '/') {
    //         main.fetchNews()
    //     }
    // }, 60000)

    return (
        <div>
            <Container maxWidth='md' sx={{minHeight: 1000}}>
                <div className={styles.btn}>
                    <Button
                        size='large'
                        endIcon={<CachedIcon />}
                        variant='outlined'
                        onClick={handleReload}
                    >
                        Обновить
                    </Button>
                </div>
                {main.isLoadingNews
                    ? <Preloader />
                    : <News news={main.news} isLoadingNews={main.isLoadingNews} />
                }
            </Container>
        </div>
    );
})

export default Main;