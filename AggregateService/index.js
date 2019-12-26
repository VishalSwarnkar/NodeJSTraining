const fetch = require('node-fetch');

var gateway = {
    
    getOrderAmountByCity: function(order_city, given_date){
        var url = `http://localhost:3001/orders/?city=${order_city}`
          fetch(url, { method: 'GET'})
            .then((res) => {
               return res.json()
          })
          .then((json) => {
            var resSet=json.order.filter(function(options){
              let order_date = new Date(options.date).toLocaleDateString('en-US');
              return order_date == given_date;
          }).reduce(function(accum, order){
              return accum+parseInt(order.amount);
          },0);
            console.log(resSet);
          });
    }
  
}

module.exports = gateway;