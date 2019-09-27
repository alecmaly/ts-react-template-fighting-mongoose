const nodemailer = require('nodemailer');


module.exports = async (app) => {
  /****************** route mailer ************************/
  function sendEmail(emailAddress, emailPassword, to, subject, body) {
    // email config
    var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: emailAddress, //process.env.EMAIL,
        pass: emailPassword //process.env.EMAIL_PASSWORD,
      }
    });

    console.log("emailAddress: ", emailAddress);
    console.log("emailPassword: ", emailPassword);
    console.log("to: ", to);
    console.log("subject: ", subject);
    console.log("body:", body);



    const mailOptions = {
      from: emailAddress, //process.env.EMAIL, // sender address
      to: to, //process.env.EMAIL, // list of receivers
      subject: subject, // Subject line
      html: body // html body
    };

    // send email
    transporter.sendMail(mailOptions, function (err, info) {
      if(err)
        console.log(err)
      else
        console.log(info);
    });
  }



  // send email post
  app.post('/sendEmail', async (req, res) => {
    try {
      sendEmail(req.body.emailAddress, req.body.emailPassword, req.body.to, req.body.subject, req.body.body);
      res.send('success')
    } catch {
      res.send('failed')
    }
  })
  //****************** end route mailer ******************
}
