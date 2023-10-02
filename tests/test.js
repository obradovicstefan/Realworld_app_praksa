const { Builder, Key } = require('selenium-webdriver');
const { describe, it, before, after } = require('mocha');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const { createHomePage } = require('../pages/HomePage');

chai.use(chaiAsPromised);
const expect = chai.expect;

describe('Sample Selenium Test', async function () {
  const driver = await new Builder().forBrowser('chrome').build();
  try {
    const homePage = new HomePage(driver);

    await homePage.open();
    await homePage.search('Selenium with JavaScript');

    const searchResultsPage = await homePage.navigateToSearchResultsPage();

    // Use the searchResultsPage object for further interactions
    // For example, you can add assertions or additional actions here
    // const pageTitle = await searchResultsPage.getTitle();
    // expect(pageTitle).to.equal('Selenium with JavaScript - Google Search');
    console.log('Test Passed: Search results page is displayed.');
  } finally {
    await driver.quit();
  }
});
