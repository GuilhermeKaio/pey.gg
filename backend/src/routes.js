const express = require('express');

const matchController = require('./controllers/matchController');

const routes = express.Router();

routes.get('/matches/:page', matchController.team);
routes.get('/stats', matchController.teamStats);
routes.get('/percentage', matchController.teamPercentage);
routes.get('/percentageArray', matchController.teamPercentageArray);


module.exports = routes;