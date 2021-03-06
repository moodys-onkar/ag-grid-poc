#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

const DATA_PATH = path.resolve(__dirname, "./data.json");

async function generate() {
  const data = require("./generate.js")();
  await new Promise((resolve, reject) => {
    fs.writeFile(DATA_PATH, JSON.stringify(data), (error) => {
      if (error) {
        reject(error);
        return;
      }
      resolve();
    });
  });
}

module.exports = generate;

if (require.main === module) {
  function main() {
    generate().then(() => process.exit(0));
  }

  main();
}
