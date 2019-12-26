var amqp = require('amqplib/callback_api');
require('dotenv').config()

var consumer = {

    receiveMessage: function(queue) {
        amqp.connect(process.env.CLOUDAMQP_URL, function (error0, connection) {
            if (error0) {
                throw error0;
            }
            connection.createChannel(function (error1, channel) {
                if (error1) {
                    throw error1;
                }
        
                channel.assertQueue(queue, {
                    durable: false
                });
        
                console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", queue);
        
                channel.consume(queue, function (order_details) {
                    console.log(" [x] Received %s", order_details.content.toString());
                    // node mailer code to send email
                }, {
                    noAck: true
                });
            });
        });
    }
};

module.exports = consumer;
