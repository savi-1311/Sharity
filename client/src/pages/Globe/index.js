import React from 'react';
import Header from '../../components/header/index.js';
import './styles.css';
import ReactGlobe from 'react-globe';
import FestivalInfo from "../../components/festivalInfo/index"
import { toast } from 'react-toastify';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';
import loggedInUser from "../../services/auth.service"

export default function Globe()
{
    const user = loggedInUser();
    const [currentFestival,setCurrentFestival] = React.useState(null);
    const [markers, setMarkers] = React.useState([]);
    const [isLoaded, setIsLoaded] = React.useState(false);
    const [showAddFestival, setShowAddFestival] = React.useState("none");
    const [formTitle, setFormTitle] = React.useState("Name");
    const [formLatitude, setFormLatitude] = React.useState("0");
    const [formLongitude, setFormLongitude] = React.useState("0");
    const [image, setImage] = React.useState("sample");
    const [imageUrl, setImageUrl] = React.useState("no url");
    const [formDescription, setFormDescription] = React.useState("Name");

    React.useEffect(() => {
        (async () => {
            const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/clothes`);
            if(response.status==200)
            {
                console.log(response.data);
                var temp = [];
                for(var i =0;i<response.data.clothes.length;i++)
                {
                    const obj = {
                        id: response.data.clothes[i]._id,
                        name: response.data.clothes[i].name,
                        description: response.data.clothes[i].description,
                        coordinates: [response.data.clothes[i].location.latitude,response.data.clothes[i].location.longitude],
                        createdBy: response.data.clothes[i].createdBy,
                        link: response.data.clothes[i].link,
                        value: 10,
                        color: "red"
                    }
                    temp.push(obj);
                }
                setMarkers(temp);
            }
            else
            {
                toast.error("Error occured. Please try again by refreshing the page.");
            }
        })()
    }, [isLoaded])


    const options={
        ambientLightColor:'white',
        globeGlowColor:'grey',
        globeGlowRadiusScale: 0.2,
        cameraRotateSpeed: 0.5,
        markerTooltipRenderer: marker => `${marker.name}`,
    }

    function markerClicked(marker){
        setCurrentFestival(marker);
    }

    async function onAddFormSubmit(){
        if(user)
        {
            const headers={
                "Authorization": user.token
            }
            console.log("here");
            const data = new FormData()
            data.append("file",image)
            data.append("upload_preset","sharity")
            data.append("cloud_name",process.env.REACT_APP_CLOUD_NAME)
            fetch(`https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUD_NAME}/image/upload`,{
                method:"post",
                body:data
            })
                .then(res=>res.json())
                .then(async data => {
                    console.log(data);
                    setImageUrl(data.url)
                    const addClothData = {
                        "userId": user.id,
                        "name": formTitle,
                        "latitude": formLatitude,
                        "longitude": formLongitude,
                        "description": formDescription,
                        "link": data.url
                    }

                    const response = await axios.post("http://localhost:8000/api/clothes", addClothData, {"headers": headers});
                    console.log(response);
                    if (response.status == 200) {
                        toast.success(response.data.msg);
                        window.location.reload(false);
                    } else {
                        toast.error(response.data.msg);
                    }

                })
                .catch(err=>{
                    toast.error(err);
                })

        }
        else
        {
            toast.error("Please Login to continue.");
        }
    }

    function success(position){
        setFormLatitude(position.coords.latitude);
        setFormLongitude(position.coords.longitude);
        console.log(position);
    }

    function getLocation(){
        if (navigator.geolocation) {
            console.log(navigator.geolocation.getCurrentPosition(success));
        } else {
            toast.error("Please allow Location access.")
        }
    }


    return(
        <>
            <Header/>
            <ReactGlobe
                height="100vh"
                options={options}
                markers={markers}
                globeCloudsTexture={null}
                onClickMarker={(marker, markerObject, event) => markerClicked(marker)}
            />

            <div className="modal" style={{display: showAddFestival}}>
                <div className="form">
                    <div className="form-title">Add Clothes you wish to donate 🧣</div>
                    <div className="form-content">
                        <label>Title:</label>
                        <input type="text" placeholder="Type in your registered email" onChange={(e) => {e.preventDefault();setFormTitle(e.target.value);}}  value={formTitle}></input>
                        <label>Latitude (Add - for South):</label>
                        <input type="text" placeholder="Type in your registered email" onChange={(e) => {e.preventDefault();setFormLatitude(e.target.value);}}  value={formLatitude}></input>
                        <label>Longitude (Add - for West):</label>
                        <input type="text" placeholder="Type in your registered email" onChange={(e) => {e.preventDefault();setFormLongitude(e.target.value);}}  value={formLongitude}></input>
                        <label>Image:</label>
                        <input type="file" onChange={(e)=>setImage(e.target.files[0])} />
                        <label>Description:</label>
                        <input type="text" placeholder="Type in your password" onChange={(e) => {e.preventDefault();setFormDescription(e.target.value);}}  value={formDescription}></input>
                    </div>
                    <div className="buttons">
                        <div className="explore-button extra" onClick={getLocation}>Get Coordinates</div>
                        <div className="explore-button" onClick={onAddFormSubmit}>Add</div>
                        <div className="explore-button close" onClick={() => {setShowAddFestival("none")}}>Close</div>
                    </div>
                </div>
            </div>

            {
                (currentFestival)
                    ?
                    <FestivalInfo festival={currentFestival}/>
                    :
                    <div className="explore-button corner" onClick={() => {setShowAddFestival("flex")}}>Add Clothes</div>
            }
        </>
    );
}