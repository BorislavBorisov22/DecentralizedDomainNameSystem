import React, { PropTypes } from 'react';
import Header from './common/Header';
import { connect } from 'react-redux';

class App extends React.Component {
    render() {
        return (
            <div className="container">
                <Header activeAddress={this.props.activeAddress} cartItemsCount={this.props.cartItemsCount} />
                <div className="app-container">
                    {this.props.children}
                </div>
            </div>
        );
    }
}

App.propTypes = {
    children: PropTypes.object.isRequired,
    activeAddress: PropTypes.string.isRequired,
    cartItemsCount: PropTypes.number.isRequired
};

function mapStateToProps(state, ownProps) {
    return {
        activeAddress: state.activeAddress,
        cartItemsCount: state.shoppingCart.length
    };
}

function mapDispatchToProps(state, props) {
    return {

    };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);