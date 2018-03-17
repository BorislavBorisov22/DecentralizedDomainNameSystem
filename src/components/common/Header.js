import React, {PropTypes} from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

const Header = ({ activeAddress, cartItemsCount }) => {
    return (
        <nav className="navbar navbar-default">
            <div className="container-fluid">
            <div className="navbar-header">
                <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
                <span className="sr-only">Toggle navigation</span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
                </button>
                <a className="navbar-brand" href="#">DDNS</a>
            </div>
            <div id="navbar" className="navbar-collapse collapse" aria-expanded="false" style={{height: '1px'}}>
                <ul className="nav navbar-nav">
                <li className="active"><Link to=".">Home</Link></li>
                <li><Link to="/search-domains">Search Domains</Link></li>
                </ul>
                <ul className="nav navbar-nav navbar-right">
                <li><a href="#">your account: <span className="text-primary">{activeAddress}</span></a></li>
                <li><Link to="/cart"><img style={{height: '40px', width: '50px'}} src="https://cdn3.iconfinder.com/data/icons/ikooni-flat-online-shopping/128/shopping-14-128.png"/>
                    ({cartItemsCount})
                    </Link>
                </li>
                </ul>
            </div>
            </div>
        </nav>
    );
};

Header.propTypes = {
    activeAddress: PropTypes.string.isRequired,
    cartItemsCount: PropTypes.number.isRequired
};

function mapStateToProps(state) {
    return {
        activeAddress: state.activeAddress
    };
}

export default Header;