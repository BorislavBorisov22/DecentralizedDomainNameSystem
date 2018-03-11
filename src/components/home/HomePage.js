import React from 'react';

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
                <a className="btn btn-lg btn-primary" href="#" role="button">Search for domain</a>
            </p>
        </div>
        );
    }
}

export default HomePage;