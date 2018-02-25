const fs = require('fs');
const path = require('path');
const config = require('./config.json');

const bundleStream = fs.createWriteStream(path.join(__dirname, config.outputPath));
bundleStream.write('pragma solidity ^0.4.19;');
config.files.forEach(file => {
    const content = fs
        .readFileSync(path.join(__dirname, file))
        .toString()
        .replace(/pragma solidity \^\d+\.\d+\.\d+;/g, '')
        .replace(/import \".*\";/g, '');

    bundleStream.write(content);
});

console.log('Contracts bundled successfilly! :)');