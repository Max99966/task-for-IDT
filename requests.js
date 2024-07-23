const httpRequest = require("./commonFunctions");

const getAllProducts = async () => {
    const url = `https://automationexercise.com/api/productsList`
    try {
        return await httpRequest('GET', url);
    } catch (e) {
        return e;
    }
};