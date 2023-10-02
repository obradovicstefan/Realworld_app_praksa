const { Builder } = require('selenium-webdriver');
const config = require('../config/config');
const logger = require('../config/log4js.config');
const HomePage = require('../pages/HomePage');
const LoginPage = require('../pages/LoginPage');
const testData = require('../config/testdata.json');

// Accessing test data
const validUser = testData.validUser;
const baseUrl = testData.urls.baseUrl;

describe('Login Tests', () => {
  let driver;
  let homePage;
  let loginPage;

  beforeAll(async () => {
    // Initialize WebDriver with the specified browser
    driver = new Builder().forBrowser(config.browser).build();
    homePage = new HomePage(driver);
    loginPage = new LoginPage(driver);
  });

  afterAll(async () => {
    // Quit the WebDriver session after tests are completed
    await driver.quit();
  });

  it('should navigate to the login page and perform a successful login', async () => {
    try {
      // Open the home page
      await homePage.open(config.baseUrl);

      // Perform actions on the home page using Page Object methods
      // Example: Click on a link to navigate to the login page
      await homePage.clickLoginLink();

      // Perform actions on the login page using Page Object methods
      // Example: Fill in login credentials and submit the form
      await loginPage.login('valid_username', 'valid_password');

      // Add assertions to verify successful login
      // Example: expect(await loginPage.isLoggedIn()).toBe(true);
    } catch (error) {
      logger.error('Error during test:', error);
    }
  });

  it('should display an error message for invalid login credentials', async () => {
    try {
      // Open the home page
      await homePage.open(config.baseUrl);

      // Perform actions on the home page using Page Object methods
      // Example: Click on a link to navigate to the login page
      await homePage.clickLoginLink();

      // Perform actions on the login page using Page Object methods
      // Example: Fill in invalid login credentials and submit the form
      await loginPage.login('invalid_username', 'invalid_password');

      // Add assertions to verify the error message is displayed
      // Example: expect(await loginPage.isErrorMessageDisplayed()).toBe(true);
    } catch (error) {
      logger.error('Error during test:', error);
    }
  });
});
