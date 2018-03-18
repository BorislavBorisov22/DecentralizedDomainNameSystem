import { ADD_DOMAIN_TO_CART, REMOVE_DOMAIN_FROM_CART, ADD_IP_TO_DOMAIN } from "./actionTypes";

export function addDomainToShoppingCart(domain) {
    return { type: ADD_DOMAIN_TO_CART, domain };
}

export function removeDomainFromCart(domain) {
    return {type: REMOVE_DOMAIN_FROM_CART, domain};
}

export function addIpToDomain(domainWithIp) {
    console.log(domainWithIp, 'domainWithIp');
    return {type: ADD_IP_TO_DOMAIN, domain: domainWithIp};
}