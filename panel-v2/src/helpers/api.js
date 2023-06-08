import axios from 'axios'
import { get_token } from './storage';

const prefix_url = `${process.env.REACT_APP_API_BACKEND_ENDPOINT_URL}/`

// console.log(prefix_url)


const  token  = get_token();
const fetch_api = async (url, data, method = 'POST',header= {}, loading = true) => {
    
    var headers = {
        'content-type': 'application/json',
        "Access-Control-Allow-Origin": "*",
        "app-version": `${process.env.REACT_APP_VERSION}`,
        Authorization: token ? `Bearer ${token}` : "",
        ...header
    }

    const options = {
        method: method,
        headers: headers,
        data: (data instanceof FormData) ? data : JSON.stringify(data),
        url: `${prefix_url}${url}`,
    };
    
    
    return await axios(options)
    .then(res => res.data)
    .catch(error => {
        console.log(error);
        // window.dispatchEvent(
            //     new CustomEvent(custom_error_event, {
                //         detail: {
                    //             endpoint: 'server',
                    //             provider: 'axios',
                    //             details: error
                    //         }
                    //     }))
                    // throw Error(error);
                });
}

export default fetch_api;