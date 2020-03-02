const { Router } = require('express');

const DevController = require('./controllers/DevController');
const SearchController = require('./controllers/SearchController');

const { ErrorHandler } = require('./helpers/error');

const routes = Router();

routes.post('/devs', DevController.store);
routes.get('/devs', DevController.index);

routes.get('/search', SearchController.index);

routes.get('/error', (req, res) => {
    throw new ErrorHandler(500, 'Internal server error');
});

module.exports = routes;