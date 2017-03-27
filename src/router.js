import React from 'react';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';

import Home from './components/Home';
import ArtistMain from './components/artists/ArtistMain';

const componentRoutes = {
  component: Home,
  path: '/',
  indexRoute: { component: ArtistMain },
  childRoutes: [
  // Cant make 'helper' functions bc webpack doesn't know how to handle it when scanning for System.import and dynamic routes
    {
      path: 'artists/new',
      getComponent(location, cb) {
        // Will modify bundle to create a sub bundle (webpack)
        System.import('./components/artists/ArtistCreate')
            // First arg is an error obj
          .then(module => cb(null, module.default));
      }
    },
        {
      path: 'artists/:id',
      getComponent(location, cb) {
        System.import('./components/artists/ArtistDetail')
          .then(module => cb(null, module.default));
      }
    },
        {
      path: 'artists/:id/edit',
      getComponent(location, cb) {
        System.import('./components/artists/ArtistEdit')
          .then(module => cb(null, module.default));
      }
    }
  ]
};

const Routes = () => {
  return (
    <Router history={hashHistory} routes={componentRoutes} />
  );
};

export default Routes;
