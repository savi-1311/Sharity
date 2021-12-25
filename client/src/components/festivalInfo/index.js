import React from 'react';
import "./styles.css"
import cap from "../../images/cap.png"
import loggedInUser from "../../services/auth.service"
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';

export default function FestivalInfo(props)
{
    function goBack(){
        window.location.reload(false);
    }
    const [isVoted, setIsVoted] = React.useState(false);
    const [isLoaded, setIsLoaded] = React.useState(true);
    const [showAddFestival, setShowAddFestival] = React.useState("none");
    const [formEmail, setFormEmail] = React.useState("Name");
    const [formMessage, setFormMessage] = React.useState("0");

    async function addCoolness(){
        var addCoolnessObj={
            clothId: props.festival.id
        }
        const headers={
            "Authorization": user.token
        }
        const response = await axios.put(`${process.env.REACT_APP_SERVER_URL}/delete-clothes`, addCoolnessObj, {"headers" : headers});
        console.log(response);
        if(response.status==200)
        {
            toast.success(response.data.msg);
            window.location.reload(false);
        }
        else
        {
            toast.error(response.data.msg);
        }
    }

    async function requestCloth(){
        if(user)
        {
            const reqBody = {
                clothId: props.festival.id,
                userId: props.festival.createdBy,
                reqMessage: formMessage,
                email: formEmail
            }
            const headers={
                "Authorization": user.token
            }
            const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/request`, reqBody, {"headers" : headers});
            console.log(response);
            if(response.status==200)
            {
                toast.success(response.data.msg);
                setShowAddFestival("none");
            }
            else
            {
                toast.error(response.data.msg);
            }


        }
        else
        {
            toast.error("Please Login to Request");
        }
    }

    React.useEffect(() => {
        (async () => {
            console.log(user.id);
            console.log(props.festival.createdBy);
            if(user && user.id==props.festival.createdBy)
            {
                setIsVoted(true);
            }
        })()
    }, [isLoaded])

    const user = loggedInUser();

    return(
        <>
            {
                (props)
                    ?
                    <>
                        <button className="button" onClick={() => goBack()}> Back to Globe </button>
                        <div className="right-container" data-aos="fade-up">
                            <div className="title-container">
                                <img src={cap} className="cap"></img>
                                <div className="title-text">{props.festival.name}</div>
                                {
                                    (isVoted) ? <div className="explore-button close" onClick={addCoolness}> Delete </div> :
                                        <div className="explore-button" onClick={() => {setShowAddFestival("flex")}}> Request </div>
                                }
                            </div>️
                            <div className="image-container">
                                <img className="product-image" src={props.festival.link}></img>
                            </div>
                            <div className="description-container">{props.festival.description}</div>
                        </div>
                        <div className="modal" style={{display: showAddFestival}}>
                            <div className="form">
                                <div className="form-title">Add your request ✉️</div>
                                <div className="form-content">
                                    <label>Email:</label>
                                    <input type="email" placeholder="Type in your registered email" onChange={(e) => {e.preventDefault();setFormEmail(e.target.value);}}  value={formEmail}></input>
                                    <label>Message:</label>
                                    <input type="text" placeholder="Type in your registered email" onChange={(e) => {e.preventDefault();setFormMessage(e.target.value);}}  value={formMessage}></input>
                                </div>
                                <div className="buttons">
                                    <div className="explore-button" onClick={requestCloth}>Email</div>
                                    <div className="explore-button close" onClick={() => {setShowAddFestival("none")}}>Close</div>
                                </div>
                            </div>
                        </div>
                    </>
                    :
                    <></>
            }
        </>
    );
}