import React, {PropTypes} from 'react';
import TextInput from './../common/TextInput';

const EditDomainForm = ({domain, errors, onSave, onChange, saving}) => {

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

            <button onClick={onSave} disabled={saving} className="btn btn-primary">{saving ? 'Saving...' : 'Save'}</button>
        </div>
    );
};

EditDomainForm.propTypes = {
    domain: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    onSave: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    saving: PropTypes.bool.isRequired
};

export default EditDomainForm;