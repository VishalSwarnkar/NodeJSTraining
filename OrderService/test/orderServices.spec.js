let mongoose = require("mongoose");
// let Rest = require('../Models/restuarantSchema');

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let app = require('../app');
let should = require('chai').should();
const token = ''
chai.use(chaiHttp);

describe('Orders', () => {
    var order_id = "";
    it('POST: Should create order for food', (done) => {
        let orders = {
            "restaurantId": "5df39cedc1170b601f4054d5",
            "quantity": "5",
            "amount": "1000",
            "city": "Faridkot"
        }
        chai.request(app)
            .post('/orders')
            .set('access-token', token)
            .send(orders)
            .end((err, res) => {
                if (err) done.fail(err);
                res.should.have.status(201);
                res.body.should.be.a('object');
                res.body.should.have.property("message").eql('Order Stored');
                res.body.should.have.property('createdOrder').property('_id');
                res.body.should.have.property('createdOrder').property('quantity').eql(5);
                res.body.should.have.property('createdOrder').property('amount').eql(1000);
                res.body.should.have.property('createdOrder').property('city').eql('Faridkot');
                order_id = res.body.createdOrder._id;
                done();
            })

    })

    it('Get: Should validate the schema', (done) => {
        chai.request(app)
            .get(`/orders/${order_id}`, { timeout: 3000 })
            .set('access-token', token)
            .end((err, res) => {
                if (err) done.fail(err);
                res.body.should.be.a('object');
                res.body.should.have.property('orderId');
                res.body.should.have.property('orders').property('quantity').eql(5);
                res.body.should.have.property('orders').property('amount').eql(1000);
                res.body.should.have.property('orders').property('city').eql('Faridkot');
                // res.body.should.have.property('budget').eql(250);
                done();
            })
    })

    it('Get: Should return give record details', (done) => {
        chai.request(app)
            .get(`/orders/${order_id}`, { timeout: 3000 })
            .set('access-token', token)
            .end((err, res) => {
                if (err) done.fail(err);
                res.status.should.equal(200);
                res.body.should.be.a('object');
                res.body.should.have.property('orderId').eql(order_id);
                done();
            });
    })

    it('Get: Should delete the order ID', (done) => {
        chai.request(app)
            .delete(`/orders/${order_id}`, { timeout: 3000 })
            .set('access-token', token)
            .end((err, res) => {
                if (err) done.fail(err);
                res.status.should.equal(200);
                res.body.should.be.a('object');
                res.body.should.have.property('message').eql('Order deleted');
                res.body.should.have.property('orderId').eql(order_id);
                done();
            });
    })

})