import { observer } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import main from '../../store/main';
import NewItem from '../NewItem/NewItem';
import Comments from '../Comments/Comments';
import { Container } from '@mui/system';
import { Box, Button } from '@mui/material';
import { Skeleton } from '@mui/material';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';


const FullNew = observer(() => {

    const { id } = useParams()

    useEffect(() => {
        main.fetchOne(id)
    }, [])

    const navigate = useNavigate()

    const goBack = () => navigate('/')
    const partNew = main.particularNew !== {} ? main.particularNew : {}

    return (
        <div >
            <Container maxWidth='md'>
                <Button onClick={goBack} startIcon={<KeyboardBackspaceIcon />} size='large' sx={{ marginBottom: 2, marginTop: 2 }}>Go back</Button>
                {partNew && partNew.by
                    ? <>
                        <NewItem
                            isFullNew={true}
                            item={partNew}
                        />
                        <Comments commentsCount={partNew.descendants} />
                    </>
                    : <Container sx={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                        <Skeleton variant='rounded' height={206} width={640} sx={{ marginBottom: 2 }} />
                        <Skeleton variant='rounded' height={400} width={640} />
                    </Container>
                }
            </Container>
        </div>
    );
})

export default FullNew;