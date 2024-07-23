const axios = require('axios');

const httpRequest = async (method, url, _headers = {}, body = {}) => {
    const headers = {
        'Content-Type': _headers['Content-Type'] ? _headers['Content-Type'] : 'application/json',
        ..._headers
    };
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

module.exports= {
    httpRequest
}