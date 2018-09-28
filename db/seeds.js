const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const { dbURI } = require('../config/environment');

mongoose.connect(dbURI, {useNewUrlParser: true });

// Seeds here

Photo.collection.drop();
console.log('All photos deleted!');
mongoose.connection.close();
