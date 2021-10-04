#!/usr/bin/env node

var fetch = require('isomorphic-fetch');
var fs = require('fs');
var {
    API_KEY
} = require('./secrets.js');
const {
    SSL_OP_EPHEMERAL_RSA
} = require('constants');
const {
    exit
} = require('process');


// specify your variable values here  
var docType = "auto_insurance_quote"
var docUrl = "https://github.com/sensible-hq/sensible-docs/raw/main/readme-sync/assets/v0/pdfs/auto_insurance_anyco.pdf"


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
    let responseJson = await response.json();
    let extractionId = responseJson["id"];
    return extractionId
  }


  var retrieveExtraction = async function(id) {
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
    let responseJson = await response.json();


    // to avoid polling in prod, implement a webhook 
    while (responseJson["parsed_document"] == null) {
        console.log(responseJson["status"], "\n");
        response = await fetch(`https://api.sensible.so/dev/documents/${id}`, requestOptions);
        responseJson = await response.json();
        if (responseJson["status"] == "FAILED") {
          console.log(JSON.stringify(responseJson, null, 2));
            // TODO: exit gracefully?
            exit()


        }
        await new Promise(r => setTimeout(r, 3000));
      }
    console.log("EXTRACTED DOC:");
    console.log(JSON.stringify(responseJson, null, 2));


}


async function main()  {
    let extractionId = await extractFromDocUrl();
    retrieveExtraction(extractionId);
}

if (require.main === module) { 
  main();
}