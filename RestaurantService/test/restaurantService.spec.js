let mongoose = require("mongoose");
// let Rest = require('../Models/restuarantSchema');

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../app');
let should = require('chai').should();

chai.use(chaiHttp);

describe('Restaurant', ()=>{

    it('Get: Should return the resturant from the city', (done)=>{

        chai.request(server)
        .get('/restaurant?city=Mumbai', {timeout: 3000})
        .end((err, res)=>{
            if (err) done.fail(err);
            res.status.should.equal(200);
            res.body.should.be.a('object');
            res.body.counts.should.equal(1);
            done();
        });
        
    });

    it('Get: Should return resturant from the budget', (done)=>{

        chai.request(server)
        .get('/restaurant?budget=400', {timeout: 3000})
        .end((err, res)=>{
            if (err) done.fail(err);
            res.status.should.equal(200);
            res.body.should.be.a('object');
            res.body.counts.should.equal(1);
            done();
        });
        
    });

    it('Get: Should return resturant from the rating', (done)=>{

        chai.request(server)
        .get('/restaurant?rating=4.2', {timeout: 3000})
        .end((err, res)=>{
            if (err) done.fail(err);
            res.status.should.equal(200);
            res.body.should.be.a('object');
            res.body.counts.should.equal(1);
            done();
        });
        
    });

    it('Get: Should return resturant from the cuisines', (done)=>{

        chai.request(server)
        .get('/restaurant?cuisines=Modern Indian', {timeout: 3000})
        .end((err, res)=>{
            if (err) done.fail(err);
            res.status.should.equal(200);
            res.body.should.be.a('object');
            res.body.counts.should.equal(1);
            done();
        });
        
    });
});