import { Button, ListItemText, ListItem, Typography, Collapse, List } from '@mui/material';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { useState } from 'react';
import NestedComment from '../NestedComment/NestedComment';
import styles from './Comment.module.css'
import { Divider } from '@mui/material';
import GetAppIcon from '@mui/icons-material/GetApp';
import { Container } from '@mui/system';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';


const Comment = observer(({ comment, index }) => {

    const [nestedComments, setNestedComments] = useState([])
    const [isLoadingNested, setIsLoadingNested] = useState(false)
    const [open, setOpen] = useState(true)

    const fetchNestedComments = () => {
        try {
            setIsLoadingNested(true)
            comment.kids.map(id => {
                fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`)
                    .then(response => response.json())
                    .then(json => {
                        setNestedComments([...nestedComments, json])
                        setIsLoadingNested(false)
                    })
            })
        } catch (err) {
            console.warn(err)
            console.log('Не удалось получить вложенные комментарии')
        }
    }
    const handleClick = () => {
        setOpen(!open);
    }

    const nestedCommentsEl = nestedComments.map(n => {
        return (
            <ListItem>
                <NestedComment isLoadingNested={isLoadingNested} item={n} />
            </ListItem>
        )
    })

    return (
        <Container maxWidth='md' sx={{ borderLeft: '2px black solid', marginLeft: 1, marginBottom: 4 }}>

            <React.Fragment key={index}>
                <ListItemText
                    primary={comment ? comment.by : 'commentAuthor'}
                    secondary={comment ? comment.time : 'time'}
                    primaryTypographyProps={{ style: { wordBreak: 'break-word', width: '', fontSize: '20px', fontWeight: '700' } }}
                />
                <div dangerouslySetInnerHTML={{ __html: comment.text }}></div>
                {comment.kids
                    ? <>
                        {nestedComments.length !== 0
                            ? <><Typography onClick={handleClick} className={styles.nestedBtn} sx={{ marginLeft: 3.3, marginTop: 1, color: 'blue', display: 'flex' }}>
                                <Typography>Nested Comments</Typography>
                                {open ? <ExpandLess /> : <ExpandMore />}
                            </Typography>
                            </>
                            : <Button color='primary' endIcon={<GetAppIcon />} variant="text" size='medium' onClick={() => fetchNestedComments()}>
                                Fetch nested comments
                            </Button>
                        }
                    </>
                    : ''
                }
                <Collapse in={open} timeout="auto" unmountOnExit children={nestedCommentsEl}>
                    <List component="div" disablePadding>
                        {nestedCommentsEl}
                    </List>
                </Collapse>
                <Divider />
            </React.Fragment>
        </Container>
    );
})

export default Comment;