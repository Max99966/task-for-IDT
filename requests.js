const axios = require('axios');

const baseURL = "https://automationexercise.com"

const httpRequestManager = async (method, url, body = {}, headers = {}) => {
    headers['Content-Type'] = 'application/x-www-form-urlencoded'
    try {
        switch (method) {
            case 'POST': return await axios.post(url, body, {headers});
            case 'PUT': return await axios.put(url, body, {headers});
            case 'PATCH': return await axios.patch(url, body, {headers});
            case 'DELETE': return await axios.delete(url, {headers});
            default: return await axios.get(url, {headers});
        }
    } catch (e) {
        return e.response;
    }
};

const getAllProducts = async (method = "GET", endpoint = "/api/productsList") => {
    const url = `${baseURL}${endpoint}`;
    return await httpRequestManager(method, url)
}

const verifyLogin = async (body, method = "POST", endpoint = "/api/verifyLogin") => {
    const url = `${baseURL}${endpoint}`;
    return await httpRequestManager(method, url, body)
}

const updateUserAccount = async (body, method = "PUT", endpoint = "/api/updateAccount") => {
    const url = `${baseURL}${endpoint}`;
    return await httpRequestManager(method, url, body)
}

module.exports = {
    getAllProducts,
    verifyLogin,
    updateUserAccount
}