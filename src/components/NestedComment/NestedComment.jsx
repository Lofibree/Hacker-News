import React from 'react';
import { Divider, ListItemText, Skeleton } from '@mui/material';
import { Container } from '@mui/system';
import { observer } from 'mobx-react-lite';

const NestedComment = observer(({ item, isLoadingNested }) => {

    return (
        <Container maxWidth='sm' sx={{ borderLeft: '2px black solid' }}>
            <>
                <ListItemText
                    primary={item ? item.by : 'commentAuthor'}
                    secondary={item ? item.time : 'time'}
                    primaryTypographyProps={{ style: { wordBreak: 'break-word', width: '', fontSize: '18px', fontWeight: '600' } }}
                />
                {item && item.text
                    ? <div dangerouslySetInnerHTML={{ __html: item.text }}></div>
                    : ''
                }
                <div>
                    {item && item.kidsObj
                        ? item.kidsObj.map(i =>
                            <Container maxWidth='xs' sx={{ borderLeft: '2px black solid', marginBottom: 2 }}>
                                <ListItemText
                                    primary={i ? i.by : 'commentAuthor'}
                                    secondary={i ? i.time : 'time'}
                                    primaryTypographyProps={{ style: { wordBreak: 'break-word', width: '', fontSize: '18px', fontWeight: '600' } }}
                                />
                                {i && i.text
                                    ? <div dangerouslySetInnerHTML={{ __html: i.text }}></div>
                                    : ''
                                }
                            </Container>)
                        : ''
                    }
                </div>
                <Divider />
            </>
        </Container>
    );
})

export default NestedComment;