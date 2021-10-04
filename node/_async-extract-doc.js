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
        headers: myHeaders2,
        redirect: 'follow'
    };

    let response = await fetch(`https://api.sensible.so/dev/extract_from_url/${docType}`, requestOptions);
    let responseJson = await response.json();
    let extractionId = responseJson["id"];
    console.log("ID");
    console.log(extractionId); // TODO: I think I can now split into 2 functions???
    await new Promise(r => setTimeout(r, 3000));
    let response2 = await fetch(`https://api.sensible.so/dev/documents/${extractionId}`, requestOptions2);
    let responseJson2 = await response2.json();
    console.log("RESPONSE 2");

    // to avoid polling in prod, implement a webhook 
    while (responseJson2["parsed_document"] == null) {
        console.log(responseJson2["status"], "\n");
        response2 = await fetch(`https://api.sensible.so/dev/documents/${extractionId}`, requestOptions2);
        responseJson2 = await response2.json();
        if (responseJson2["status"] == "FAILED") {
            console.log(responseJson2)
            // TODO: exit gracefully?
            exit()


        }
        await new Promise(r => setTimeout(r, 3000));
      }

    console.log(responseJson2);


}


if (require.main === module) {
    //var extractionId = extractFromDocUrl();
    //retrieveExtraction(extractionId);
    extractFromDocUrl();
}