const port = process.env.PORT || 4000;
const env = process.env.NODE_ENV || 'development';
const dbURI = process.env.MONGODB_URI || `mongodb://localhost/instagram-clone-angularjs${env}`;
const secret = process.env.SECRET || 'shh';

module.exports = { port, env, dbURI, secret };
