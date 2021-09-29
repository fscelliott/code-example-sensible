#!/usr/local/bin/python
import json

# test constants:
doc_type = "auto_insurance_quote_api"
config_name = "anyco"
document_url = "https://github.com/sensible-hq/sensible-docs/raw/main/readme-sync/assets/v0/pdfs/auto_insurance_anyco.pdf"
doc_local_path = "auto_insurance_anyco.pdf"
# constatns to publish:
'''
doc_type = "DOC_TYPE_NAME"
config_name = "CONFIG_NAME"
doc_local_path = "PDF/PATH.pdf"
document_url = "https://DOC_URL.pdf"
'''

'''
to test with examples:
- In the Sensible app, create a doc type, then specify its name in doc_type
- create a config in the doc type by pasting in the JSON from:  https://github.com/sensible-hq/sensible-docs/raw/main/readme-sync/assets/v0/json/anyco.json
- for ASYNC: document_url = "https://github.com/sensible-hq/sensible-docs/raw/main/readme-sync/assets/v0/pdfs/auto_insurance_quote.pdf"
- for SYNC: download the example [auto_insurance_quote PDF](https://github.com/sensible-hq/sensible-docs/raw/main/readme-sync/assets/v0/pdfs/auto_insurance_quote.pdf),
  and define doc_local_path using the path to the downloaded PDF 
'''