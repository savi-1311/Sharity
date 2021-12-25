import './styles.css';
import {
    Link
} from "react-router-dom";
import { useLocation } from 'react-router-dom';
import loggedInUser from "../../services/auth.service"

export default function Header()
{
    const user = loggedInUser();
    const location = useLocation();
    function logout(){
        localStorage.removeItem('user');
        window.location.reload(false);
    }
    return(
        <>
            {
                (location.pathname=="/" || location.pathname=="/donation-centers")
                    ?
                    <div className="header-container">
                        <div className="logo">Sharity</div>
                        <div className="links">
                            <Link to="/" className="link">Home</Link>
                            <Link to="/globe" className="link">Explore</Link>
                            <Link to="/donation-centers" className="link">Donation Centers</Link>
                        </div>
                        {
                            (user)
                                ?
                                <div className="UserName" onClick={logout}>Logout</div>
                                :
                                <div className="Login"></div>
                        }
                    </div>
                    :
                    <div className="header-container-dark">
                        <div className="logo-dark">Sharity</div>
                        <div className="links-dark">
                            <Link to="/" className="link-dark">Home</Link>
                            <Link to="/globe" className="link-dark">Explore</Link>
                            <Link to="/donation-centers" className="link-dark">Donation Centers</Link>
                        </div>
                        {
                            (user)
                                ?
                                <div className="UserName-dark" onClick={logout}>Logout</div>
                                :
                                <div className="Login-dark"></div>
                        }
                    </div>
            }
        </>
);
}