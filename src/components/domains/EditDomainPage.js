import React, {PropTypes} from 'react';

export class EditDomainPage extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            domain: {
                name: this.props.location.query.domainName,
                ip: this.props.location.query.ip
            }
        };
    }

    render() {
        return (<h1>Editing {this.props.location.query.domainName}</h1>);
    }
}

EditDomainPage.propTypes = {
    location: PropTypes.object.isRequired
};

export default EditDomainPage;