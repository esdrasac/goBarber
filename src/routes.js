const { Router } = require('express');

const UserController = require('./app/controllers/UserController');
const SessionController = require('./app/controllers/SessionController');
const authMiddleware = require('./app/middlewares/auth');

const routes = new Router();

routes.post('/users', UserController.store);// Create user
routes.post('/sessions', SessionController.store); // Gerenate token


routes.use(authMiddleware); // Global route
routes.put('/users', UserController.update);

module.exports = routes;
