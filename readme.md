This starter code calls Sensible [extraction APIs](https://docs.sensible.so/reference#extract-data-from-a-document) and returns extracted data from a PDF. You'll need an [API key](https://www.sensible.so/get-early-access).


To see example data in a response immediately, run `extract_doc.py` with an example PDF and config:

- Download an example [auto_insurance_quote PDF](https://github.com/sensible-hq/sensible-docs/raw/main/readme-sync/assets/v0/pdfs/auto_insurance_quote.pdf).
- In constants.py, define doc_local_path using the path to the example PDF you downloaded.  
- In the Sensible app, create a doc type.
- In constants.py, define doc_type using the name of the doc type you created.
- In the Sensible app, create a config in the doc type and paste the [example JSON](https://github.com/sensible-hq/sensible-docs/raw/main/readme-sync/assets/v0/json/anyco.json) into the left pane of the config editor.


 