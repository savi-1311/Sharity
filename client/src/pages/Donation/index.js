import React from 'react';
import Header from '../../components/header/index.js';
import './styles.css';
import axios from "axios";
import {toast} from "react-toastify";

/*****************************************************************************/

export default function Donation()
{
    const centers = [
        {
            name: "SADS India",
            image: "https://sadsindia.org/wp-content/themes/fusion/images/hero/happy_children_SADS_1920x800.jpg",
            website: "https://sadsindia.org/"

        },
        {
            name: "Free The Girls",
            image: "https://images.squarespace-cdn.com/content/v1/58226849579fb3c9af3a5dc2/1638791384108-TYIBAQANOW6MUNWQRSUT/image-asset.jpeg?format=500w",
            website: "https://freethegirls.org/",
        },
        {
            name: "American Red Cross",
            image: "https://cf.ltkcdn.net/charity/images/orig/261294-1600x1030-american-red-cross.jpg",
            website: "https://www.redcross.org/",
        },
        {
            name: "Goodwill",
            image: "https://www.goodwill.org/wp-content/webp-express/webp-images/uploads/2019/06/Donations-Optz.jpg.webp",
            website: "https://www.goodwill.org/donate/donate-stuff/",
        },
        {
            name: "One Warm Coat",
            website: "https://www.onewarmcoat.org/",
            image: "https://247ry83y5zt12d9jx511ktx3-wpengine.netdna-ssl.com/wp-content/uploads/sites/106/2021/12/image-850x479.jpg",
        },
        {
            name: "Planet Aid",
            website: "https://www.planetaid.org/",
            image: "https://nmcdn.io/e186d21f8c7946a19faed23c3da2f0da/8ed2672177464f2e9b193130d1000c50/files/blogs_2015/DSCF1487-process-s400x302.JPG",
        },
        {
            name: "Uday Foundation",
            website: "https://www.udayfoundation.org/delhi-donate-old-clothes/",
            image: "https://pbs.twimg.com/media/CoXpTGCWYAAAFX-.jpg",
        },
        {
            name: "AASHI Foundation",
            website: "https://ashiindia.org/",
            image: "https://www.streenews.com/wp-content/uploads/2018/06/Rupam-3-415x280.jpg",
        },
        {
            name: "Goonj",
            website: "https://goonj.org/",
            image: "https://res.cloudinary.com/dwzmsvp7f/image/fetch/q_75,f_auto,w_1316/https%3A%2F%2Fmedia.insider.in%2Fimage%2Fupload%2Fc_crop%2Cg_custom%2Fv1638965871%2Fdkqfcubieyjmotnc3gum.jpg",
        },
        {
            name: "Clothes Box Foundation",
            website: "https://www.clothesboxfoundation.org/",
            image: "https://imgstaticcontent.lbb.in/lbbnew/wp-content/uploads/2017/10/25131609/251017_ClothesBoxFoundation_04.jpg",
        },]

    return(
        <div>
            <Header/>
            <div className="centers">
                {
                    centers.map((centre)=>{
                        return(<div className="centre">
                            <img className="centre-image" src={centre.image}/>
                            <a className="centre-name" href={centre.website}> {centre.name} 💙 </a>
                        </div>)

                    })
                }
            </div>
        </div>
    );
}