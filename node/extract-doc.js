require('isomorphic-fetch');
import { API_KEY } from './secrets.js';

// specify your variable values here  
var docType = "auto_insurance_quote"
var docLocalPath = "TODELETE_auto_insurance_anyco.pdf"
//var docUrl = "https://github.com/sensible-hq/sensible-docs/raw/main/readme-sync/assets/v0/pdfs/auto_insurance_anyco.pdf"


var myHeaders = new Headers();
myHeaders.append(`Authorization", "Bearer ${API_KEY}`);
myHeaders.append("Content-Type", "application/pdf");

var file = "<file contents here>";

var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: file,
  redirect: 'follow'
};

fetch(`https://api.sensible.so/dev/extract/${docType}`, requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));