import { Button, ListItemText, ListItem, Typography, Collapse, List } from '@mui/material';
import { observer } from 'mobx-react-lite';
import React, { useMemo } from 'react';
import { useState } from 'react';
import NestedComment from '../NestedComment/NestedComment';
import styles from './Comment.module.css'
import { Divider } from '@mui/material';
import GetAppIcon from '@mui/icons-material/GetApp';
import { Container } from '@mui/system';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { Skeleton } from '@mui/material';
import CachedIcon from '@mui/icons-material/Cached';
import main from '../../store/main';


const Comment = observer(({ comment, index }) => {

    // const [nestedComments, setNestedComments] = useState([])
    const [isLoadingNested, setIsLoadingNested] = useState(false)
    const [open, setOpen] = useState(true)
    // const nestedComments = []
    // const parseResponse = async (pending) => {
    //     try {
    //         const response = await pending
    //         const json = await response.json()
    //         debugger
    //         return { ...response }
    //       } catch (error) {
    //         return { ...error.response, error }
    //       }
    // } 
    // debugger
    console.log(main.nestedComments[comment.id])
    console.log(comment.id)
    console.log(main.nestedComments)

    // const fetchNestedComments = async () => {
    //     // nestedComments = null
    //     try {
    //         // await comment.kids.map(async (id) => {
    //         //     setIsLoadingNested(true)
    //         //     try {
    //         //         const response = await fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`)
    //         //         const json = await response.json()
    //         //         debugger
    //         //         console.log(nestedComments)
    //         //         setNestedComments(nestedComments.concat([json]))
    //         //         console.log(nestedComments)
    //         //         // setNestedComments(nestedComments.push(json))
    //         //         // nestedComments = [...nestedComments, {...json}]
    //         //         setIsLoadingNested(false)
    //         //         debugger
    //         //     } catch (err) {
    //         //         console.warn(err)
    //         //     }
    //         // })

    //         comment.kids.map(id => {
    //             fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`)
    //                 .then(response => response.json())
    //                 .then(json => {
    //                     setNestedComments([...nestedComments, json])
    //                     setIsLoadingNested(false)
    //                 })
    //         })
    //         // debugger
    //         // console.log(nestedComments)
    //     } catch (err) {
    //         console.warn(err)
    //         console.log('Не удалось получить вложенные комментарии')
    //     }
    // }
    const handleClick = () => {
        setOpen(!open);
    }
    // if (nestedComments) {
        const nestedCommentsEl = (main.nestedComments[comment.id] ? main.nestedComments[comment.id] : [...Array(5)]).map(n => {
            // debugger
            return (
                <ListItem>
                    <NestedComment isLoadingNested={isLoadingNested} item={n} />
                </ListItem>
            )
        })
        // debugger

        // useMemo(() => 
        
        // , [main.nestedComments])
        // const nestedCommentsEl = (nestedComments ? nestedComments.map(n => {
        //     return (
        //         <ListItem>
        //             <NestedComment isLoadingNested={isLoadingNested} item={n} />
        //         </ListItem>
        //     )
        // }) : 'sdsfsdf')
    //     return nestedCommentsEl
    // }
    

    return (
        <Container maxWidth='md' sx={{ borderLeft: '2px black solid', marginLeft: 1, marginBottom: 4 }}>

            <React.Fragment key={index}>
                {comment.deleted
                    ? <div style={{ color: 'brown' }}>Comment deleted</div>
                    : <>
                        <ListItemText
                            primary={comment ? comment.by : 'commentAuthor'}
                            secondary={comment ? comment.time : 'time'}
                            primaryTypographyProps={{ style: { wordBreak: 'break-word', width: '', fontSize: '20px', fontWeight: '700' } }}
                        />
                        <div dangerouslySetInnerHTML={{ __html: comment.text }}></div>
                        {comment.kids
                            ? <>
                                {main.nestedComments[comment.id] && main.nestedComments[comment.id].length !== 0
                                    ? <>
                                        <Typography onClick={handleClick} className={styles.nestedBtn} sx={{ marginLeft: 3.3, marginTop: 1, color: 'blue', display: 'flex' }}>
                                            <Typography>Nested Comments</Typography>
                                            {open ? <ExpandLess /> : <ExpandMore />}
                                        </Typography>
                                    </>
                                    : <Button color='primary' endIcon={<GetAppIcon />} variant="text" size='medium' onClick={() => main.fetchNestedComments(comment)}>
                                        {isLoadingNested
                                            ? <CachedIcon />
                                            : 'Fetch nested comments'
                                        }
                                    </Button>
                                }
                            </>
                            : ''
                        }
                        {isLoadingNested
                            ? <>
                                {[...Array(2)].map(() => {
                                    return (
                                    <div style={{ display: "flex", flexDirection: "column" }}>
                                        <Skeleton variant='text' height={50} width={200} />
                                        <Skeleton variant='text' height={40} width={240} />
                                    </div>)
                                })}
                            </>
                            : <Collapse in={open} timeout="auto" unmountOnExit children={nestedCommentsEl}>
                                <List component="div" disablePadding>
                                    {nestedCommentsEl}
                                </List>
                            </Collapse>
                        }
                        <Divider />
                    </>
                }

            </React.Fragment>
        </Container>
    );
})

export default Comment;