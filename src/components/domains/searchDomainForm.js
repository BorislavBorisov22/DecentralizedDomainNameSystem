
import React, {PropTypes} from 'react';
import TextInput from './../common/TextInput';

const SearchDomainForm = ({ domain, onSearch, onChange, errors}) => {
    return (
        <div>
            <h1>Search For a Domain</h1>

            <br />

            <TextInput
            name="name"
            onChange={onChange}
            label="Domain Name"
            placeholder="Name"
            error={errors.name}
            value={domain.name}/>

            <br />

            <button className="btn btn-primary" onClick={onSearch}>Search</button>
        </div>
    );
};

SearchDomainForm.propTypes = {
    domain: PropTypes.object.isRequired,
    onSearch: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired
}

export default SearchDomainForm;