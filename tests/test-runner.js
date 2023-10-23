// const glob = require('glob');
// const Mocha = require('mocha');
// const path = require('path');
// const DriverFactory = require('../config/driverFactory');
// const { describe, it, before, afterEach } = require("mocha");

// // Create a new Mocha instance
// const mocha = new Mocha();

// // Get the path to the 'tests' folder (the parent directory of the script)
// const testsFolderPath = __dirname;

// // Use glob to find all test files within the 'tests' folder with the pattern '*.test.js'
// const testFiles = glob.sync('*.test.js', { cwd: testsFolderPath });

// const context = {};

// // Add each test file to Mocha's suite
// testFiles.forEach(file => {
//   mocha.addFile(path.join(testsFolderPath, file));
// });

// before(async function () {
//   // Set up the driver before running tests
//   context.driver = await DriverFactory.getDriver('chrome');
// });

// afterEach(async function () {
//   // Close the browser after each test case
//   await context.driver.quit();
// });

// // Run the tests
// mocha.run(failures => {
//   process.on('exit', () => {
//     process.exit(failures); // exit with a non-zero status if there were failures
//   });
// });
