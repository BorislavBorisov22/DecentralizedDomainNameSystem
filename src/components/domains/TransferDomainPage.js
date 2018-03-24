import React, {PropTypes, Component} from 'react';

class TransferDomainPage extends Component {
    constructor(props, context) {
        super(props, context);
    }
    
    componentWillMount() {
        this.checkQueryParams(); 
    }

    checkQueryParams() {
        const stayOnRoute = this.props.location.query.domainName && this.props.location.query.ip;
        if (!stayOnRoute) {
            this.context.router.push('/');
        }
    }

    render() {
        return (
            <h1>Transfer Domain Page</h1>
        );
    }
}

TransferDomainPage.propTypes = {
    location: PropTypes.object.isRequired
};

TransferDomainPage.contextTypes = {
    router: PropTypes.object.isRequired
};

export default TransferDomainPage;