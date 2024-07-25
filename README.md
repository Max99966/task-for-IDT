# Task for IDT

## Description
In this repository, you will find the completed task, with both automated tests and test cases

## Tech used
* JavaScript
* JEST
* JoI validator

## Steps
1. Open your IDE and clone the [Project](https://github.com/Max99966/taskForIDT.git) from GitHub
2. After cloning the project - in terminal type: ```npm init / i / install```
3. Pull and Fetch the project: ```git pull origin main``` and ```git fetch```
4. When the project is copied successfully, you can run the tests either by command ```npm test```, or by running the script manually from ```package.json```

### Foldering
* joiSchemas - For getAllProductsListTest it was needed to add schema validation to the response
* testData - Here are all the needed test data 
  * baseData - Valid / Invalid emails for test and password
  * The rest of the files are test suites per test file / API endpoint
* tests - These are the actual test files

### Test cases
I created as many test cases as possible, and chose to write them here as JSON files, I'm sure that it would have been better for me to use another platform for convenience. There are also 8 test cases which are currently failing due to defects, didn't skip them, so they'll be visible. Whichever case is failing, it has ```expected``` outcome in the test case details.