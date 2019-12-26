const router = require('express').Router(); 
const services = require('../../services/orderServices');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../../swagger.json')

router.get('/orders/all', services.getAllOrders);
router.post('/orders', services.placeOrders);
router.get('/orders/:orderId', services.getOrderDetails);
router.delete('/orders/:orderId', services.deleteOrder);
router.put('/orders/:orderId', services.updateOrderDetails);
router.get('/orders/:restId/:city', services.getOrdersDetailsByRestaurantCity)

router.get('/orders', services.getOrdersByCity)
router.use('/api-docs', swaggerUi.serve);
router.get('/api-docs', swaggerUi.setup(swaggerDocument));

module.exports = router;