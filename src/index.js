import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {Provider} from 'react-redux';
import reducer from './reducers';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {createStore, applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk';
import {createLogger} from 'redux-logger';
import {MuiPickersUtilsProvider} from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import * as moment from "moment";
import Theme from './theme';
import {SnackbarProvider} from 'notistack';

const loggerMiddleware = createLogger();

moment.locale('en-my-settings', {
  week: {
    dow: 1, // Monday is the first day of the week.
  }
});

const store = createStore(reducer,
  applyMiddleware(
    thunkMiddleware, // lets us dispatch() functions
    loggerMiddleware // neat middleware that logs actions
  )
);

ReactDOM.render(
  <Provider store={store}>
    <SnackbarProvider>
      <Theme>
        <MuiPickersUtilsProvider utils={MomentUtils} locale={"en-my-settings"}>
          <App/>
        </MuiPickersUtilsProvider>
      </Theme>
    </SnackbarProvider>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
