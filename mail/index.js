
'use strict';
const nodemailer = require('nodemailer');

// Generate test SMTP service account from ethereal.email
const account = require('../config');
let receiversConfig = require('./receiversConfig');

receiversConfig = receiversConfig.join(',');

// create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
    host: 'smtp.qq.com',
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
        user: account.user, // generated ethereal user
        pass: account.pass  // generated ethereal password
    }
});

// setup email data with unicode symbols
let mailOptions = {
    from: `${account.user} <${account.user}>`, // sender address
    to: account.user, // list of receivers
    cc: receiversConfig,
    subject: 'ss配置变更', // Subject line
    text: 'ss配置变更', // plain text body
    html: 'ss配置变更' // html body
};

module.exports = function (sendData) {

    Object.assign(mailOptions, sendData);
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
};
