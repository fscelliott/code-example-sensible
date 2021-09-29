Run extract_doc.py for all PDFs under 4.5 MB in size.
Run async_extract_doc.py for PDFs greater than 4.5 MB.

To run this code with examples:

- In the Sensible app, create a doc type, then specify its name in doc_type
- create a config in the doc type by pasting in the JSON from:  https://github.com/sensible-hq/sensible-docs/raw/main/readme-sync/assets/v0/json/anyco.json
- for SYNC: download the example [auto_insurance_quote PDF](https://github.com/sensible-hq/sensible-docs/raw/main/readme-sync/assets/v0/pdfs/auto_insurance_quote.pdf),
  and define doc_local_path using the path to the downloaded PDF 
- for ASYNC: document_url = "https://github.com/sensible-hq/sensible-docs/raw/main/readme-sync/assets/v0/pdfs/auto_insurance_quote.pdf"  
