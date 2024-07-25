const {verifyLogin} = require("../requests");
const {validEmailsForTest, invalidEmailsForTest, validPassword} = require("../testData/baseData.json")

describe('API Tests for Verify Login - Positive Test Cases', () => {
    test.each(validEmailsForTest)('Verify valid user login for %s', async (validEmail) => {
        const response = await verifyLogin({"email": validEmail, "password": validPassword});
        expect(response.status).toBe(200);
        expect(response.data.message).toBe('User exists!');
    }, 1000); // Check response time
});

describe('API Tests for Verify Login - Negative Test Cases', () => {
    test.each(invalidEmailsForTest)('Verify login with incorrect email, %s', async (invalidEmail) => {
        const response = await verifyLogin({"email": invalidEmail, "password": validPassword});
        expect(response.data['responseCode']).toBe(404);
        expect(response.data.message).toBe('User not found!');
    }, 1000);

    test('Verify login with incorrect password', async () => {
        const response = await verifyLogin({"email": validEmailsForTest[0], "password": "invalid"});
        expect(response.data['responseCode']).toBe(404);
        expect(response.data.message).toBe('User not found!');
    }, 1000);

    test('Verify login with empty email', async () => {
        // This step is counted as incorrect user, because of no password validation when signing up.
        const response = await verifyLogin({"email": "", "password": validPassword});
        expect(response.data['responseCode']).toBe(404);
        expect(response.data.message).toBe('User not found!');
    }, 1000);

    test('Verify login with empty password', async () => {
        // This step is counted as incorrect user, because of no password validation when signing up.
        const response = await verifyLogin({"email": validEmailsForTest[0], "password": ""});
        expect(response.data['responseCode']).toBe(404);
        expect(response.data.message).toBe('User not found!');
    }, 1000);

    test('Verify login with empty email and password', async () => {
        // This step is counted as incorrect user, because of no password validation when signing up.
        const response = await verifyLogin({"email": "", "password": ""});
        expect(response.data['responseCode']).toBe(404);
        expect(response.data.message).toBe('User not found!');
    }, 1000);

    test('Verify login with missing email', async () => {
        const response = await verifyLogin({"password": validPassword});
        expect(response.data['responseCode']).toBe(400);
        expect(response.data.message).toBe('Bad request, email or password parameter is missing in POST request.');
    }, 1000);

    test('Verify login with missing password', async () => {
        const response = await verifyLogin({"email": validEmailsForTest[0]});
        expect(response.data['responseCode']).toBe(400);
        expect(response.data.message).toBe('Bad request, email or password parameter is missing in POST request.');
    }, 1000);

    test('Verify login with invalid request format', async () => {
        const response = await verifyLogin({"email": validEmailsForTest[0], "password": validPassword}, "GET");
        expect(response.data['responseCode']).toBe(405);
        expect(response.data.message).toBe('This request method is not supported.');
    }, 1000);
});
