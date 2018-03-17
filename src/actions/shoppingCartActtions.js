import { ADD_DOMAIN_TO_CART } from "./actionTypes";

export function addDomainToShoppingCard(domain) {
    return { type: ADD_DOMAIN_TO_CART, domain };
}