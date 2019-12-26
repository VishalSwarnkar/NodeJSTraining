const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Restaurant',
        required: true
    },
    quantity: {
        type: Number,
        default: 1
    },
    amount: {
        type: Number,
    },
    city: {
        type: String
    },
    orderData: { type: Date, default: (new Date().toLocaleDateString('en-US'))}
})

module.exports = mongoose.model('Order', orderSchema, 'Order');