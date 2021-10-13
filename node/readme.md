This starter code calls Sensible [extraction APIs](https://docs.sensible.so/reference#extract-data-from-a-document) and returns extracted data from a PDF. You'll need an [API key](https://www.sensible.so/get-early-access).


Run
---
To run the code:

- Clone this repo
- Open a command prompt at this cloned directory and run `npm install`.
- Open extract-doc.js in a text editor and specify:
  - the local path to your PDF.
  - the name of the PDF's doc type that you created in the [Sensible app](https://app.sensible.so/).
  - your API key. Be sure to secure this key before committing.
- Run `node extract-docs.js`. 

Run with examples
----

To see example data in a response quickly, run `extract-doc.js` with an example PDF and config:

- Clone this directory and add your API key in extract-doc.js. Be sure to secure this key before committing.
- Download an example [auto_insurance_quote PDF](https://github.com/sensible-hq/sensible-docs/raw/main/readme-sync/assets/v0/pdfs/auto_insurance_quote.pdf).
- In extract-doc.js, specify the path to the example PDF you downloaded.  
- In the [Sensible app](https://app.sensible.so/), create and name a doc type (for example, `test_auto_insurance_quote`).
- In extract-doc.js, specify the name of the doc type you created.
- In the Sensible app, create a config in the doc type (for example, named `anyco`), and paste the [example JSON](https://github.com/sensible-hq/sensible-docs/raw/main/readme-sync/assets/v0/json/anyco.json) into the left pane of the config editor. 
- In the Sensible app, publish the config (**Publish** > **Production**). 
- Run `node extract-docs.js`. 


 
