const express = require('express');
const path = require('path');

const app = express();

// Server routes... Need to be defined before webpack configuration

if (process.env.NODE_ENV !== 'production') {
  const webpackMiddleware = require('webpack-dev-middleware');
  const webpack = require('webpack');
  const webpackConfig = require('./webpack.config.js');
  app.use(webpackMiddleware(webpack(webpackConfig)));
} else {
  // Make everything in dist accessible to app in production
  app.use(express.static('dist'));
  // If anyone makes a request....send them to index.html.  Makes sure react-router browserHistory works properly
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist/index.html'));
  })
}

app.listen(process.env.PORT || 3050, () => console.log('Listening'));