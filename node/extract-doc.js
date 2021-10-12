#!/usr/bin/env node

// This script performs a synchronous extraction of the supplied PDF and is limited to
// PDFs of ~4.5MB or less with an extraction runtime under 30s (extractions rarely take
// longer than 30s unless they require OCR). See https://docs.sensible.so/docs/api-tutorial-sync
// for more details

const fs = require("fs");
const fetch = require("isomorphic-fetch");

// The name of a document type in Sensible, e.g., auto_insurance_quote
const DOCUMENT_TYPE = "YOUR_DOCUMENT_TYPE";

// The path to the PDF you'd like to parse
// If the PDF is over ~4.5MB use the async-extract-doc.js script
const DOCUMENT_PATH = "YOUR_PDF.pdf";

// Your Sensible API key
const API_KEY = "YOUR_API_KEY";

async function main() {
  const headers = new Headers();
  headers.append("Authorization", `Bearer ${API_KEY}`);
  headers.append("Content-Type", "application/pdf");

  const body = fs.readFileSync(DOCUMENT_PATH);

  // TODO: Replace dev with v0
  const response = await fetch(
    `https://api.sensible.so/dev/extract/${DOCUMENT_TYPE}`,
    {
      method: "POST",
      headers,
      body,
    }
  );

  if (!response.ok) {
    console.log(await response.text());
  } else {
    console.log(JSON.stringify(await response.json(), null, 2));
  }
}

main();
