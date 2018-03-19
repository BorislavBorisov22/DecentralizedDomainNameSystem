import React, {PropTypes} from 'react';
import TextInput from './../common/TextInput';

const EditDomainForm = ({domain, errors, onSave, onChange}) => {

    return (
        <TextInput 
            name="ip"
            label="New IP"
            error={errors.domainName}
            onChange={onChange}
        />
    );
};

EditDomainForm.propTypes = {
    domain: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    onSave: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired
};

export default EditDomainForm;