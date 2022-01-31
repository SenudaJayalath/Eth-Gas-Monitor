import fetch from "node-fetch";

const BACKEND_URL = "https://api.etherscan.io/api"

const procced = async (path, method, params, payload, headers) => {
    let options = {
        method: method,
        mode: 'cors',
        credentials: 'include',
        headers: headers,
        body: (method !== 'GET') ? payload : undefined
    }
    let response = await fetch(`${BACKEND_URL}${path}`, options)
    if (!response.ok) {
        throw new Error(response.statusText);
    }
    let contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
        return response.json()
    } else {
        return response.text()
    }
}

export const FetchClient = (path) => {
    return {
        GET({params = undefined, headers = {'Content-Type': 'application/json'}}){
            return procced(path, "GET", params, undefined, headers)
        },
        POST({params, payload, headers = {'Content-Type': 'application/json'}}){
            return procced(path, "POST", params, payload, headers)
        },
        PUT({params, payload, headers = {'Content-Type': 'application/json'}}){
            return procced(path, "PUT", params, payload, headers)
        },
        PATCH({params, payload, headers = {'Content-Type': 'application/json'}}){
            return procced(path, "PATCH", params, payload, headers)
        },
        DELETE({params, headers = {'Content-Type': 'application/json'}}){
            return procced(path, "DELETE", params, undefined, headers)
        }
    }
}