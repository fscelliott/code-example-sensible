This starter code calls Sensible [extraction APIs](https://docs.sensible.so/reference#extract-data-from-a-document) and returns extracted data from a PDF. You'll need an [API key](https://www.sensible.so/get-early-access).


Run
---
To run the code:

- Clone this repo
- Open a command promt at this cloned directory:
  - npm `install --save node-fetch` # TODO: isometric-fetch
  - run `touch secrets.js`
  - add your API_KEY to the secrets file:
  ```
  const API_KEY = "YOUR_API_KEY"
  exports.API_KEY = API_KEY
  ```

  - Verify that .gitignore lists the secrets file so you don't expose your key publically.
- In extract-doc.js, specify your variable values for:
  - the local path to your PDF.
  - the name of the corresponding doc type you created in the [Sensible app](https://app.sensible.so/).
- Run `node extract-docs.js`. 

Run with examples
----

To see example data in a response quickly, run `extract-doc.js` with an example PDF and config:

- Clone this directory and add your API key to secrets.py (see previous steps).
- Download an example [auto_insurance_quote PDF](https://github.com/sensible-hq/sensible-docs/raw/main/readme-sync/assets/v0/pdfs/auto_insurance_quote.pdf).
- In extract_doc.py, define `doc_local_path` using the path to the example PDF you downloaded.  
- In the [Sensible app](https://app.sensible.so/), create and name a doc type (for example, `test_auto_insurance_quote`).
- In extract_doc.py, define `doc_type` using the name of the doc type you created.
- In the Sensible app, create a config in the doc type (for example, named `anyco`), and paste the [example JSON](https://github.com/sensible-hq/sensible-docs/raw/main/readme-sync/assets/v0/json/anyco.json) into the left pane of the config editor.
- Run `python extract_doc.py`. 


 
