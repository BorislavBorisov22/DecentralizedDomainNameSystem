
import React, {PropTypes} from 'react';
import TextInput from './../common/TextInput';
import SearchDomainForm from './SearchDomainForm';
import getDdnsContract from './../../blockchain/ddns-contract';
import * as searchDomainActions from '../../actions/searchDomainActions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import SearchedDomain from './SearchedDomain';
import { addDomainToShoppingCart } from './../../actions/shoppingCartActions';
import toastr from 'toastr';

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

    componentDidMount() {
        toastr.info('Please note that the displayed domain price is relative and might change from the time you search the domain to the time you actually buy it.');
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
        this.props.actions.addDomainToShoppingCart(this.props.searchedDomain);
        this.props.actions.clearSearchedDomain();

        toastr.success('Domain added to your shopping cart');
        this.setState({
            domain: {
                name: ''
            }
        });
    }

    navigateToDomainEdit(domain) {
        
    }

    render() {
        return (
            <div>
                <SearchDomainForm
                    domain={this.state.domain}
                    onChange={this.updateSearchedDomain}
                    onSearch={this.searchForDomain}
                    errors={this.state.errors} />
                {this.props.searchedDomain && <SearchedDomain activeAccount={this.props.activeAccount} onClick={this.addDomainToCart} domain={this.props.searchedDomain}/>}
            </div>
        );
    }
}

SearchDomainPage.propTypes = {
    actions: PropTypes.object.isRequired,
    searchedDomain: PropTypes.object,
    activeAccount: PropTypes.string
};

function mapStateToProps(state, props) {
    return {
        searchedDomain: state.searchedDomain,
        activeAccount: state.activeAddress
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(Object.assign({}, searchDomainActions, { addDomainToShoppingCart }), dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchDomainPage);