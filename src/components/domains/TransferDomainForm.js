import React, {PropTypes} from 'react';
import TextInput from './../common/TextInput';

const TransferDomainForm = ({domainName, transferToAddress, onSubmit, errors, onChange}) => {
    return (
        <div>
            <TextInput
                name="domainName"
                onChange={onChange}
                label="Domain"
                error={errors.domainName}
                value={domainName}
            />
            <TextInput
                name="tranferToAddress"
                onChange={onChange}
                label="Transfer to address"
                error={errors.transferToAddress}
            />

            <input type="button" onClick={onSubmit} value="Transfer" className="btn btn-primary"/>
        </div>
    );
};

TransferDomainForm.propTypes = {
    domainName: PropTypes.string.isRequired,
    transferToAddress: PropTypes.string.isRequired,
    onSubmit: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired
};

export default TransferDomainForm;