const {getAllProducts} = require("../requests");
const {productsArraySchema} = require("../joiSchemas/validationForAllProducts");

describe('Tests for Products List - Positive Test Cases', () => {
    let response = {};
    let products = [];

    beforeAll(async () => {
        response = await getAllProducts();
        products = response.data['products'];
    }, 1000); // Info: Timeout will check the following test case: "Check response time"

    test('Check status code to be 200', async () => {
        expect(response.status).toBe(200);
        expect(response.data).toHaveProperty('products');
    });

    test('Check that response is not empty', async () => {
        expect(products.length).toBeGreaterThan(0);
    });

    test('Check response json schema', async () => {
        const validation = productsArraySchema.validate(products);
        if (validation.error) {
            console.error(validation.error.details);
        }
        expect(validation.error).toBeUndefined();
    });

    test('Check that product IDs are unique', async () => {
        const ids = products.map(product => product.id);
        const uniqueIds = new Set(ids);
        expect(ids.length).toBe(uniqueIds.size);
    });

    test('Check that the response is same each time', async () => {
        const response2 = await getAllProducts();
        expect(response.data).toEqual(response2.data);
    });
});

describe('Tests for Products List - Negative Test Cases', () => {
    test('Incorrect HTTP Method - Status 405', async () => {
        const response = await getAllProducts("POST")
        expect(response.data['responseCode']).toBe(405)
        expect(response.data.message).toBe("This request method is not supported.")
    });

    test('Check the URL with multiple slashes', async () => {
        // In this case, no matter how many slashes there are, the response is 200, so the case will fail
        const response = await getAllProducts("GET", '/////api//productsList')
        expect(response.status).toBe(404);
        expect(response.statusText).toBe("Not Found");
    });

    test('Check the URL with wrong endpoint', async () => {
        const response = await getAllProducts("GET", '/api/productsListt');
        expect(response.status).toBe(404);
        expect(response.statusText).toBe("Not Found");
    });
});