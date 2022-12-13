import { observer } from 'mobx-react-lite';
import React from 'react';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import main from '../../store/main';
import styles from './FullNew.module.css'
import Comment from '../Comment/Comment';
import NewItem from '../NewItem/NewItem';
import Comments from '../Comments/Comments';
import { Container } from '@mui/system';

const FullNew = observer(() => {

    const navigate = useNavigate()
    const {id} = useParams()

    useEffect(() => {
        main.fetchOne(id)
    }, [])

    const goBack = () => navigate(-1)
    const partNew = main.particularNew

    return (
        <div >
            <Container maxWidth='md'>
            <button onClick={goBack}>Go back</button>
            <NewItem isFullNew={true} item={partNew} />
            <Comments/>
            </Container>
            
        </div>
    );
})

export default FullNew;