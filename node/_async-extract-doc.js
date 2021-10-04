#!/usr/bin/env node

var fetch = require('isomorphic-fetch');
var fs = require('fs');
var {
    API_KEY
} = require('./secrets.js');


// specify your variable values here  
var docType = "auto_insurance_quote"
var docUrl = "https://github.com/sensible-hq/sensible-docs/raw/main/readme-sync/assets/v0/pdfs/auto_insurance_anyco.pdf"


var extractFromDocUrl = async function() {

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

    var myHeaders2 = new Headers();
    myHeaders2.append("Authorization", `Bearer ${API_KEY}`);
    var requestOptions2 = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };
    
    let response = await fetch(`https://api.sensible.so/dev/extract_from_url/${docType}`, requestOptions);
    let extractionId = await response.json()["id"];
    let response2 = await fetch(`https://api.sensible.so/dev/documents/${extractionId}`, requestOptions)
    let responseJson = await response2.json();
    console.log(responseJson)

  }


if (require.main === module) {
    //var extractionId = extractFromDocUrl();
    //retrieveExtraction(extractionId);
    extractFromDocUrl();
}