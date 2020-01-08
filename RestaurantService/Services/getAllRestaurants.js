const rest_model = require('../Models/restuarantSchema');

var restaurants = {
    
    getDetail: function(req, res, next) {
        rest_model.find({
            $or: [
                {"restaurant.name": req.query.name},
                {"restaurant.location.city": req.query.city},
                {"restaurant.user_rating.aggregate_rating": req.query.rating},
                {"restaurant.Budget": req.query.budget},
                {"restaurant.cuisines": req.query.cuisines},
                {"restaurant.Menu.name": req.query.menu}
            ]
        },null)
        .select('_id restaurant.id restaurant.name restaurant.location.city restaurant.user_rating.aggregate_rating restaurant.Budget restaurant.cuisines restaurant.Menu')
        .then((restaurant)=>{
            res.statusCode = 200
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json({
                counts: restaurant.length,
                restaurant: restaurant
            })
          }, (err)=>next(err))
          .catch(err=>{
            res.status(500).json({
                error: err
            });
        });
    },

    getDetails: function(req, res, next) {
        return rest_model.find({})
        .select('_id restaurant.id restaurant.name restaurant.location.city restaurant.user_rating.aggregate_rating restaurant.Budget restaurant.cuisines restaurant.Menu')
        .then((restaurant)=>{
            res.statusCode = 200
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json({
                counts: restaurant.length,
                restaurant: restaurant
            })
          }, (err)=>next(err))
          .catch(err=>{
            res.status(500).json({
                error: err
            });
        });
    }
    
}

module.exports = restaurants;