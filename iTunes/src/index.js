import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './container/App';
import * as serviceWorker from './serviceWorker';
import {Provider} from 'react-redux'
import store from './reducers/index'
import {BrowserRouter} from "react-router-dom";
import "bootstrap/scss/bootstrap.scss"

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App/>
    </BrowserRouter>
  </Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
