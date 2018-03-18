
import getddnsContract from './../blockchain/ddns-contract';
import { SEARCH_DOMAIN_SUCCESS, SEARCH_DOMAIN_CLEAR } from './actionTypes';

export function searchDomainSuccess(domain) {
    return { type: SEARCH_DOMAIN_SUCCESS, domain};
}

export function clearSearchedDomain() {
    return { type: SEARCH_DOMAIN_CLEAR };
}

export function searchDomain(domainName) {
    return function(dispatch) {
        const contract = getddnsContract();
        return contract.getDomain(domainName).then(resDomain => {
            dispatch(searchDomainSuccess(resDomain));
        });
    };
}