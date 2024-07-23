const axios = require('axios');

const API_URL = 'https://automationexercise.com/api/productsList';

describe('API Tests for Products List', () => {

    test('Valid Request - Status 200 and Data Structure', async () => {
        const response = await axios.get(API_URL);
        expect(response.status).toBe(200);
        expect(response.data).toHaveProperty('products');
        expect(Array.isArray(response.data.products)).toBe(true);
    });

    test('Product Data Structure', async () => {
        const response = await axios.get(API_URL);
        const products = response.data.products;
        products.forEach(product => {
            expect(product).toHaveProperty('id');
            expect(product).toHaveProperty('name');
            expect(product).toHaveProperty('category');
            expect(product).toHaveProperty('price');
        });
    });

    test('Non-Empty Product List', async () => {
        const response = await axios.get(API_URL);
        const products = response.data.products;
        expect(products.length).toBeGreaterThan(0);
    });

    test('Data Types of Product Fields', async () => {
        const response = await axios.get(API_URL);
        const products = response.data.products;
        products.forEach(product => {
            expect(typeof product.id).toBe('number');
            expect(typeof product.name).toBe('string');
            expect(typeof product.category).toBe('string');
            expect(typeof product.price).toBe('number');
        });
    });

    test('Response Time', async () => {
        const start = Date.now();
        await axios.get(API_URL);
        const end = Date.now();
        expect(end - start).toBeLessThan(2000); // Less than 2 seconds
    });

    test('Incorrect HTTP Method - Status 405', async () => {
        try {
            await axios.post(API_URL);
        } catch (error) {
            expect(error.response.status).toBe(405);
        }
    });

    test('Content-Type Header', async () => {
        const response = await axios.get(API_URL);
        expect(response.headers['content-type']).toMatch(/application\/json/);
    });

    test('Consistency in Product IDs', async () => {
        const response = await axios.get(API_URL);
        const products = response.data.products;
        const ids = products.map(product => product.id);
        const uniqueIds = new Set(ids);
        expect(ids.length).toBe(uniqueIds.size);
    });

    test('Handling of Optional Fields', async () => {
        const response = await axios.get(API_URL);
        const products = response.data.products;
        products.forEach(product => {
            // Assuming 'description' is an optional field
            if (product.hasOwnProperty('description')) {
                expect(typeof product.description).toBe('string');
            }
        });
    });

    test('Data Consistency Over Multiple Requests', async () => {
        const response1 = await axios.get(API_URL);
        const response2 = await axios.get(API_URL);
        expect(response1.data).toEqual(response2.data);
    });

});