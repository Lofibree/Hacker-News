
import { AppBar, Box, Button, IconButton, Typography } from '@mui/material';
import { Container } from '@mui/system';
import React from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import GitHubIcon from '@mui/icons-material/GitHub';
import TelegramIcon from '@mui/icons-material/Telegram';

const Footer = () => {
    return (
        <div>
            <AppBar position='static' sx={{ backgroundColor: 'dark', bottom: 0, }}>
                <Container maxWidth='md' sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 90 }}>
                    <Typography variant='h6' sx={{ margin: 1 }}>Lofibree</Typography>
                    <Box>
                        <IconButton href='https://github.com/Lofibree/Hacker-News' >
                            <GitHubIcon style={{color: 'black'}}/>
                        </IconButton>
                        <IconButton href='https://t.me/lofibree'>
                            <TelegramIcon style={{color: '#00bfff'}}/>
                        </IconButton>
                    </Box>
               </Container>
            </AppBar>
        </div>
    );
};

export default Footer;