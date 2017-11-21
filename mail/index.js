
'use strict';
const nodemailer = require('nodemailer');

// Generate test SMTP service account from ethereal.email
const account = require('../config');
let receiversConfig = require('./receiversConfigConfig');

receiversConfig = receiversConfig.join(',');

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
    from: '"ss配置变更提醒" <18829237006@163.com>', // sender address
    to: receiversConfig, // list of receivers
    subject: 'ss配置变更提醒', // Subject line
    text: 'Hello world?', // plain text body
    html: '<b>Hello world1?</b>' // html body
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
}
