import React from 'react';
import Header from '../../components/header/index.js';
import axios from 'axios';
import { CSSTransition } from 'react-transition-group';
import './styles.css';
import {Link} from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import cap from "../../images/cap.png"
import loggedInUser from "../../services/auth.service"
import 'react-toastify/dist/ReactToastify.css';
let images = require.context('../../images', true);

/*****************************************************************************/

export default function Home()
{
    const [currIndex, setCurrIndex] = React.useState(0);
    const [showLogin, setShowLogin] = React.useState("none");
    const [showRegister, setShowRegister] = React.useState("none");
    const [registerName, setRegisterName] = React.useState("Name");
    const [registerEmail, setRegisterEmail] = React.useState("Name");
    const [registerPassword, setRegisterPassword] = React.useState("Name");
    const [loginEmail, setLoginEmail] = React.useState("Name");
    const [loginPassword, setLoginPassword] = React.useState("Name");
    const user = loggedInUser();

    function increase(){
        let temp = currIndex;
        temp++;
        if(temp==3)
            temp = 0;
        setCurrIndex(temp);
    }

    function decrease(){
        let temp = currIndex;
        temp--;
        if(temp ==-1)
            temp = 2;
        setCurrIndex(temp);
    }

    function openLoginModal(){
        setShowRegister("none");
        setShowLogin("flex");
    }

    function openRegisterModal(){
        setShowLogin("none");
        setShowRegister("flex");
    }

    async function onLoginSubmit(){
        var loginObject = {
            "email": loginEmail,
            "password": loginPassword
        }
        console.log(process.env.REACT_APP_SERVER_URL);
        const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/login`, loginObject);
        console.log(response);
        if(response.status==200)
        {
            toast.success(response.data.msg);
            setShowLogin("none");
            localStorage.setItem('user', JSON.stringify({"name": response.data.fullname, "id": response.data._id, "token": response.data.token}));
            window.location.reload(false);
        }
        else
        {
            toast.danger(response.data.msg);
        }
    }

    React.useEffect(() => {
        setTimeout(function(){
            increase();
        }, 10000);
    }, [currIndex])

    async function onRegisterSubmit(){
        var registerObject = {
            "fullname": registerName,
            "email": registerEmail,
            "password": registerPassword
        }
        const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/register`, registerObject);
        console.log(response);
        if(response.status==200)
        {
            toast.success(response.data.msg);
        }
        setShowRegister("none");
    }

    function closeModal(){
        setShowLogin("none");
        setShowRegister("none");
    }

    const content = [
        {
            title: "This Christmas...",
            description: "Be someone's secret Santa🎅 Gift a smile by donating your discarded and used winter wears for someone in need.",
            image: "diwali.jpg"
        },
        {
            title: "Connect",
            description: "Register and add used winter wears such as sweaters, jackets, blankets, boots, anything you feel might be useful for others.",
            image: "holi.jpg"
        },
        {
            title: "Find Donation Centers",
            description: "If you don't want to post individually, get connected with various Donation Centers around the globe and donate or receive items.",
            image: "christmas.jpg"
        }
    ]
    return(
        <div className="root">
            <Header/>

            <div className="home-container">
                <div className="explore-container">
                    <div className="explore-title" data-aos="fade-up">{content[currIndex].title}</div>
                    <div className="explore-description" data-aos="fade-up">{content[currIndex].description}</div>
                    {
                        (user)
                            ?
                            <Link to="/globe" className="explore-button" data-aos="fade-up">Explore</Link>
                            :
                            <div className="explore-button" data-aos="fade-up" onClick={() => openRegisterModal()}>Register</div>
                    }
                </div>
                <div className="explore-slider">
                    <div className="images">
                        {
                            content.map((festival, index)=>{
                                if(index==0)
                                    return(<img className="active-image" src={images(`./${content[(currIndex+index)%3].image}`)} data-aos="zoom-in" alt={content[(currIndex+index)%3].title}></img>)
                                else
                                    return(<img className="nonActive-image" src={images(`./${content[(currIndex+index)%3].image}`)} data-aos="zoom-in" alt={content[(currIndex+index)%3].title}></img>)

                            })
                        }
                    </div>
                </div>
            </div>

            <div className="modal" style={{display: showLogin}}>
                <div className="form">
                    <div className="form-title">Welcome Back! 🎄</div>
                    <div className="form-content">
                        <label>Email:</label>
                        <input type="email" placeholder="Type in your registered email" onChange={(e) => {e.preventDefault();setLoginEmail(e.target.value);}}  value={loginEmail}></input>
                        <label>Password:</label>
                        <input type="password" placeholder="Type in your password" onChange={(e) => {e.preventDefault();setLoginPassword(e.target.value);}}  value={loginPassword}></input>
                    </div>
                    <div className="buttons">
                        <div className="explore-button" onClick={onLoginSubmit}>Login</div>
                        <div className="explore-button close" onClick={closeModal}>Close</div>
                    </div>
                    <div className="extra-line" onClick={() => openRegisterModal()}>New to Sharity? Sign Up</div>
                </div>
            </div>

            <div className="modal" style={{display: showRegister}}>
                <div className="form">
                    <div className="form-title">Welcome to Sharity ☃️</div>
                    <div className="extra-line">The Best Christmas Smile you can give :)</div>
                    <div className="form-content">
                        <label>Name:</label>
                        <input type="text" placeholder="Type in your full name" onChange={(e) => {e.preventDefault();setRegisterName(e.target.value);}}  value={registerName}></input>
                        <label>Email:</label>
                        <input type="email" placeholder="Type in your registered email" onChange={(e) => {e.preventDefault();setRegisterEmail(e.target.value);}} value={registerEmail}></input>
                        <label>Password:</label>
                        <input type="password" placeholder="Type in your password" onChange={(e) => {e.preventDefault();setRegisterPassword(e.target.value);}} value={registerPassword}></input>
                    </div>
                    <div className="buttons">
                        <div className="explore-button" onClick={() => onRegisterSubmit()}>Register</div>
                        <div className="explore-button close" onClick={closeModal}>Close</div>
                    </div>
                    <div className="extra-line" onClick={() => openLoginModal()}>Already a member? Log in</div>
                </div>
            </div>

        </div>
    );
}