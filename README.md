# Realworld_app_praksa

Automated Testing README
This README provides an overview of the files and test suites related to automated testing of a web application using Selenium WebDriver and Node.js. The tests are organized into multiple files, each focusing on specific functionalities and scenarios.

Project Structure
The project contains several files and directories:

1. LoginPage.js
This file contains the implementation of the LoginPage class, which represents the login page of the web application. It includes methods for logging in with valid user credentials. Key components of this file include:

- Dependencies: Import statements for necessary dependencies.
- Class Definition: Definition of the LoginPage class that extends the BasePage class.
- Constructor: Initialization of locators and page-specific variables.

logIn() Method: Method to log in with valid user credentials.

2. loginTest.js
This file contains a test suite for the login functionality. It includes tests to validate successful login. Key components of this file include:

- Dependencies: Import statements for necessary dependencies.
- Test Suite Definition: Definition of a Mocha test suite named "Login test."
- Before Hook: Setup logic to initialize the WebDriver and LoginPage object.
- Test Case: Test case to validate successful login.
- After Hook: Cleanup logic to quit the WebDriver after the test.

3. InvalidLogInPage.js

This file contains the implementation of the InvalidLogInPage class, which represents the login page for invalid login attempts. It includes methods for attempting to log in with invalid user credentials. Key components of this file include:

- Dependencies: Import statements for necessary dependencies.
- Class Definition: Definition of the InvalidLogInPage class that extends the BasePage class.
- Constructor: Initialization of locators and page-specific variables.

- invalidLogIn() Method: Method to attempt login with invalid user credentials.

4. invalidLoginTest.js
This file contains a test suite for the login functionality with invalid credentials. It includes tests to validate that an error message is displayed when invalid credentials are used for login. Key components of this file include:

Dependencies: Import statements for necessary dependencies.
Test Suite Definition: Definition of a Mocha test suite named "Login test fail."
Before Hook: Setup logic to initialize the WebDriver and InvalidLogInPage object.
Test Case: Test case to validate that an error message is displayed for invalid login.
After Hook: Cleanup logic to quit the WebDriver after the test.
5. InvalidSignUpPage.js
This file contains the implementation of the InvalidSignUpPage class, which represents the sign-up page for invalid sign-up attempts. It includes methods for attempting to sign up with invalid user information. Key components of this file include:

- Dependencies: Import statements for necessary dependencies.
- Class Definition: Definition of the InvalidSignUpPage class that extends the BasePage class.
- Constructor: Initialization of locators and page-specific variables.

- invalidSignUp() Method: Method to attempt sign-up with invalid user information.

6. invalidSignUpTest.js
This file contains a test suite for the sign-up functionality with invalid user information. It includes tests to validate that the sign-up button is disabled when invalid information is entered. Key components of this file include:

- Dependencies: Import statements for necessary dependencies.
- Test Suite Definition: Definition of a Mocha test suite named "Sign Up test fail."
- Before Hook: Setup logic to initialize the WebDriver and InvalidSignUpPage object.
- Test Case: Test case to validate that the sign-up button is disabled for invalid sign-up.
- After Hook: Cleanup logic to quit the WebDriver after the test.

Running the Tests:

To run the automated tests, follow these steps:

Ensure that Node.js and npm are installed on your system.

Install the required dependencies by running the following command in the project directory:

- npm install

Execute the tests by running the following commands:

To run the login tests:

- npm test loginTest.js

To run the invalid login tests:

- npm test invalidLoginTest.js

To run the invalid sign-up tests:

- npm test invalidSignUpTest.js


The test results will be displayed in the console, indicating whether the tests passed or failed.

Notes:
These tests are designed to be run with the Chrome browser. Ensure that Chrome WebDriver is installed and compatible with the version of Chrome on your system.

Modify the test data in the testdata.json file as needed to match your application's login and sign-up scenarios.

Additional test cases and scenarios can be added to expand test coverage.

Make sure the application under test is running and accessible at the specified URLs.

Customize the test assertions and validations as per the requirements of your application.

Ensure that the project directory structure is maintained for the tests to work correctly.

Troubleshooting
If you encounter any issues while running the tests, refer to the documentation of Selenium WebDriver and the testing framework (Mocha, Chai) for troubleshooting and debugging assistance.

For any further assistance or questions, please reach out to the project team.

