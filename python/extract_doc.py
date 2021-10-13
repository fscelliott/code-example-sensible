#!/usr/local/bin/python

'''
This script performs a synchronous extraction of the supplied PDF and is limited to
PDFs of ~4.5MB or less with an extraction runtime under 30s (extractions rarely take
longer than 30s unless they require OCR). See https://docs.sensible.so/docs/api-tutorial-sync
for more details
'''

import requests
import json
import os

# The name of a document type in Sensible, e.g., auto_insurance_quote 
doc_type = "auto_insurance_quote" # YOUR_DOCUMENT_TYPE TODO
# The path to the PDF you'd like to parse
doc_local_path = "../TODELETE_auto_insurance_anyco.pdf" # YOUR_PDF.pdf
# Your Sensible API key
API_KEY = "YOUR_API_KEY"

def extract_doc():  
  with open(doc_local_path, 'rb') as pdf_file:
      pdf_bytes = pdf_file.read()
  payload = pdf_bytes
  headers = {
  'Authorization': 'Bearer {}'.format(API_KEY),
  'Content-Type': 'application/pdf'
}
  response = requests.request("POST", "https://api.sensible.so/dev/extract/{}".format(doc_type), headers=headers, data=payload)
  try:
    response.raise_for_status()
  except requests.RequestException as err:
    print(response.text)
  print(json.dumps(response.json(), indent=2))

if __name__ == '__main__':
  extract_doc()
