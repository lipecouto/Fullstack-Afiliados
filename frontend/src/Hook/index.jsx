import { useState } from 'react';
import axios from 'axios';

function useRequest() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);


    const makeRequest = async (params) => {
        setLoading(true);
        
        let config = {
                method: params.method,
                maxBodyLength: Infinity,
                url: params.url,
                headers: { 
                    'Acess-Control-Allow-Origin' : '*',            
                },
                data : params.data
            };
                    
        {
            const response = await axios.request(config);   
            
            setLoading(false);

            if('error' in response){
                setError(response.message);
                return response.error;
            }else{
                setData(response.data);
                return response.data;
            }
                
        } 
    };
  
    return { data, error, loading, makeRequest };
}

export default useRequest;