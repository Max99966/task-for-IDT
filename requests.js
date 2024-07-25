const axios = require('axios');

const HttpRequestManager = async (method, url, headers = {}, body = {}) => {
    try {
        switch (method) {
            case 'POST': {
                return await axios.post(url, body, {headers});
            }
            case 'PUT': {
                return await axios.put(url, body, {headers});
            }
            case 'PATCH': {
                return await axios.patch(url, body, {headers});
            }
            case 'DELETE': {
                return await axios.delete(url, {headers});
            }
            default: {
                return await axios.get(url, {headers});
            }
        }
    } catch (e) {
        throw e;
    }
};

const getAllProducts = async (method = "GET") => {
    const url = 'https://automationexercise.com/api/productsList';
    return await HttpRequestManager(method, url)
}

module.exports = {
    getAllProducts
}