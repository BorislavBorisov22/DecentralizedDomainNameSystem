import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { Router, browserHistory } from 'react-router';
import routes from './routes';
import { Provider } from 'react-redux';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/toastr/build/toastr.min.css';
import configureStore from './store/configureStore';
import { Web3Provider } from "react-web3";


const store = configureStore();

render(
    <Provider store={store}>
        <Web3Provider>
            <Router history={browserHistory} routes={routes} />
        </Web3Provider>
    </Provider>,
    document.getElementById('app')
);