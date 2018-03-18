import { ADD_DOMAIN_TO_CART, REMOVE_DOMAIN_FROM_CART, ADD_IP_TO_DOMAIN, BUY_DOMAIN_SUCCESS } from "./actionTypes";
import getDdnsContract from './../blockchain/ddns-contract';

export function addDomainToShoppingCart(domain) {
    return { type: ADD_DOMAIN_TO_CART, domain };
}

export function removeDomainFromCart(domain) {
    return {type: REMOVE_DOMAIN_FROM_CART, domain};
}

export function addIpToDomain(domainWithIp) {
    return {type: ADD_IP_TO_DOMAIN, domain: domainWithIp};
}

export function buyDomainSuccess(domain) {
    return {type: BUY_DOMAIN_SUCCESS, domain };
}

export function buyDomain(domain) {
    return function(dispatch) {
        const contract = getDdnsContract();
        return contract.buyDomain(domain)
            .then(() => dispatch(buyDomainSuccess(domain)));
    };
}