import React, { PropTypes } from 'react';
import Header from './common/Header';
import { connect } from 'react-redux';

class App extends React.Component {
    render() {
        return (
            <div className="container">
                <Header />
                {this.props.children}
            </div>
        );
    }
}

App.propTypes = {
    children: PropTypes.object.isRequired
};

function mapStateToProps(state, ownProps) {
    return {

    };
}

function mapDispatchToProps(state, props) {
    return {

    };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);