var request = require('request');
import { docLocalPath, docType } from './constants.js';
import { API_KEY } from './secrets.js';

var options = {
  'method': 'POST',
  'url': `https://api.sensible.so/dev/extract/${docType}`,
  'headers': {
    'Authorization': `Bearer ${API_KEY}`,
    'Content-Type': 'application/pdf'
  },
  body: "<file contents here>"

};
request(options, function (error, response) {
  if (error) throw new Error(error);
  console.log(response.body);
});