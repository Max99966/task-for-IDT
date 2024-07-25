const {updateUserAccount} = require("../requests");
const {validEmailsForTest, invalidEmailsForTest, validPassword} = require("../testData/baseData.json")

describe.each(validEmailsForTest)('Tests for Update User Account - Positive Test Cases, email: %s', (validEmail) => {
    test('Check response for valid body with all optional fields', async () => {
        const body = {
            "email": validEmail,
            "password": validPassword,
            "name": "Jon Stewart Doe",
            "title": "Mr", // Mr, Mrs
            "birth_date": 15,
            "birth_month": 3,
            "birth_year": 1998, // 1900 - 2021
            "firstname": "Jon",
            "lastname": "Doe",
            "company": "Google",
            "address1": "1600 Amphitheatre Parkway",
            "address2": "Apartment 1",
            "country": "United States",
            "zipcode": 94043,
            "state": "CA",
            "city": "Mountain View",
            "mobile_number": 6019521325
        }
        const response = await updateUserAccount(body);
        expect(response.status).toBe(200);
        expect(response.data.message).toBe('User updated!');
    }, 1000);

    test('Check response with only required fields', async () => {
        const response = await updateUserAccount({"email": validEmail, "password": validPassword});
        expect(response.status).toBe(200);
        expect(response.data.message).toBe('User updated!');
    }, 1000);
});

describe('Tests for Update User Account - Negative Test Cases', () => {
    test.each(invalidEmailsForTest)('Check response for invalid email, %s', async (invalidEmail) => {
        const response = await updateUserAccount({"email": invalidEmail, "password": validPassword});
        expect(response.data['responseCode']).toBe(404);
        expect(response.data.message).toBe('Account not found!');
    }, 1000);

    test('Check response for missing email field', async () => {
        const response = await updateUserAccount({"password": validPassword});
        expect(response.data['responseCode']).toBe(400);
        expect(response.data.message).toBe('Bad request, email parameter is missing in PUT request.');
    }, 1000);

    test('Check response for missing password field', async () => {
        const response = await updateUserAccount({"email": validEmailsForTest[0]});
        expect(response.data['responseCode']).toBe(400);
        expect(response.data.message).toBe('Bad request, password parameter is missing in PUT request.');
    }, 1000);

    test('Check response for invalid title field (unsupported value)', async () => {
        const body = {
            "email": validEmailsForTest[0],
            "password": validPassword,
            "title": "Dr"
        }
        const response = await updateUserAccount(body);
        expect(response.data['responseCode']).toBe(400);
        expect(response.data.message).toBe('Title must be either Mr or Mrs');
    }, 1000);

    test('Check response for invalid birth_date field', async () => {
        const body = {
            "email": validEmailsForTest[0],
            "password": validPassword,
            "birth_date": 40,
            "birth_month": 3,
            "birth_year": 1998
        }
        const response = await updateUserAccount(body);
        expect(response.data['responseCode']).toBe(400);
        expect(response.data.message).toBe('Invalid birth date');
    }, 1000);

    test('Check response for out-of-range birth_month field', async () => {
        const body = {
            "email": validEmailsForTest[0],
            "password": validPassword,
            "birth_date": 14,
            "birth_month": 15,
            "birth_year": 1998
        }
        const response = await updateUserAccount(body);
        expect(response.data['responseCode']).toBe(400);
        expect(response.data.message).toBe('Invalid birth month');
    }, 1000);

    test('Check response for out-of-range birth_year field (before 1900)', async () => {
        const body = {
            "email": validEmailsForTest[0],
            "password": validPassword,
            "birth_date": 14,
            "birth_month": 9,
            "birth_year": 1889
        }
        const response = await updateUserAccount(body);
        expect(response.data['responseCode']).toBe(400);
        expect(response.data.message).toBe('Invalid birth year');
    }, 1000);

    test('Check response for out-of-range birth_year field (after 2021)', async () => {
        const body = {
            "email": validEmailsForTest[0],
            "password": validPassword,
            "birth_date": 14,
            "birth_month": 9,
            "birth_year": 2024
        }
        const response = await updateUserAccount(body);
        expect(response.data['responseCode']).toBe(400);
        expect(response.data.message).toBe('Invalid birth year');
    }, 1000);

    test('Check response for XSS attack attempt', async () => {
        const xssAttackData = {
            email: "testmaaks@gmail.com",
            name: "<script>alert('XSS')</script>",
            password: "Test1245",
            title: "Mr",
            birth_date: "01",
            birth_month: "01",
            birth_year: "2000",
            firstname: "John",
            lastname: "Doe",
            company: "TestCompany",
            address1: "123 Test St",
            address2: "Apt 4",
            country: "US",
            zipcode: "12345",
            state: "TestState",
            city: "TestCity",
            mobile_number: "1234567890"
        };
        const response = await updateUserAccount(xssAttackData);
        expect(response.status).toBe(400);
        expect(response.data.message).to.include('invalid input');
    }, 1000)

    test('Check response for SQL injection attempt', async () => {
        const sqlInjectionData = {
            email: "testmaaks@gmail.com'; DROP TABLE users; --",
            name: "Test",
            password: "Test1245",
            title: "Mr",
            birth_date: "01",
            birth_month: "01",
            birth_year: "2000",
            firstname: "John",
            lastname: "Doe",
            company: "TestCompany",
            address1: "123 Test St",
            address2: "Apt 4",
            country: "US",
            zipcode: "12345",
            state: "TestState",
            city: "TestCity",
            mobile_number: "1234567890"
        };
        const response = await updateUserAccount(sqlInjectionData);
        expect(response.status).toBe(400);
        expect(response.data.message).to.include('invalid input');
    }, 1000)
});
