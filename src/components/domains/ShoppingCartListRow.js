import React, {PropTypes} from 'react';

const ShoppingCartListRow = ({domain, removeDomain}) => {

    const onRemoveClickd = () => {
        removeDomain(domain);
    };

    return (
        <tr>
        <td className="col-sm-8 col-md-6">
        <div className="media">
            <a className="thumbnail pull-left" href="#"> <img className="media-object" src="http://shawnwrightdigitalmarketing.com/wp-content/uploads/2017/12/487801-1NhDLy1477425888.jpg" style={{width: '72px', height: '72px'}} /> </a>
            <div className="media-body">
                <h4 className="media-heading"><a href="#">{domain.domainName}</a></h4>
                <span>Status: </span><span className="text-success"><strong>Available</strong></span>
            </div>
        </div>
        </td>
        <td>
        </td>
        <td className="col-sm-1 col-md-1" style={{'text-align': 'center'}}>
        <input type="email" className="form-control" id="exampleInputEmail1" value="3" />
        </td>
        <td className="col-sm-1 col-md-1 text-center"><strong>{domain.price}</strong></td>
        <td className="col-sm-1 col-md-1">
        <button onClick={onRemoveClickd} type="button" className="btn btn-danger">
            Remove
        </button></td>
    </tr>
    );
};

ShoppingCartListRow.propTypes = {
    domain: PropTypes.object.isRequired,
    removeDomain: PropTypes.func.isRequired
};

export default ShoppingCartListRow;