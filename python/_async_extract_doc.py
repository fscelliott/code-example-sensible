#!/usr/local/bin/python

'''
This script performs an asynchronous extraction of the supplied PDF. See
https://docs.sensible.so/docs/api-tutorial-async-1 for more details
'''

import requests
import time
import json

# The name of a document type in Sensible, e.g., auto_insurance_quote
doc_type = "DOC_TYPE_NAME"
# The URL of the PDF you'd like to parse
doc_url = "https://DOC-URL.pdf"
# Your Sensible API key
API_KEY = "YOUR_API_KEY"

def extract_from_doc_url():  
  url = "https://api.sensible.so/dev/extract_from_url/{}".format(doc_type)
  payload = json.dumps({"document_url": doc_url})
  headers = {
    'Authorization': 'Bearer {}'.format(API_KEY),  'Content-Type': 'application/json'
  }
  try:
    response  = requests.request("POST", url, headers=headers, data=payload)
    response.raise_for_status()
  except requests.RequestException as err:
    # TODO: nicer would be to print response.status_code and response.reason, not response.text
    print(response.text)
    raise SystemExit(err)
  extraction_id = response.json()['id']
  return extraction_id

# TODO: replace all /dev/ with /v0/  
def retrieve_extraction(id):
  print('Retrieving extracted data from extraction id {}\n'.format(id))
  # wait a few seconds for the extraction to complete before attempting to retrieve it
  time.sleep(3)
  url = "https://api.sensible.so/dev/documents/{}".format(id)
  payload={}
  headers = {
    'Authorization': 'Bearer {}'.format(API_KEY)
  }
  try:
    response  = requests.request("GET", url, headers=headers, data=payload)
    response.raise_for_status()
  except requests.RequestException as err:
    print(response.text)
    raise SystemExit(err)
  # to avoid polling in prod for the completed extraction, implement a webhook instead 
  while "parsed_document" not in response.text:
    print(response.json()["status"],"\n")
    response = requests.request("GET", url, headers=headers, data=payload)
    if response.json()["status"]=="FAILED":
      print(json.dumps(response.json(), indent=2))
      raise Exception("The extraction failed")
    time.sleep(3)  
  print('EXTRACTED DATA:\n')
  print(json.dumps(response.json(), indent=2))


if __name__ == '__main__':
  extraction_id = extract_from_doc_url()
  retrieve_extraction(extraction_id)
