const nodemailer = require('nodemailer')
const logger = require('../logger');

let send_email = {
    host: 'smtp.gmail.com',
    type: "SMTP",
    service: 'gmail',
    port: '2525',
    secure: false,
    auth: {
        user: process.env.SENDER_EMAIL,
        pass: process.env.EMAIL_PASSWORD
    }
};

let mail_service = (function () {
    let sendEmail = async function (message) {
        let transport = nodemailer.createTransport(send_email);
        let options = {
            from: process.env.SENDER_EMAIL,
            to: process.env.RECEIVER_EMAIL,
            subject: 'Order Details',
            text: 'Something profound goes here.',
            html: `<p>Order ID: ${message.orderId}<p>
            <p>Order Date: ${message.orderDate}</p>`
        };
        transport.sendMail(options, function (err, info) {
            if(err)
                logger.error(`Error in sending the email to  ${process.env.RECEIVER_EMAIL}`, err);
            else
                logger.info(`Successfully send order details to email  ${process.env.RECEIVER_EMAIL}`, info);
         });
    };

    return {
        sendEmail: sendEmail
    }
}());

module.exports = mail_service;