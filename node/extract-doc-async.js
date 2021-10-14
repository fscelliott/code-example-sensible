#!/usr/bin/env node

// This script asynchronously extracts structured data from the specified PDF.
// For more information, see https://docs.sensible.so/docs/api-tutorial-async-1.

const fs = require("fs");
const fetch = require("isomorphic-fetch");

// The name of a document type in Sensible, e.g., auto_insurance_quote
const DOCUMENT_TYPE = "YOUR_DOC_TYPE";

// The URL of the PDF you'd like to extract from
const DOCUMENT_URL = "YOUR_DOC_URL";

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
    var documentExtraction = await response.json();
    const id = documentExtraction.id;
    let pollCount = 0;

    while (documentExtraction.status == "WAITING") {
      // Wait a few seconds for the extraction to complete on each iteration
      await new Promise((r) => setTimeout(r, 3000));

      const response = await fetch(
        `https://api.sensible.so/v0/documents/${id}`,
        { headers }
      );

      if (!response.ok) {
        console.log(await response.text());
        break;
      } else {
        documentExtraction = await response.json();
        console.log(
          `Poll attempt: ${++pollCount}, status: ${documentExtraction.status}`
        );
      }
    }
  }

  console.log(JSON.stringify(documentExtraction, null, 2));
}