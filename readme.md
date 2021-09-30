This starter code calls Sensible [extraction APIs](https://docs.sensible.so/reference#extract-data-from-a-document) and returns extracted data from a PDF. You'll need an [API key](https://www.sensible.so/get-early-access).


Run
---
To run the code:
- Create secrets.py file in this directory (`touch secrets.py`) and specify your API_KEY (`API_KEY = "YOUR_API_KEY"`) in the file. Verify that .gitignore lists secrets.py so you don't expose your key publically.
- In constants.py, specify the local path to your PDF and specify the name of the corresponding doc type you created in the [Sensible app](https://app.sensible.so/).
- Run `python extract_doc.py`. 

Run with examples
----

To see example data in a response quickly, run `extract_doc.py` with an example PDF and config:

- Download an example [auto_insurance_quote PDF](https://github.com/sensible-hq/sensible-docs/raw/main/readme-sync/assets/v0/pdfs/auto_insurance_quote.pdf).
- In constants.py, define doc_local_path using the path to the example PDF you downloaded.  
- In the [Sensible app](https://app.sensible.so/), create a doc type.
- In constants.py, define doc_type using the name of the doc type you created.
- In the Sensible app, create a config in the doc type and paste the [example JSON](https://github.com/sensible-hq/sensible-docs/raw/main/readme-sync/assets/v0/json/anyco.json) into the left pane of the config editor.


 
