const {getAllProducts} = require("../requests");

describe('API Tests for Products List', () => {
    let response = {}
    beforeAll(async () => {
        response = await getAllProducts();
    }, 2000)
    test('Valid Request - Status 200 and Data Structure', async () => {
        expect(response.status).toBe(200);
        expect(response.data).toHaveProperty('products');
        expect(Array.isArray(response.data.products)).toBe(true);
    });

    test('Product Data Structure', async () => {
        const products = response.data.products;
        products.forEach(product => {
            expect(product).toHaveProperty('id');
            expect(product).toHaveProperty('name');
            expect(product).toHaveProperty('category');
            expect(product).toHaveProperty('price');
        });
    });

    test('Non-Empty Product List', async () => {
        const products = response.data.products;
        expect(products.length).toBeGreaterThan(0);
    });

    test('Data Types of Product Fields', async () => {
        const products = response.data.products;
        products.forEach(product => {
            expect(typeof product.id).toBe('number');
            expect(typeof product.name).toBe('string');
            expect(typeof product.category).toBe('object');
            expect(typeof product.price).toBe('string');
        });
    });

    test('Incorrect HTTP Method - Status 405', async () => {
        const response = await getAllProducts("POST")
        expect(response.data.responseCode).toBe(405)
        expect(response.data.message).toBe("This request method is not supported.")
    });

    test.skip('Content-Type Header', async () => {
        const response = await getAllProducts();
        expect(response.headers['content-type']).toMatch(/application\/json/);
    });

    test('Consistency in Product IDs', async () => {
        const response = await getAllProducts();
        const products = response.data.products;
        const ids = products.map(product => product.id);
        const uniqueIds = new Set(ids);
        expect(ids.length).toBe(uniqueIds.size);
    });

    test('Handling of Optional Fields', async () => {
        const response = await getAllProducts();
        const products = response.data.products;
        products.forEach(product => {
            // Assuming 'description' is an optional field
            if (product.hasOwnProperty('description')) {
                expect(typeof product.description).toBe('string');
            }
        });
    });

    test('Data Consistency Over Multiple Requests', async () => {
        const response1 = await getAllProducts();
        const response2 = await getAllProducts();
        expect(response1.data).toEqual(response2.data);
    });

});