const nodemailer = require('nodemailer');
const user = process.env.EMAIL;
const pass = process.env.PASS;
const sendMail = async (email, subject, message) => {
    
  try {

    // Transporter object specifying the type of email used
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth:{
        user: user,
        pass: pass
      } 
    });
    
    // The Sender and recepient emails
    const options = {
      from: user,
      to: email,
      subject: subject,
      html: message
    };

    transporter.verify(function(error, success) {
      if (error) {
        console.log(error);
      } else {
        console.log("Server is ready to take our messages");
      }
    });
    
    
    // Sends the mail
    transporter.sendMail(options, (error, data) => {
      if (error) {
        console.log("Unable to send email please check the options provided");
      } else
        console.log("Email sent successfully");
    });
  } catch (error) {
      console.log('Unable to send email please check the keys provided');
  }

};
module.exports = sendMail;