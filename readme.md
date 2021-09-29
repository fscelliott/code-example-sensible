This starter code calls Sensible [extraction APIs](https://docs.sensible.so/reference#extract-data-from-a-document) and returns extracted data from a PDF.


To see example data in a response immediately, run extract_doc.py with an example PDF and config:

- In the Sensible app, create a doc type, then define doc_type in constants.py using its name
- In the Sensible app, create a config in the doc type by pasting in the JSON from:  https://github.com/sensible-hq/sensible-docs/raw/main/readme-sync/assets/v0/json/anyco.json
- download the example [auto_insurance_quote PDF](https://github.com/sensible-hq/sensible-docs/raw/main/readme-sync/assets/v0/pdfs/auto_insurance_quote.pdf), and define doc_local_path in constants.py using the path to the downloaded PDF 
 