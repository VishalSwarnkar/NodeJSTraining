const express = require('express');
const router  = express.Router();
const publish_controller = require('../controller/send');
const consumer_controller = require('../controller/receive');

router.post('/publisher', (req, res, next)=>{

    let message = req.body;
    
    res.status(200).json({
        message: `successfully received message :: ${message}`
    });

    publish_controller.sendorders("order-placed", message);
});

router.get('/consumer', (res, req)=>{
    consumer_controller.receiveMessage("order-placed")
})

module.exports = router;