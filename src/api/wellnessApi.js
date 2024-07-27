import { handleResponse, handleError } from "./apiUtils";
let url = 'https://669f704cb132e2c136fdd9a0.mockapi.io/api/v1/retreats';

export function getRetreatesItems() {

    return fetch(url, {
        method: 'GET'
    })
        .then(handleResponse)
        .catch(handleError)

}

export function getPaginatedRetreatesItems(currentPage, itemPerPage) {

    return fetch(`${url}?page=${currentPage}&limit=${itemPerPage}`, {
        method: 'GET'
    })
        .then(handleResponse)
        .catch(handleError)

}
export function searchRetreateItems(searchItem) {

    return fetch(`${url}?filter=${searchItem}`, {
        method: 'GET'
    })
        .then(handleResponse)
        .catch(handleError)

}