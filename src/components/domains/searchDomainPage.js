
import React from 'react';
import TextInput from './../common/TextInput';
import SearchDomainForm from './searchDomainForm';

class SearchDomainPage extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            domain: {
                name
            },
            errors: {}
        };

        this.updateSearchedDomain = this.updateSearchedDomain.bind(this);
        this.searchForDomain = this.searchForDomain.bind(this);
    }

    updateSearchedDomain(event) {
        const value = event.target.value;
        const fieldName = event.target.name;

        const updatedDomain = this.state.domain;
        updatedDomain[fieldName] = value;

        this.setState({
            domain: updatedDomain
        });
    }

    searchForDomain() {
        // console.log('searching for domain', this.state.domain.name);
    }

    render() {
        return (
            <SearchDomainForm
                domain={this.state.domain}
                onChange={this.updateSearchedDomain}
                onSearch={this.searchForDomain}
                errors={this.state.errors} />
        );
    }
}

export default SearchDomainPage;