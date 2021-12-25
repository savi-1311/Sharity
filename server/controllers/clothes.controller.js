const Cloth = require('../models/cloth.model');
const User = require('../models/user.model');
const sendMail = require("../services/email.service");
const addCloth = async (req, res) => {

    const {userId, name ,latitude, longitude ,description, link} = req.body;
    const newCloth = new Cloth({
        createdBy: userId,
        name: name,
        location: {
            latitude: latitude,
            longitude: longitude
        },
        description: description,
        link: link
    });

    const cloth = await newCloth.save();
    return res.status(200).json({
        success: true,
        cloth: cloth
    });
};

const fetchClothes = async(req,res) => {
    const clothes = await Cloth.find({});
    return res.status(200).json({
        success: true,
        clothes: clothes
    });
}

const deleteCloth = async(req, res) =>{
    const {clothId} = req.body;
    let cloth = await Cloth.findOneAndDelete({_id : clothId});
    return res.status(200).json({
        success: true,
        msg: "Removed Clothes"
    });
}

const requestCloth = async(req, res) =>{
    const {clothId, userId, reqMessage, email} = req.body;
    let user = await User.findOne({_id : userId});
    let cloth = await Cloth.findOne({_id : clothId});
    const message = `Heyaa!🎄 Someone needs your ${cloth.name}. Reach them out at ${email}. Here's a message from them: ${reqMessage}`;
    await sendMail(user.email, `Request for ${cloth.name}`, message);
    return res.status(200).json({
        success: true,
        msg: "Your request has been sent via email"
    });
}

module.exports = {
    addCloth,
    fetchClothes,
    deleteCloth,
    requestCloth
};