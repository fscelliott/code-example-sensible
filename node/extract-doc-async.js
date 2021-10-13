#!/usr/bin/env node

// This script performs an asynchronous extraction of the supplied PDF. See
// https://docs.sensible.so/docs/api-tutorial-async-1 for more details

const fs = require("fs");
const fetch = require("isomorphic-fetch");

// The name of a document type in Sensible, e.g., auto_insurance_quote
const DOCUMENT_TYPE = "YOUR_DOCUMENT_TYPE";

// The URL of the PDF you'd like to parse
const DOCUMENT_URL = "YOUR_PDF_URL";

// Your Sensible API key
const API_KEY = "YOUR_API_KEY";

async function main() {
  const headers = new Headers();
  headers.append("Authorization", `Bearer ${API_KEY}`);
  headers.append("Content-Type", "application/json");

  const body = JSON.stringify({
    document_url: DOCUMENT_URL,
  });

  const response = await fetch(
    `https://api.sensible.so/v0/extract_from_url/${DOCUMENT_TYPE}`,
    {
      method: "POST",
      headers,
      body,
    }
  );

  if (!response.ok) {
    console.log(await response.text());
  } else {
    // This is the ID we'll poll to retrieve the extraction
    // In production you'd use a webhook to avoid polling
    const { id } = await response.json();
    let json = {};
    let pollCount = 0;

    while (!json.parsed_document) {
      // Wait a few seconds for the extraction to complete on each iteration
      await new Promise((r) => setTimeout(r, 3000));

      // TODO: Replace dev with v0
      const documentResponse = await fetch(
        `https://api.sensible.so/v0/documents/${id}`,
        { headers }
      );

      if (!response.ok) {
        console.log(await documentResponse.text());
        break;
      } else {
        json = await documentResponse.json();

        console.log(`Poll attempt ${++pollCount} status: ${json.status}`);

        if (json.status === "FAILED") {
          break;
        }
      }
    }

    console.log(JSON.stringify(json, null, 2));
  }
}

main();
