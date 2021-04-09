const express = require('express');

const matchController = require('./controllers/matchController');

const routes = express.Router();

routes.get('/', (req, res) => {
    res.send({suave: false})
  });

routes.get('/matches/:page', matchController.team);
routes.get('/stats', matchController.stats);


module.exports = routes;