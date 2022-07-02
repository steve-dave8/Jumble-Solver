var fs = require('fs');
var path = require('path')
const checkWord = require('check-word');

// make sure the same language is used in content and words
const content = fs.readFileSync(path.join(__dirname, '..', 'node_modules', 'check-word', 'words', 'en.txt'), 'utf8');
const words = checkWord('en', content);

module.exports = words