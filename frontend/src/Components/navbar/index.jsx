import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import { useNavigate } from 'react-router-dom';
import {
    Avatar,
    Box,
    EditIcon,
    ListItemButton,
    ListItemIcon,
    ListItem,
    ListItemText,
    Toolbar,     
    List,
    Typography,
    Container
} from '@mui/material';

import MenuIcon from '@mui/icons-material/Menu';
 
import { createTheme, ThemeProvider } from '@mui/material/styles';


const pages = ['Enviar arquivo', 'Ver relatório'];


const navBarTheme = createTheme({
    palette: {
        blue:{
            main: '#1976d2',
            contrastText: '#fff',
        } 
        
    }
})

function NavBar() {
    const navigate =  useNavigate();
    
    const handleOpt = (el) =>{
        
        if(el.target.innerText === 'Upload do arquivo'){
            navigate('/')
        }

        if(el.target.innerText === 'Relatorio'){
            navigate('/report')
        }
    }

    return (
        <ThemeProvider theme={navBarTheme}>
            <AppBar position="static" color='blue'>
                <Container maxWidth="sm">
                    <List sx={{ display : 'flex', flexDirection: 'row', justifyContent: 'flex-start'}}>
                        {['Upload do arquivo', 'Relatorio'].map((text, index) => (
                            <ListItem key={text} disablePadding>
                                <ListItemButton  id={text} onClick={handleOpt} >                                 
                                    <ListItemText primary={text} id={text}/>
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>    
                </Container>
            </AppBar>
        </ThemeProvider>
    );
}

export default NavBar;