import { createStore, applyMiddleware, compose } from 'redux';
import { createHashHistory } from 'history';
// import { routerMiddleware, routerActions } from 'connected-react-router';
import createSagaMiddleware from 'redux-saga';


import createRootReducer from '../reducers';
import rootSaga from '../sagas';

const history = createHashHistory();

const rootReducer = createRootReducer(history);

const configureStore = (initialState) => {
  // Redux Configuration
  const middleware = [];
  const enhancers = [];

  const sagaMiddleware = createSagaMiddleware();
  middleware.push(sagaMiddleware);

  // If Redux DevTools Extension is installed use it, otherwise use Redux compose
  /* eslint-disable no-underscore-dangle */
  const composeEnhancers = (window).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? (window).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        // Options: http://extension.remotedev.io/docs/API/Arguments.html
      })
    : compose;
  /* eslint-enable no-underscore-dangle */

  // Apply Middleware & Compose Enhancers
  enhancers.push(applyMiddleware(...middleware));
  const enhancer = composeEnhancers(...enhancers);

  // Create Store
  const store = createStore(rootReducer, initialState, enhancer);

  //run sagas
  // sagaMiddleware.run(rootSaga);
  let sagaTask = sagaMiddleware.run(function* () {
    yield rootSaga();
  });

  if ((module).hot) {
    (module).hot.accept(
      '../reducers', // eslint-disable-next-line global-require
      () => store.replaceReducer(require('../reducers').default)
    );

    // enabling HMR in redux saga
    module.hot.accept('../sagas', () => {
      const getNewSagas = require('../sagas').default;
      sagaTask.cancel();
      sagaTask.toPromise().then(() => {
        // debugger;
        sagaTask = sagaMiddleware.run(function* replacedSaga (action) {
          yield getNewSagas()
        })
      });
    });

  }

  return store;
};

export default configureStore;