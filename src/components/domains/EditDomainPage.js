import React, {PropTypes} from 'react';

export class EditDomainPage extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        return (<h1>Editing {this.props.location.query.domainName}</h1>);
    }
}

EditDomainPage.propTypes = {
    location: PropTypes.object.isRequired
};

export default EditDomainPage;