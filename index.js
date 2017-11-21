
'use strict';
const nodemailer = require('nodemailer');

// Generate test SMTP service account from ethereal.email
let account = require('./config');
console.log(account);
// create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
    host: 'smtp.163.com',
    port: 25,
    secure: false, // true for 465, false for other ports
    auth: {
        user: account.user, // generated ethereal user
        pass: account.pass  // generated ethereal password
    }
});

// setup email data with unicode symbols
let mailOptions = {
    from: '"Fred Foo 👻" <18829237006@163.com>', // sender address
    to: '18829237006@163.com,948228952@qq.com', // list of receivers
    subject: 'yzj test Hello ✔', // Subject line
    text: 'Hello world?', // plain text body
    html: '<b>Hello world?</b>' // html body
};

// send mail with defined transport object
transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        return console.log(error);
    }
    console.log('Message sent: %s', info.messageId);
    // Preview only available when sending through an Ethereal account
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@blurdybloop.com>
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
});