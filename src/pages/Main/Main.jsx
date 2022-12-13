import React from 'react';
import News from '../../components/News/News';
import main from '../../store/main';
import { observer } from 'mobx-react-lite'
import { useEffect } from 'react';
import { Button, Container } from '@mui/material';
import styles from './Main.module.css'
import GetAppIcon from '@mui/icons-material/GetApp';


const Main = observer(() => {

    useEffect(() => {
        main.fetchNews()
    }, [])
    return (
        <div>
            <Container maxWidth='sm'>
                <Button className={styles.btn} size='large' endIcon={<GetAppIcon/>} variant='outlined' onClick={() => main.fetchNews()}>Upload news</Button>
                <News />
            </Container>
        </div>
    );
})

export default Main;