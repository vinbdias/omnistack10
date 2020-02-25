const express = require('express');
const mongoose = require('mongoose');

const { handleError } = require('./helpers/error');
const routes = require('./routes');

const app = express();

mongoose.connect('mongodb+srv://omnistack:omnistack@omnistack-uspyk.mongodb.net/devradar?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
});

app.use(express.json());
app.use(routes);

app.use((err, req, res, next) => {
    handleError(err, res);
});

app.listen(3333);