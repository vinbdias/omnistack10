const { Router } = require('express');

const DevController = require('./controllers/DevController');
const SearchController = require('./controllers/SearchController');

const { handleError } = require('./helpers/error');

const routes = Router();

routes.post('/devs', DevController.store);
routes.get('/devs', DevController.index);

routes.get('/search', SearchController.index);

routes.get('/error', (req, res) => handleError({
    status: 'error',
    statusCode: 500,
    message: 'Internal server error'
  }, res));

module.exports = routes;