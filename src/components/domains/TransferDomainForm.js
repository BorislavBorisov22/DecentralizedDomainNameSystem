import React, {PropTypes} from 'react';
import TextInput from './../common/TextInput';

const TransferDomainForm = ({domainName, transferToAddress, onSubmit, errors, onChange, activeAddress}) => {
    return (
        <div>
            <TextInput
                readonly
                name="domainName"
                onChange={onChange}
                label="Domain"
                error={errors.domainName}
                value={domainName}
            />

            <br />

            <TextInput
                readonly
                name="fromAddress"
                onChange={onChange}
                label="Transferring from address"
                error={errors.fromAddress}
                value={activeAddress}
            />  

            <br />

            <TextInput
                name="tranferToAddress"
                onChange={onChange}
                label="Transferring to address"
                error={errors.transferToAddress}
            />

            <br />

            <input type="button" onClick={onSubmit} value="Transfer" className="btn btn-primary"/>
        </div>
    );
};

TransferDomainForm.propTypes = {
    domainName: PropTypes.string.isRequired,
    transferToAddress: PropTypes.string.isRequired,
    onSubmit: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired,
    activeAddress: PropTypes.string.isRequired
};

export default TransferDomainForm;