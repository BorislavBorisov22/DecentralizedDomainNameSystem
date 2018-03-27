import React from 'react';
import { Link } from 'react-router';

class HomePage extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        return (
        <div className="jumbotron">
            <h1>Decentralized Domain Name System</h1>
            <p>Find a domain for your website at the best possible price.</p>
            <p>
                <Link className="btn btn-lg btn-primary" to="/search-domains" role="button">Search for domain</Link>
            </p>
        </div>
        );
    }
}

export default HomePage;