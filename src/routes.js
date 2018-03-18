import React from 'react';
import { Route, IndexRoute, Redirect } from 'react-router';
import App from './components/App';
import HomePage from './components/home/HomePage';
import SearchDomainPage from './components/domains/SearchDomainPage';
import ShoppingCartPage from './components/domains/ShoppingCartPage';
import EditDomainPage from './components/domains/EditDomainPage';

export default (
    <Route path="/" component={App}>
        <IndexRoute component={HomePage} />
        <Route path="/search-domains" component={SearchDomainPage}/>
        <Route path="/cart" component={ShoppingCartPage}/>
        <Route path="/edit" component={EditDomainPage}/>
        <Redirect from="*" to="/"/>
    </Route>
);