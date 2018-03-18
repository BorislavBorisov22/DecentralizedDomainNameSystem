
import React, {PropTypes} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ShoppingCartList from './ShoppingCartList';
import { removeDomainFromCart, addIpToDomain, buyDomain } from '../../actions/shoppingCartActions';
import toastr from 'toastr';

class ShoppingCartPage extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.removeDomain = this.removeDomain.bind(this);
        this.addDomainIp = this.addDomainIp.bind(this);
        this.buyDomain = this.buyDomain.bind(this);
    }

    removeDomain(domain) {
        this.props.actions.removeDomainFromCart(domain);
    }

    addDomainIp(domain, ip) {
        this.props.actions.addIpToDomain(Object.assign({}, domain, { ip }));
    }

    buyDomain(domain) {
        this.props.actions.buyDomain(domain)
            .then(() => toastr.success('Domain registered successfully'));
    }

    render() {
        return (
            <div>
                <ShoppingCartList domains={this.props.domains} buyDomain={this.buyDomain} onCheckout={this.buyDomains} addDomainIp={this.addDomainIp} removeDomain={this.removeDomain}/>
            </div>
        );
    }
}

ShoppingCartPage.propTypes = {
    domains: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired
};

function mapStateToProps(state) {
    return {
        domains: state.shoppingCart
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({ removeDomainFromCart, addIpToDomain, buyDomain }, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ShoppingCartPage);