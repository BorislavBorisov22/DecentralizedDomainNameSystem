
import React, {PropTypes} from 'react';
import TextInput from './../common/TextInput';
import SearchDomainForm from './SearchDomainForm';
import getDdnsContract from './../../blockchain/ddns-contract';
import * as searchDomainActions from '../../actions/searchDomainActions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import SearchedDomain from './SearchedDomain';
import { addDomainToShoppingCard } from './../../actions/shoppingCartActions';

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
        this.addDomainToCart = this.addDomainToCart.bind(this);
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
        this.props.actions.searchDomain(this.state.domain.name);
    }

    addDomainToCart() {
        this.props.actions.addDomainToShoppingCard(this.state.searchedDomain);
        this.props.actions.clearSearchedDomain();
    }

    render() {
        return (
            <div>
                <SearchDomainForm
                    domain={this.state.domain}
                    onChange={this.updateSearchedDomain}
                    onSearch={this.searchForDomain}
                    errors={this.state.errors} />
                {this.props.searchedDomain && <SearchedDomain onClick={this.addDomainToCart} domain={this.props.searchedDomain}/>}
            </div>
        );
    }
}

SearchDomainPage.propTypes = {
    actions: PropTypes.object.isRequired,
    searchedDomain: PropTypes.object.isRequired
};

function mapStateToProps(state, props) {
    return {
        searchedDomain: state.searchedDomain
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(Object.assign({}, searchDomainActions, { addDomainToShoppingCard }), dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchDomainPage);