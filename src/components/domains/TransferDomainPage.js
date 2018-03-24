import React, {PropTypes, Component} from 'react';
import TransferDomainForm from './TransferDomainForm';
import { connect } from 'react-redux';
import getDdnsContract from './../../blockchain/ddns-contract';
import toastr from 'toastr';

class TransferDomainPage extends Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            errors: {},
            domainName: this.props.location.query.domainName,
            tranferToAddress: ''
        };

        this.onChange = this.onChange.bind(this);
        this.transferDomain = this.transferDomain.bind(this);
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

    onChange(event) {
        const fieldName = event.target.name;
        const value = event.target.value;
        
        this.setState({
            [fieldName]: value
        });
    }

    transferDomain() {
        const contract = getDdnsContract();
        contract.transferDomain(this.state.domainName, this.state.tranferToAddress)
            .then((res) => {
                toastr.success('Domain transferred successfully!');
            });
    }

    render() {
        return (
            <div>
                <h1>Transfer Domain Page</h1>
                <TransferDomainForm 
                    domainName={this.state.domainName} 
                    transferToAddress={this.state.tranferToAddress} 
                    onChange={this.onChange}
                    onSubmit={this.transferDomain}
                    errors={this.state.errors}
                    activeAddress={this.props.activeAddress}
                />
            </div>
        );
    }
}

TransferDomainPage.propTypes = {
    location: PropTypes.object.isRequired,
    activeAddress: PropTypes.string.isRequired
};

TransferDomainPage.contextTypes = {
    router: PropTypes.object.isRequired
};

function mapStateToProps(state, ownProps) {
    return {
        activeAddress: state.activeAddress,
        location: ownProps.location
    };
}

export default connect(mapStateToProps)(TransferDomainPage);