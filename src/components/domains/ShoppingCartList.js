
import React, {PropTypes} from 'react';
import ShoppingCartListRow from './ShoppingCartListRow';
import { Link } from 'react-router';

const ShoppingCartList = ({domains, onCheckout, removeDomain}) => {

    return (
        <div className="container">
    <div className="row">
        <div className="col-sm-12 col-md-10 col-md-offset-1">
            <table className="table table-hover">
                <thead>
                    <tr>
                        <th>Domain</th>
                        <th></th>
                        <th>IP</th>
                        <th className="text-center">Price</th>
                        <th> </th>
                    </tr>
                </thead>
                <tbody>
                    {domains.map(d => <ShoppingCartListRow removeDomain={removeDomain} key={d.domainName} domain={d}/>)}
                    <tr>
                        <td>   </td>
                        <td>   </td>
                        <td>   </td>
                        <td><h3>Total</h3></td>
                        <td className="text-right"><h3><strong>{domains.reduce((agg, d) => agg + Number(d.price), 0).toFixed(3)} ETH</strong></h3></td>
                    </tr>
                    <tr>
                        <td>   </td>
                        <td>   </td>
                        <td>   </td>
                        <td>
                        <Link to="/search-domains" className="btn btn-default">
                            Continue Shopping
                        </Link></td>
                        <td>
                        <button onClik={onCheckout} type="button" className="btn btn-success">
                            Checkout
                        </button></td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</div>
    );
};

ShoppingCartList.propTypes = {
    domains: PropTypes.array.isRequired,
    onCheckout: PropTypes.func.isRequired,
    removeDomain: PropTypes.func.isRequired
};


export default ShoppingCartList;