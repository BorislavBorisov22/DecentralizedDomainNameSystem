import React from 'react';

const Header = () => {
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
                <li className="active"><a href="#">Home</a></li>
                <li><a href="#">About</a></li>
                </ul>
                <ul className="nav navbar-nav navbar-right">
                <li><a href="../navbar-fixed-top/">My Domains</a></li>
                </ul>
            </div>
            </div>
        </nav>
    );
};

export default Header;