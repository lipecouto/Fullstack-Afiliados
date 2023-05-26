import {
    Grid,
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
    Backdrop, 
} from '@mui/material';
import SubdirectoryArrowRightIcon from '@mui/icons-material/SubdirectoryArrowRight'; 
import { useState, useEffect, useContext } from "react";
import useRequest from '../../Hook';
import { DataContext } from '../../Components/dataContext';


const DataViewer = () => {

    const { apiData } = useContext(DataContext);
    const [sellerList, setSellerList] = useState([])
    const [openBackDrop, setOpenBackDrop] = useState(false);
    const [seller, setSeller] = useState(null)
    const { makeRequest, loading, error, data } = useRequest();
    const [responseData, setResponseData ] = useState([]);

    useEffect(() =>{
        const sellersList =  apiData.map((el) => {
                return el.seller;
            
        });

        setSellerList(sellersList);
    }, [apiData]);
    

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpenBackDrop(false);       
        
    };
    
    const handleGetData = async () =>{
        setOpenBackDrop(true);
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
        console.log(response)
        setResponseData(response);
        setOpenBackDrop(false);
    }

    const groupedData = {};

    for (const item of responseData) {
      const { product, seller, total } = item;
  
      if (!groupedData[product]) {
        groupedData[product] = {
          product,
          sellers: [],
          total: 0,
        };
      }
  
      groupedData[product].sellers.push({ seller, total });
      groupedData[product].total += total;
    }

    const renderSubRows = (sellers) => {
        return sellers.map((seller) => (
          <TableRow key={seller.seller}>
            <TableCell sx={{paddingLeft: '20px', display: 'flex', alignItems: 'center'}}><SubdirectoryArrowRightIcon fontSize='0.82rem'/>{seller.seller}</TableCell>
            <TableCell align="right">{seller.total}</TableCell>
          </TableRow>
        ));
      };

    return(
        <Grid container spacing={0}>
             <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={openBackDrop}
                onClick={handleClose}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
            <Grid sx={{padding: '15px'}}>
                <Grid item xs={12} lg={12} display={'flex'} flexDirection={'row'} alignContent={'space-around'}>
                    <Typography></Typography>
                    
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
                        <TableCell align="right">Sell Value</TableCell>                        
                    </TableRow>
                    </TableHead>
                    <TableBody>
                       { responseData ? 
                            Object.values(groupedData).map((row) =>{
                            
                            return (<>
                                    <TableRow>
                                        <TableCell component="th" scope="row" colSpan={2}>
                                        {row.product}
                                        </TableCell>
                                    </TableRow>
                                         
                                            {renderSubRows(row.sellers)}
                                    
                                     <TableRow>
                                        <TableCell colSpan={2} align="right">
                                        Total of Product: {row.total}
                                        </TableCell>
                                    </TableRow>
                                    </>
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