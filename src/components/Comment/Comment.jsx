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

    const [open, setOpen] = useState(true)

    const handleClick = () => {
        setOpen(!open);
    }

    const nestedCommentsEl = (main.nestedComments[comment.id] ? main.nestedComments[comment.id] : [...Array(1)]).map(n => {
        return (
            <>
                {n
                    ? <ListItem>
                        <NestedComment item={n} />
                    </ListItem>
                    : ''
                }
            </>
        )
    })


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
                                        <Typography
                                            onClick={handleClick}
                                            className={styles.nestedBtn}
                                            sx={{ marginLeft: 3.3, marginTop: 1, color: 'blue', display: 'flex' }}
                                        >
                                            <Typography>Nested Comments</Typography>
                                            {open ? <ExpandLess /> : <ExpandMore />}
                                        </Typography>
                                    </>
                                    : <Button color='primary'
                                        endIcon={<GetAppIcon />}
                                        variant="text" size='medium'
                                        onClick={() => main.fetchNestedComments(comment)}
                                    >
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
                        <Divider sx={{
                            border: 'solid grey',
                            borderWidth: 0,
                            borderTopWidth: 2
                        }} />
                    </>
                }

            </React.Fragment>
        </Container>
    );
})

export default Comment;