'use strict';

module.exports = function (app) {
  const fetch = require('node-fetch')

  app.route('/api/stock-prices')
    .get(function (req, res) {
      let stocks = req.query.stock

      if (typeof stocks == 'string') {
        stocks = stocks.toUpperCase()
        fetch('https://stock-price-checker.freecodecamp.rocks/api/stock-prices?stock=' + stocks)
          .then(response => response.json())
          .then(data => {
            let responseObject = {
              "stock": data.stockData.stock || 'No such stock exists',
              "price": data.stockData.price + ' $'
            }
            res.send(responseObject)
          })
      } else {
        for (let i = 0; i < stocks.length; i++) {
          stocks[i] = stocks[i].toUpperCase()
        }
        let sol = stocks[0] + '&stock=' + stocks[1]
        fetch('https://stock-price-checker.freecodecamp.rocks/api/stock-prices?stock=' + sol)
          .then(response => response.json())
          .then(data => {
            let responseObject = {
              'stock1': data.stockData[0].stock || 'No such stock exists',
              'price1': data.stockData[0].price,
              'stock2': data.stockData[1].stock || 'No such stock exists',
              'price2': data.stockData[1].price
            }
            res.send(responseObject)
          })

      }
    });

};
