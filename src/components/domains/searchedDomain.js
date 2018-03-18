
import React, {PropTypes} from 'react';

const SearchedDomain = ({ domain, onClick, activeAccount, onEdit }) => {

    const expiresDateFormat = new Date(Number(domain.expires) * 1000);
    const isAvailable = domain.owner === activeAccount || expiresDateFormat < Date.now();

    return (
        <div>
            <br />
                <div className="row" style={{display: 'flex', 'justifyContent': 'space-between'}}>
                    <div className="col-sm-12 col-md-12">
                        <div className="well">
                        <h2 className="text-warning">{domain.domainName}</h2>
                        <p><span className={"label " + (isAvailable ? 'label-success' : 'label-danger')}>{isAvailable ? 'Available' : 'Taken'}</span></p>
                        <ul>
                            <li>Owned by - {domain.owner === activeAccount ? 'you' : domain.owner}</li>
                            <li>Current ip address - {domain.ip}</li>
                            <li>expires - {expiresDateFormat.getDate()}/{expiresDateFormat.getMonth() + 1}/{expiresDateFormat.getFullYear()}

                             &nbsp;&nbsp;{expiresDateFormat.getHours()}:{expiresDateFormat.getMinutes()}
                            </li>
                        </ul>
                        <hr/>
                        <h3>{domain.price} ETH / year</h3>
                        <hr/>
                        {activeAccount === domain.owner && <p onClick={onEdit}><a className="btn btn-primary btn-lg" href="#"><i className="icon-ok"></i> Edit</a></p>}
                        <p onClick={onClick}><a className="btn btn-success btn-lg" href="#"><i className="icon-ok"></i> Add to cart</a></p>
                        </div>
                    </div>
                </div>
        </div>
    );
};

SearchedDomain.propTypes = {
    domain: PropTypes.object.isRequired,
    onClick: PropTypes.func.isRequired,
    activeAccount: PropTypes.string.isRequired,
    onEdit: PropTypes.func
};

export default SearchedDomain;