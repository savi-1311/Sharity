const User = require('../models/user.model');
const generatePassword = require('generate-password');
const sendMail = require('../services/email.service');
const savePassword = require('../services/password.service');
const utils = require('../services/auth.service');

const { configClient } = require('../configs/client.config');
const CLIENT_URL = configClient();

// creates new respective user and profile collection on DB
const registerUser = async (fullname, password, email, status) => {

  const { salt, hash } = utils.createPassword(password);

  const newUser = new User({
    fullname: fullname,
    email: email,
    hash: hash,
    salt: salt,
    status: status
  });

  const user = await newUser.save();

  return user;
};

// invokes registerUser for creating new record and sends confirmation mail 
const registerProfile = async (profile) => {

  const { fullname, password, email } = profile;

  const user = await registerUser(fullname, password, email, false);
  const message = `Thank you for registering at Sharity. Have a great day ahead. 
  Please confirm your email using the given link to continue to the site. ${CLIENT_URL}/confirm?userId=${user._id}`;
  await sendMail(email, 'Thank you for registering at Sharity', message);

  return user;
}


// Called when registering with Gambit
const register = async (req, res) => {

  try {
    let currUser = await User.findOne({ email: req.body.email });

    if (currUser)
      return res.status(409).json({ success: false, msg: 'An account with this email already exists! Try a different better one...' });

    const user = await registerProfile(req.body);

    return res.json({
      success: true,
      msg: 'Registered Successfully! Please confirm your email to start exploring.'
    });

  } catch (err) {
    return res.json({ success: false, msg: "hey" });
  }

};

// Called when signing in
const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user)
      return res
        .status(401)
        .json({
          success: false,
          msg: 'Could not find user!'
        });
    
    if(!user.status){
      return res.status(422).json({
        success: false,
        msg: 'Please verify your email and try again.'
      })
    }

    const isPasswordValid = utils.checkPassword(req.body.password, user.hash, user.salt);
    if (isPasswordValid) {
      const tokenObject = utils.issueJWT(user);
      return res
        .status(200)
        .json({
          success: true,
          msg: "Logged in Successfully",
          token: tokenObject.token,
          expiresIn: tokenObject.expires,
          fullname: user.fullname,
          _id: user._id,
        });
    } else
      return res
        .status(401)
        .json({
          success: false,
          msg: 'You entered the wrong password!'
        });

  } catch (err) {
    console.log(err);
    return res.json({ success: false, msg: err });
  }

};


// Verifies user via registered email
const confirm = async (req, res) => {
  const id = req.body.userId;
  
  if(!id){
    return res.json({msg: "You are not Authorized on this route!"});
  }
  let user = await User.findOne({_id: id});

  if(!user){
    return res.json({msg: "You are not Authorized on this route!"});
  }

  if(user.status){
    return res.json({msg: "Your Email is already verified"});
  }

  user = await User.findOneAndUpdate({ _id: id }, {
    status: true
  });

  console.log("Successfully updated");
  return res.json({msg: "Verified Successfully"});
};

module.exports = {
  login,
  register,
  confirm
};
