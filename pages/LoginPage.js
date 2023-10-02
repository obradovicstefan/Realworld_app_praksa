const BasePage = require('./BasePage');
const testData = require('../config/testdata.json');

// Accessing test data
const validUser = testData.validUser;
const baseUrl = testData.urls.baseUrl;

class LoginPage extends BasePage {
  // Define locators and methods specific to the Login page
}

module.exports = LoginPage;
