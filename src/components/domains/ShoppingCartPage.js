
import React, {PropTypes} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ShoppingCartList from './ShoppingCartList';
import { removeDomainFromCart } from '../../actions/shoppingCartActions';

class ShoppingCartPage extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.removeDomain = this.removeDomain.bind(this);
    }

    removeDomain(domain) {
        this.props.actions.removeDomainFromCart(domain);
    }

    render() {
        return (
            <div>
                <ShoppingCartList domains={this.props.domains} removeDomain={this.removeDomain}/>
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
        actions: bindActionCreators({ removeDomainFromCart }, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ShoppingCartPage);