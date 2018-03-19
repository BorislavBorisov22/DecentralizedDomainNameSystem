import React, {PropTypes} from 'react';
import EditDomainForm from './EditDomainForm';
import getDdnsContract from './../../blockchain/ddns-contract';
import toastr from 'toastr';

export class EditDomainPage extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            domain: {
                name: this.props.location.query.domainName,
                ip: this.props.location.query.ip
            },
            errors: {}
        };

        this.updateDomain = this.updateDomain.bind(this);
        this.editDomain = this.editDomain.bind(this);
    }

    componentWillMount() {
        this.checkQueryParams(); 
    }

    updateDomain(event) {
        const value = event.target.value;
        const fieldName = event.target.name;

        const updatedDomain = this.state.domain;
        updatedDomain[fieldName] = value;

        this.setState({
            domain: updatedDomain
        });
    }

    isFormValid() {
        const errors = {};
        let isValid = true;

        if (this.state.domain.ip.trim() === '') {
            errors.domainIp = 'Domain ip cannot be empty';
        }

        this.setState({
            errors
        });

        return isValid;
    }

    editDomain() {
        if (!this.isFormValid()) {
            return;
        }

        const contract = getDdnsContract();
        contract.editDomain(this.state.domain)
            .then(() => {
                toastr.success('Domain info edited successfully!');
            });
    }

    checkQueryParams() {
        const stayOnRoute = this.props.location.query.domainName && this.props.location.query.ip;
        if (!stayOnRoute) {
            this.context.router.push('/');
        }
    }

    render() {
        return (
            <div>
                <h1>Editing domain: {this.props.location.query.domainName}</h1>
                <EditDomainForm
                 errors={this.state.errors} 
                 domain={this.state.domain}
                 onChange={this.updateDomain}
                 onSave={this.editDomain}
                 />
            </div>);
    }
}

EditDomainPage.propTypes = {
    location: PropTypes.object.isRequired
};

EditDomainPage.contextTypes = {
    router: PropTypes.object.isRequired
};

export default EditDomainPage;