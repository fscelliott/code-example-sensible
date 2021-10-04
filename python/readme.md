This starter code calls Sensible [extraction APIs](https://docs.sensible.so/reference#extract-data-from-a-document) and returns extracted data from a PDF. You'll need an [API key](https://www.sensible.so/get-early-access).


Run
---
To run the code:

- Clone this repo
- Open a command promt at this cloned directory:
  - run `touch secrets.py`
  - add your API_KEY (`API_KEY = "YOUR_API_KEY"`) to the secrets file. 
  - Verify that .gitignore lists secrets.py so you don't expose your key publically.
- In extract_doc.py, specify your variable values for:
  - the local path to your PDF.
  - the name of the corresponding doc type you created in the [Sensible app](https://app.sensible.so/).
- Run `python extract_doc.py`. 

Run with examples
----


To see example data in a response quickly, run `extract_doc.py` with an example PDF and config:

- Clone this directory and add your API key to the secrets file (see previous steps).
- Download an example [auto_insurance_quote PDF](https://github.com/sensible-hq/sensible-docs/raw/main/readme-sync/assets/v0/pdfs/auto_insurance_quote.pdf).
- In extract_doc.py, specify your variable value for the path to the example PDF you downloaded.  
- In the [Sensible app](https://app.sensible.so/), create and name a doc type (for example, `test_auto_insurance_quote`).
- In extract_doc.py, specify your variable value for the name of the corresponding doc type you created.
- In the Sensible app, create a config in the doc type (for example, named `anyco`), and paste the [example JSON](https://github.com/sensible-hq/sensible-docs/raw/main/readme-sync/assets/v0/json/anyco.json) into the left pane of the config editor.
- Run `python extract_doc.py`. 


 
