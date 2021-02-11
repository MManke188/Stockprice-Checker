'use strict';

module.exports = function (app) {
  const fetch = require('node-fetch')

  app.route('/api/stock-prices')
    .get(function (req, res){
      let stocks = req.query.stock
      let like = req.query.like

      if(typeof stocks == 'string') {
        stocks = stocks.toUpperCase()
        if(like !== undefined) {
          stocks += '&like=true'
        }
        fetch('https://stock-price-checker.freecodecamp.rocks/api/stock-prices?stock='+stocks)
        .then(response => response.json())
        .then(data => {
          let responseObject = data
          res.send(responseObject)
        })
      } else {
        for(let i = 0; i<stocks.length; i++) {
          stocks[i] = stocks[i].toUpperCase()
        }
        let sol = stocks[0] + '&stock=' + stocks[1]
        if(like !== undefined) {
          sol += '&like=true'
        }
        fetch('https://stock-price-checker.freecodecamp.rocks/api/stock-prices?stock='+sol)
        .then(response => response.json())
        .then(data => {
          let responseObject = data
          res.send(responseObject)
        })

      }

      
      
    });
  
};
