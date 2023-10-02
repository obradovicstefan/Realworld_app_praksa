// jest.config.js
module.exports = {
  // ... other Jest configuration options

  // Add reporters option to generate HTML report
  reporters: [
    "default",
    ["jest-html-reporters", {
      publicPath: "./html-report", // Output directory for HTML report
      filename: "report.html",    // HTML report filename
      expand: true
    }]
  ]
};
