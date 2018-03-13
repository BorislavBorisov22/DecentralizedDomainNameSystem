import React from 'react';
import { Route, IndexRoute, Redirect } from 'react-router';
import App from './components/App';
import HomePage from './components/home/HomePage';
import SearchDomainPage from './components/domains/searchDomainPage';

export default (
    <Route path="/" component={App}>
        <IndexRoute component={HomePage} />
        <Route path="/search-domains" component={SearchDomainPage}/>
        <Redirect from="*" to="/"/>
    </Route>
);