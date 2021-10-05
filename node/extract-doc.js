#!/usr/bin/env node

var fetch = require('isomorphic-fetch');
var fs = require('fs');
var {
    API_KEY
} = require('./secrets.js');

// TODO: delete test vars on publish

// specify your variable values here  
var docType = "auto_insurance_quote"
var docLocalPath = "../TODELETE_auto_insurance_anyco.pdf"
//var docUrl = "https://github.com/sensible-hq/sensible-docs/raw/main/readme-sync/assets/v0/pdfs/auto_insurance_anyco.pdf"


var extractFromLocalFile = function() {

    try {
        var pdfBytes = fs.readFileSync(docLocalPath);
    } catch (e) {
        console.log('Error:', e.stack);
    }


    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${API_KEY}`);
    myHeaders.append("Content-Type", "application/pdf");

    var file = pdfBytes;

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

}

if (require.main === module) {
    var sizeMb;

    try {
        const stats = fs.statSync(docLocalPath);
        sizeMb = stats.size / (1024 * 1024)
    } catch (err) {
        console.error(err)
    }


    console.log(sizeMb)
    if (sizeMb < 4.5) {
        extractFromLocalFile();
    } else {
        console.log("PDF greater than 4.5 MB. Run _async_extract-doc instead and define docUrl")

    }
}