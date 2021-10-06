This starter code calls Sensible [extraction APIs](https://docs.sensible.so/reference#extract-data-from-a-document) and returns extracted data from a PDF. You'll need an [API key](https://www.sensible.so/get-early-access).


Run
---
To run the code:

# TODO: verify no need to run gem install json
- Clone this repo
- Open a command promt at this cloned directory:
  - run `gem install faraday`
  - add your API_KEY (`API_KEY = "YOUR_API_KEY"`) to `extract_doc.rb` (remember to secure this key before committing any of this code).
- In extract_doc.rb, specify your values for:
  - the local path to your PDF.
  - the name of the corresponding doc type you created in the [Sensible app](https://app.sensible.so/).
- Run `ruby ./lib/extract_doc.rb`. 

Run with examples
----


To see example data in a response quickly, run `extract_doc.rb` with an example PDF and config:

- Clone this directory and add your API key
- Download an example [auto_insurance_quote PDF](https://github.com/sensible-hq/sensible-docs/raw/main/readme-sync/assets/v0/pdfs/auto_insurance_quote.pdf).
- In extract_doc.rb, specify your value for the path to the example PDF you downloaded.  
- In the [Sensible app](https://app.sensible.so/), create and name a doc type (for example, `test_auto_insurance_quote`).
- In extract_doc.rb, specify your value for the name of the corresponding doc type you created.
- In the Sensible app, create a config in the doc type (for example, named `anyco`), and paste the [example JSON](https://github.com/sensible-hq/sensible-docs/raw/main/readme-sync/assets/v0/json/anyco.json) into the left pane of the config editor.
- Run `ruby ./lib/extract_doc.rb`. 


 
