const express = require('express');
const models = require('./models');
const expressGraphQL = require('express-graphql');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const schema = require('./schema/schema');

const app = express();
// Replace with your mongoLab URI

const MONGO_URI =
  'mongodb+srv://magnumm:magnumm@lyricaldb-afvow.mongodb.net/test?retryWrites=true&w=majority';
if (!MONGO_URI) {
  throw new Error('You must provide a Mongo Atlas URI');
}

const connectDatabase = MONGO_URI => {
  return mongoose
    .connect(MONGO_URI, { useNewUrlParser: true })
    .then(() => {
      console.log('Connected to MongoDB at', MONGO_URI);
      return mongoose.connection;
    })
    .catch(err => console.debug(`Database connection error: ${err.message}`));
};

// connectDatabase(databaseUri: string): Promise<any> {
//   return Mongoose.connect(databaseUri, { useMongoClient: true })
//       .then(() => {
//           console.log('Connected to MongoDB at ', databaseUri);
//           return Mongoose.connection;
//       })
//       .catch(err => debug(`Database connection error: ${err.message}`));
// }
connectDatabase(MONGO_URI);
app.use(bodyParser.json());
app.use(
  '/graphql',
  expressGraphQL({
    schema,
    graphiql: true
  })
);

const webpackMiddleware = require('webpack-dev-middleware');
const webpack = require('webpack');
const webpackConfig = require('../webpack.config.js');
app.use(webpackMiddleware(webpack(webpackConfig)));

module.exports = app;
