import React from 'react';
import {
    Link
} from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';
const parameters = new URLSearchParams(window.location.search);
const id = parameters.get('userId');

/*****************************************************************************/

export default function Confirm()
{
    const [isLoaded, setIsLoaded] = React.useState(false);

    React.useEffect(() => {
        (async () => {
            var confirmObject = {
                "userId": id
            }
            const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/confirm`, confirmObject);
            console.log(response);
            if(response.status==200)
            {
                toast.success(response.data.msg);
            }
            else
            {
                toast.danger(response.data.msg);
            }
        })()
    }, [isLoaded])
    return(

    <div className="root">
    <div className="confirm">
    Your Email has been verifyed. Login with your credentials and discover festivals around the globe. 🌏
                <br></br>
    <Link to="/" className="explore-button">Home</Link>
</div>
</div>
);
}