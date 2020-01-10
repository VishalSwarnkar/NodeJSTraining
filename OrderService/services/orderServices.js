const Order = require('../models/order');
const logger = require('../logger');
const fetch = require('node-fetch');
const mongoose = require('mongoose');

var orders = {

    getAllOrders: function (req, res, next) {
        Order.find()
            .select('restaurantId quantity _id amount city orderDate')
            .exec()
            .then(result => {
                res.status(200).json({
                    counts: result.length,
                    order: result.map(order => {
                        return {
                            _id: order.id,
                            restaurantId: order.restaurantId,
                            quantity: order.quantity,
                            amount: order.amount,
                            city: order.city,
                            date: order.orderDate,
                            request: {
                                type: 'GET',
                                ur: 'http://localhost:3001/orders/' + order._id
                            }
                        }
                    })

                });
            })
            .catch(err => {
                logger.error("Error in fetching all the records");
                res.status(500).json({
                    error: err
                });
            });
    },

    placeOrders: function (req, res, next) {
        const order = new Order({
            _id: mongoose.Types.ObjectId(),
            restaurantId: req.body.restaurantId,
            quantity: req.body.quantity,
            amount: req.body.amount,
            city: req.body.city
        })
        order.save().then(result => {
            fetch('http://localhost:7777/publisher', {
                method: 'post',
                body: JSON.stringify(result, null, 2),
                headers: { 'Content-Type': 'application/json' }
            }).then(json => console.log(json.status));

            res.status(201).json({
                message: "Order Stored",
                createdOrder: {
                    _id: result._id,
                    restaurantId: result.restaurantId,
                    quantity: result.quantity,
                    amount: result.amount,
                    city: result.city
                },
                request: {
                    type: 'GET',
                    ur: 'http://localhost:3001/orders/' + result._id
                }
            });

            logger.info("Order Placed successfully", {
                _id: result._id,
                restaurantId: result.restaurantId,
                quantity: result.quantity,
                amount: result.amount,
                city: result.city
            });
        }).catch(err => {
            logger.error("Error in placing the order", req.body);
            res.status(500).json({
                error: err.message
            })
        })
    },

    getOrderDetails: function (req, res, next) {
        Order.findById(req.params.orderId)
            .then((orders) => {
                res.statusCode = 200
                res.setHeader('Content-Type', 'application/json');
                res.status(200).json({
                    message: 'Order details',
                    orderId: req.params.orderId,
                    orders: orders
                });
            })
            .catch((err) => {
                logger.error(`Error in finding the order id ${req.params.orderId}`);
                res.status(500).json({
                    error: err
                })
            });
    },

    deleteOrder: function (req, res, next) {
        Order.findByIdAndDelete(req.params.orderId)
            .then((resp) => {
                res.statusCode = 200
                res.setHeader('Content-Type', 'application/json');
                res.status(200).json({
                    message: 'Order deleted',
                    orderId: req.params.orderId
                });
            }, (err) => next(err))
            .catch((error) => {
                logger.error(`Error in deleting the order id ${req.params.orderId}`);
                res.status(500).json({
                    error: err
                })
            });
    },

    updateOrderDetails: function (req, res, next) {
        Order.findByIdAndUpdate(req.params.orderId, {
            $set: req.body
        }, { new: true })
            .then((orders) => {
                res.statusCode = 200
                res.setHeader('Content-Type', 'application/json');
                res.status(200).json({
                    message: 'Order Updated',
                    orderId: req.params.orderId,
                    OrderDetails: orders
                });
            }, (err) => next(err))
            .catch((error) => {
                logger.error(`Error in updating the order id ${req.params.orderId}`);
                res.status(500).json({
                    error: err
                })
            });
    },

    getOrdersDetailsByRestaurantCity: function (req, res, next) {
        Order.find({
            $and: [
                { restaurantId: req.params.restId }, { city: req.params.city }
            ]
        })
            .then(result => {
                res.status(200).json({
                    counts: result.length,
                    city: req.params.city,
                    amount: result.reduce((acum, data) => { return acum + data.amount }, 0)
                });
            })
            .catch(err => {
                logger.error(`Error in total amount of the order for given resturant of the city 
            ${req.params.restId} ${req.params.city}`)
                res.status(500).json({
                    error: err
                });
            });
    },

    getOrdersByCity: function (req, res, next) {
        Order.find({ "city": req.query.city })
            .then(result => {
                res.status(200).json({
                    counts: result.length,
                    order: result.map(order => {
                        return {
                            _id: order.id,
                            productId: order.productId,
                            quantity: order.quantity,
                            amount: order.amount,
                            city: order.city,
                            date: order.orderDate,
                            request: {
                                type: 'GET',
                                ur: 'http://localhost:3001/orders/' + order._id
                            }
                        }
                    })

                });
            })
            .catch(err => {
                logger.error(`Error in total amount of the order for given resturant of the city 
        ${req.query.city}`)
                res.status(500).json({
                    error: err
                });
            });
    }
}

module.exports = orders