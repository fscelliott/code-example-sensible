#!/usr/bin/env node

var fetch = require('isomorphic-fetch');
var fs = require('fs');
var { API_KEY } = require('./secrets.js');


// specify your variable values here  
var docType = "auto_insurance_quote"
var docUrl = "https://github.com/sensible-hq/sensible-docs/raw/main/readme-sync/assets/v0/pdfs/auto_insurance_anyco.pdf"


var extractFromDocUrl = function(){


var myHeaders = new Headers();
myHeaders.append("Authorization", `Bearer ${API_KEY}`);
myHeaders.append("Content-Type", "application/json");

var raw = JSON.stringify({
  "document_url": docUrl
});

var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
};

fetch(`https://api.sensible.so/dev/extract_from_url/${docType}`, requestOptions)
  .then(response => response.json())
  .then(data =>

    {
      
      extractionId = data["id"];
  })

  //.then(result => console.log(result))
  .catch(error => console.log('error', error));

}


if (require.main === module){
  extractFromDocUrl();
}