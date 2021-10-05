#!/usr/bin/env node

var fetch = require('isomorphic-fetch');
var { API_KEY } = require('./secrets.js');

// TODO: on publish, replace all /dev/ with /v0/

// specify your variable values here  
var docType = "auto_insurance_quote"
var docUrl = "https://github.com/sensible-hq/sensible-docs/raw/main/readme-sync/assets/v0/pdfs/auto_insurance_anyco.pd"


var extractFromDocUrl = async function() {
    console.log(`Initiating asyn request to extract from doc at url ${docUrl}`)
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
    let response = await fetch(`https://api.sensible.so/dev/extract_from_url/${docType}`, requestOptions);
    if (!response.ok){
      throw Error(response.statusText);
    };
    let responseJson = await response.json();
    let extractionId = responseJson["id"];
    return extractionId
  }

  var retrieveExtraction = async function(id) {
    // wait a few seconds for the extraction to complete before attempting to retrieve it
    await new Promise(r => setTimeout(r, 3000));
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${API_KEY}`);
    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };
    console.log(`Retrieving extracted data from extraction id ${id}`);
    let response = await fetch(`https://api.sensible.so/dev/documents/${id}`, requestOptions);
    if (!response.ok){
      throw Error(response.statusText);
    };
    let responseJson = await response.json();

    // to avoid polling in prod for the completed extraction, implement a webhook instead 
    while (responseJson["parsed_document"] == null) {
        console.log(responseJson["status"], "\n");
        response = await fetch(`https://api.sensible.so/dev/documents/${id}`, requestOptions);
        if (!response.ok){
          throw Error(response.statusText);
        };
        responseJson = await response.json();
        if (responseJson["status"] == "FAILED") {
          console.log(JSON.stringify(responseJson, null, 2));
          throw "The extraction failed";
        }
        await new Promise(r => setTimeout(r, 3000));
      }
    console.log("EXTRACTED DATA:");
    console.log(JSON.stringify(responseJson, null, 2));
}

async function main()  {
    let extractionId = await extractFromDocUrl();
    retrieveExtraction(extractionId);
}

if (require.main === module) { 
  main();
}