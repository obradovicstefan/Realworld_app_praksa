const { Builder } = require("selenium-webdriver");
const firefox = require("selenium-webdriver/firefox");
const edge = require("selenium-webdriver/edge");
const chrome = require("selenium-webdriver/chrome");

class DriverFactory {
  static getDriver(browserName) {
    switch (browserName) {
      case "firefox":
        const firefoxOptions = new firefox.Options();
        return new Builder()
          .forBrowser("firefox")
          .setFirefoxOptions(firefoxOptions)
          .build();

      case "chrome":
        const chromeOptions = new chrome.Options();
        return new Builder()
          .forBrowser("chrome")
          .setChromeOptions(chromeOptions)
          .build();

      case "MicrosoftEdge":
        const EdgeOptions = new edge.Options();
        return new Builder()
          .forBrowser("MicrosoftEdge")
          .setEdgeOptions(EdgeOptions)
          .build();

      default:
        throw new Error("Unsupported browser: " + browserName);
    }
  }
}

module.exports = DriverFactory;