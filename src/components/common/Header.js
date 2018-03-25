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
                <li><Link to=".">Home</Link></li>
                <li><Link to="/search-domains">Search Domains</Link></li>
                </ul>
                <ul className="nav navbar-nav navbar-right">
                <li><a href="#">your account: <span className="text-primary">{activeAddress}</span></a></li>
                <li style={{color: cartItemsCount > 0 ? 'red': ''}}><Link to="/cart"><img style={{height: '15px', width: '30px'}} src="https://cdn2.iconfinder.com/data/icons/travel-solid-icons-vol-1/48/019-512.png"/>
                    {cartItemsCount > 0 && <span style={{color: 'white', 'background-color': 'red', padding: '5px', 'margin-left': '5px', borderRadius: '50%'}}>{cartItemsCount}</span>}
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