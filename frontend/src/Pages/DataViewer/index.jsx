import {
    Grid,
    Autocomplete,
    TextField,
    Container,
    Fade,
    Box,
    Typography,
    CircularProgress,
    Button,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper, 
} from '@mui/material';
 
 
import { useState, useEffect, useContext } from "react";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import useRequest from '../../Hook';
import { DataContext } from '../../Components/dataContext';


const DataViewer = () => {

    const { apiData } = useContext(DataContext);
    const [sellerList, setSellerList] = useState([])
    const [seller, setSeller] = useState(null)
    const { makeRequest, loading, error, data } = useRequest();
    const [responseData, setResponseData ] = useState();

    useEffect(() =>{
        const sellersList =  apiData.map((el) => {
                return el.seller;
            
        });

        setSellerList(sellersList);
    }, [apiData]);
    

    const handleChangeSeller = (event, value) =>{        
        setSeller(value)
    }
 
    
    const handleGetData = async () =>{
        
        const _filtro = {
            "filters": {
              "product": "",
              "seller": seller ? seller : ""
            }
          }
                  const  data = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'http://localhost:5097/getData',
            data : _filtro
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

        setResponseData(response);
    }

    return(
        <Grid container spacing={0}>
            <Grid sx={{padding: '15px'}}>
                <Grid item xs={12} lg={12} display={'flex'} flexDirection={'row'} alignContent={'space-around'}>
                    <Typography></Typography>
                    <Autocomplete
                        disablePortal
                        id="selectSeller"
                        onChange={handleChangeSeller}
                        options={sellerList.filter((value, index, self) => {
                            return self.indexOf(value) === index;
                          })}
                        sx={{ width: 300 }}
                        renderInput={(params) => <TextField {...params} label="Selecione um vendedor" />}
                    />
                    <Button
                        variant="contained"
                        component="span"
                        onClick={handleGetData}
                        
                    >   
                        <Typography
                            sx={{  fontSize: '0.825rem',
                                    padding: '10px',
                                            
                                }} 
                        > Buscar Dados </Typography>                                                                                   
                    </Button>
                </Grid>
            </Grid>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                    <TableRow>
                        <TableCell>Product Name</TableCell>
                        <TableCell align="right">Total Sell</TableCell>                        
                    </TableRow>
                    </TableHead>
                    <TableBody>
                       { responseData ? 
                            responseData.map((row) =>{
                            console.log(row);
                            return (<TableRow
                                        key={row.seller}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >{console.log(row)}
                                        <TableCell component="th" scope="row">
                                            {row.seller}
                                        </TableCell>
                                        <TableCell align="right">
                                            {row.total}
                                        </TableCell>
                                    </TableRow>
                            )
                            })
                            : ''
                        }
                    </TableBody>
                </Table>
            </TableContainer>
        </Grid>
    )
}

export default DataViewer