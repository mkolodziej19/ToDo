const config = require('config');
const Joi = require ('joi');
Joi.objectId = require('joi-objectid')(Joi);
const mongoose = require('mongoose');
const users = require('./routes/users');
const auth = require('./routes/auth');
const tasks = require('./routes/tasks');
const express = require ('express');
const app = express();

if (!config.get('jwtPrivateKey')) {
    console.error('FATAL ERROR: jwtPrivateKey is not defined');
    process.exit(1);
}  

if (!config.get('mongoPassword')) {
    console.error('FATAL ERROR: mongoPassword is not defined');
    process.exit(1);
}  

mongoose.connect(`mongodb+srv://admin:${config.get('mongoPassword')}@cluster0-2mffx.mongodb.net/test?retryWrites=true&w=majority`)
    // Hasło jest w zmiennej środowiskowej.
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.error('Could not connect to MongoDB...'));

app.use(express.json());
app.use('/api/users', users);
app.use('/api/auth', auth);
app.use('/api/tasks', tasks);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
