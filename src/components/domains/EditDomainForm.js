import React, {PropTypes} from 'react';
import TextInput from './../common/TextInput';

const EditDomainForm = ({domain, errors, onSave, onChange}) => {

    return (
        <div>
            <TextInput 
                name="ip"
                label="New IP"
                error={errors.domainIp}
                onChange={onChange}
                value={domain.ip}
            />

            <br/>

            <button onClick={onSave} className="btn btn-primary">Save</button>
        </div>
    );
};

EditDomainForm.propTypes = {
    domain: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    onSave: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired
};

export default EditDomainForm;