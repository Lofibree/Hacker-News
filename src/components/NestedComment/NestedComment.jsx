import React, { useEffect } from 'react';
import { ListItemText, Skeleton } from '@mui/material';
import { Container } from '@mui/system';

const NestedComment = ({ item, isLoadingNested }) => {

    // useEffect(() => {

    // }, [])
    return (
        <Container maxWidth='sm' sx={{ borderLeft: '2px black solid' }}>
            {isLoadingNested
                ? <div style={{ display: "flex", flexDirection: "column" }}>
                    <Skeleton variant='text' height={25} width={120} />
                    <Skeleton variant='text' height={18} width={230} />
                </div>
                : <>
                    <ListItemText
                        primary={item ? item.by : 'commentAuthor'}
                        primaryTypographyProps={{ style: { wordBreak: 'break-word', width: '', fontSize: '18px', fontWeight: '600' } }}
                    />
                    {item && item.text 
                    ? <div dangerouslySetInnerHTML={{ __html: item.text }}></div> 
                    : ''
                    }
                </>
            }
        </Container>
    );
};

export default NestedComment;