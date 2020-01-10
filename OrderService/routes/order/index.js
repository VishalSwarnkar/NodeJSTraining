const router = require('express').Router(); 
const services = require('../../services/orderServices');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../../swagger.json');
const authentic = require('../../services/authorization');

router.get('/orders/all', authentic.authorization, services.getAllOrders);
router.post('/orders', authentic.authorization, services.placeOrders);
router.get('/orders/:orderId', authentic.authorization, services.getOrderDetails);
router.delete('/orders/:orderId', authentic.authorization, services.deleteOrder);
router.put('/orders/:orderId', authentic.authorization, services.updateOrderDetails);
router.get('/orders/:restId/:city', services.getOrdersDetailsByRestaurantCity)

router.get('/orders', services.getOrdersByCity)
router.use('/api-docs', swaggerUi.serve);
router.get('/api-docs', swaggerUi.setup(swaggerDocument));

module.exports = router;