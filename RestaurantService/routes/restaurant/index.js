const express = require('express'); 
const router  = express.Router(); 
const restaurant_records = require('../../Services/getAllRestaurants');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../../swagger.json')
const authentic = require('../../Services/authorization');

router.get('/restaurants', authentic.authorization, restaurant_records.getDetails);
router.get('/restaurant', authentic.authorization, restaurant_records.getDetail);

router.use('/api-docs', swaggerUi.serve);
router.get('/api-docs', swaggerUi.setup(swaggerDocument));

module.exports = router;