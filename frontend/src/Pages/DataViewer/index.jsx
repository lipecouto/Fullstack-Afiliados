import {
    Grid,
    Container,
    Fade,
    Box,
    Typography,
    CircularProgress,
    Button,
    Stepper,
    Step,
    Stack,
    Alert,
    Snackbar,
    Backdrop,
} from '@mui/material'
import { useState, useEffect } from "react";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import useRequest from '../../Hook';

//criando tema padronizado

const useTheme = createTheme({
    typography: {
     "fontFamily": `"Roboto", "Helvetica", "Arial", sans-serif`,
     "fontSize": '1rem',
    }
 });

const FileSender = () => {

    const [open, setOpen] = useState(false);
    const [openBackDrop, setOpenBackDrop] = useState(false);
    const [openSucess, setOpenSucess] = useState(false);
    const [openError, setOpenError] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const [FileData, setFileData] = useState(null);
    const { makeRequest, loading, error, data } = useRequest();

    const handleSetFile = (event) => {
        const file = event.target.files[0];
        setSelectedFile(file)

        const reader = new FileReader();
        reader.onload = handleFileRead;
        reader.readAsText(file);
    }

    const handleFileRead = (event) => {
        const content = event.target.result;
        setFileData(content);
        // Faça o que for necessário com o conteúdo do arquivo
      };
      
    const handleClick = () => {
        setOpen(true);
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };
    
    const handleSendFile = async () =>{
        setOpenBackDrop(true);
        const formData = new FormData();
        
        formData.append('file', selectedFile);

        let data = {
                method: 'post',
                maxBodyLength: Infinity,
                url: 'http://localhost:5097/getFile',
                data : formData
            };

        
        const response = await makeRequest(data);
        if(loading){
            console.log('loading');  
            return;
        }
        if(error){
            console.log('error');
            return;
        }

        setOpenSucess(true);
        
        setOpenBackDrop(false);
        
        setSelectedFile(null);
        setFileData(null);
    }
    return(
        <>
        </>
    )
}

export default FileSender