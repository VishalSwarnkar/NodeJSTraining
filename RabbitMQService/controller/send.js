const amqp = require('amqplib/callback_api');
const logger = require('../logger');
require('dotenv').config()

const email = require('./email');
var publisher = {

  sendorders: function (queue, orders) {
    amqp.connect(process.env.CLOUDAMQP_URL, function (error0, connection) {
      if (error0) {
        throw error0;
      }
      connection.createChannel(async function (error1, channel) {
        if (error1) {
          throw error1;
        }

        channel.assertQueue(queue, {
          durable: false
        });

          let order_details= {
            orderId: orders._id,
            restaurantId: orders.restaurantId,
            quantity: orders.quantity,
            amount: orders.amount,
            city: orders.city,
            orderDate: new Date().toLocaleDateString('en-US')
          }

          await email.sendEmail(order_details)
          logger.info(" [x] Sent %s", order_details);
      });
      setTimeout(function () {
        connection.close();
        process.exit(0)
      }, 15000);
    });
  }
};

module.exports = publisher;
