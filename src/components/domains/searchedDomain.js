
import React, {PropTypes} from 'react';

const SearchedDomain = ({ domain, onClick }) => {

    return (
        <div>
            <div className="container">
                <div className="row" style={{display: 'flex', 'justifyContent': 'space-between'}}>
                    <div className="col-sm-3 col-md-3">
                        <div className="well">
                        <h2 className="text-warning">{domain.domainName}</h2>
                        <p><span className="label label-success">POPULAR</span></p>
                        <ul>
                            <li>Unlimited access</li>
                            <li>One year</li>
                            <li>Possible extension</li>
                        </ul>
                        <hr/>
                        <h3>{domain.price} ETH / year</h3>
                        <hr/>
                        <p onClick={onClick}><a className="btn btn-success btn-lg" href="#"><i className="icon-ok"></i> Add to cart</a></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

SearchedDomain.propTypes = {
    domain: PropTypes.object.isRequired,
    onClick: PropTypes.func.isRequired
};

export default SearchedDomain;