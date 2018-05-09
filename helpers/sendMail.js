const nodemailer = require('nodemailer');
const users = require('../models/users.js');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'matcha.datingservice@gmail.com',
    pass: 'matchaproj1'
  }
});

exports.activation = function(userId){

    var results = users.getUserById(userId);

    var mail = `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    <html xmlns="http://www.w3.org/1999/xhtml">
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
        <title>Activate account</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    </head>
    <body style="margin: 0; padding: 0; font-family: Arial, Helvetica">
        <table border="0" cellpadding="0" cellspacing="0" width="100%">
            <tr>
                <td>
                    <table align="center" border="1" cellpadding="0" cellspacing="0" width="600" style="border-collapse: collapse;">
                        <tr style="border: 1px solid #222222; background-color: #222222;">
                            <td style="padding: 40px 200px 30px 200px;">
                                <img src="https://i.imgur.com/3lhgs2W.png" alt="Creating Email Magic" width="192" height="80" style="display: block; " />
                            </td>
                        </tr>
                        <tr style="background-color:#111111; color: #ffffff;">
                            <td style="padding: 40px 30px 40px 30px;">
                                <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                    <tr>
                                        <td align="center">
                                            <h2>Hi `+ results.username +`,</h2>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td align="center">
                                            <p>To activate your account for Matcha, please click the following button:</p>
                                            <br>
                                            <br>
                                            <a href="http://localhost:3000/account/accountConfirmation/`+ results.id +`" style="background-color:#D71717; color: #ffffff; text-decoration:none; padding: 20px 30px; font-weight:bold">Activate account</a>
                                            <br>
                                            <br>
                                            <br>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td align="center">
                                            <p>If that doesn't work, you can copy and paste this link into your browser</p>
                                            <a href="http://localhost:3000/account/accountConfirmation/`+ results.id +`" style="color: #00B75A">http://localhost:3000/account/accountConfirmation/`+ results.id +`</a>
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                        <tr style="background-color: #222222; border: 1px solid #222222;">
                            <td align="center">
                                <p style="font-size: 12px; color: #ffffff;">This mail was sent to you because you created an account with Matcha, if you did not do this then you can ignore this mail</p>
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
        </table>
    </body>
    </html>`;

    var mailOptions = {
        from: 'donotreply@matcha.com',
        to: results.email,
        subject: 'Welcome to Matcha',
        html: mail
    };

    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}

exports.passwordReset = function(userId, token){

    var results = users.getUserById(userId);

    var mail = `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    <html xmlns="http://www.w3.org/1999/xhtml">
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
        <title>Activate account</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    </head>
    <body style="margin: 0; padding: 0; font-family: Arial, Helvetica">
        <table border="0" cellpadding="0" cellspacing="0" width="100%">
            <tr>
                <td>
                    <table align="center" border="1" cellpadding="0" cellspacing="0" width="600" style="border-collapse: collapse;">
                        <tr style="border: 1px solid #222222; background-color: #222222;">
                            <td style="padding: 40px 200px 30px 200px;">
                                <img src="https://i.imgur.com/3lhgs2W.png" alt="Creating Email Magic" width="192" height="80" style="display: block; " />
                            </td>
                        </tr>
                        <tr style="background-color:#111111; color: #ffffff;">
                            <td style="padding: 40px 30px 40px 30px;">
                                <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                    <tr>
                                        <td align="center">
                                            <h2>Hi `+ results.username +`,</h2>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td align="center">
                                            <p>To reset your password for Matcha, please click the following button:</p>
                                            <br>
                                            <br>
                                            <a href="http://localhost:3000/account/resetPassword/`+ token +`" style="background-color:#D71717; color: #ffffff; text-decoration:none; padding: 20px 30px; font-weight:bold">Reset password</a>
                                            <br>
                                            <br>
                                            <br>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td align="center">
                                            <p>If that doesn't work, you can copy and paste this link into your browser</p>
                                            <a href="http://localhost:3000/account/resetPassword/`+ token +`" style="color: #00B75A">http://localhost:3000/account/resetPassword/`+ token +`</a>
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                        <tr style="background-color: #222222; border: 1px solid #222222;">
                            <td align="center">
                                <p style="font-size: 12px; color: #ffffff;">This mail was sent to you because you attempted to reset your password, if you did not do this then you can ignore this mail</p>
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
        </table>
    </body>
    </html>`;

    var mailOptions = {
        from: 'donotreply@matcha.com',
        to: results.email,
        subject: 'Reset password',
        html: mail
    };

    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}