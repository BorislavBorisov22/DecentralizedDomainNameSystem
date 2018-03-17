
import React, {PropTypes} from 'react';
import { connect } from 'react-redux';
import ShoppingCartList from './ShoppingCartList';

class ShoppingCartPage extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        return (
            <div>
                <ShoppingCartList domains={this.props.domains}/>
            </div>
        );
    }
}

ShoppingCartPage.propTypes = {
    domains: PropTypes.array.isRequired
};

function mapStateToProps(state) {
    return {
        domains: state.shoppingCart
    };
}

export default connect(mapStateToProps)(ShoppingCartPage);