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
        <ThemeProvider theme={useTheme}>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={openBackDrop}
                onClick={handleClose}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Stack sx={{ width: '100%' }} spacing={2}>
                    <Alert onClose={handleClose} severity="warning" sx={{ width: '100%' }}>Selecione um arquivo válido</Alert>
                </Stack>
            </Snackbar>
          
            <Snackbar open={openSucess} autoHideDuration={6000} onClose={handleClose}>
                <Stack sx={{ width: '100%' }} spacing={2}>
                    <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>Arquivo enviado com sucesso</Alert>
                </Stack>
            </Snackbar>
            <Snackbar open={openError} autoHideDuration={6000} onClose={handleClose}>
                <Stack sx={{ width: '100%' }} spacing={2}>
                    <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>Arquivo enviado com sucesso</Alert>
                </Stack>
            </Snackbar>
            <Box sx={{ minHeight: '100vh' }}> 
                <Grid
                    container
                    direction="row"
                    justifyContent="space-around"
                    sx={{
                        minHeight: '100vh',
                        
                    }}
                >
                    <Grid container 
                        direction="row" 
                        justifyContent="space-around"
                        margin={1}     
                    >

                        <Grid item lg={12} xs={12}
                            justifyContent="space-around"
                        >
                            <label htmlFor="upload-file">
                                <input
                                    style={{ display: "none" }}
                                    id="upload-file"
                                    name="upload-file"
                                    type="file"
                                    accept='.txt'
                                    onChange={handleSetFile}
                                />
                                    <Button
                                    variant="contained"
                                    component="span"
                                    onClick={handleClick}
                                    >   
                                        <Typography
                                        sx={{  fontSize: '0.825rem',
                                                padding: '10px',
                                            
                                            }} 
                                        >
                                            { selectedFile ? 'Arquivo selecionado:' : 'Upload do arquivo:' }
                                        </Typography>
                                        {selectedFile ? <Typography sx={{  fontSize: '0.825rem',
                                                                            padding: '10px'
                                                                        }}  
                                                        > {selectedFile.name} </Typography> : ''}
                                    </Button>
                            </label>
                        </Grid>
                        
                        <Grid item lg={12} xs={12}>
                            <Typography>
                                File content:
                            </Typography>
                            <Grid item lg={12} xs={12}
                                sx={{
                                    border: '1px solid #ccc',
                                    padding: '10px',
                                    fontFamily: 'Courier New, monospace',
                                    whiteSpace: 'pre-wrap',
                                    }}  
                            >
                                { FileData ? FileData : '' }
                            </Grid>                            
                        </Grid>
                        <Grid item lg={12} xs={12} display={'flex'} flexDirection={'column'} paddingTop={'10px'} alignContent={'center'}>
                            <Button
                                    variant="contained"
                                    component="span"
                                    onClick={handleSendFile}
                                    >
                                        <Typography
                                            sx={{  fontSize: '0.825rem',
                                                    padding: '10px',
                                                
                                                }} 
                                        >
                                            Enviar arquivo
                                        </Typography>
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Box>            
        </ThemeProvider>
    )
}

export default FileSender