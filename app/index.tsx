import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { AppContainer } from 'react-hot-loader';

import { SideMenu } from 'lib/reducers';
import rootReducer from 'app/root-reducer';
import { ErrorBoundary } from 'lib/components/index';
import AppComponent from './app';
import { storeInitialize, translation } from 'lib/config';

const store = storeInitialize(rootReducer);
translation.registerLocale(store);

const rootEl = document.getElementById('root');

const render = Component =>
  ReactDOM.render(
    <ErrorBoundary>
      <AppContainer>
        <Provider store={store}>
          <div>
            <Component />
          </div>
        </Provider>
      </AppContainer>
    </ErrorBoundary>,
    rootEl
  );

render(AppComponent);

// This is quite unstable
// if (module.hot) {
//   module.hot.accept('./app', () => {
//     const NextApp = require<{ default: typeof AppComponent }>('./app').default;
//     render(NextApp);
//   });
// }
