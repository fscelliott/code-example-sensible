#!/usr/local/bin/python
import requests
import time
import json
from secrets import *

'''
extract structured data from PDFs over 4.5MB or that require over 30 seconds to process
'''

doc_type = "DOC_TYPE_NAME"
doc_url = "https://DOC-URL.pdf"


def extract_from_doc_url():  
  url = "https://api.sensible.so/dev/extract_from_url/{}".format(doc_type)
  payload = json.dumps({"document_url": doc_url})
  headers = {
    'Authorization': 'Bearer {}'.format(API_KEY),  'Content-Type': 'application/json'
  }
  print ("Initiating asyn request to extract from doc at url {}\n".format(doc_url))
  try:
    response  = requests.request("POST", url, headers=headers, data=payload)
    response.raise_for_status()
  except requests.RequestException as err:
    print(response.text)
    raise SystemExit(err)
  extraction_id = response.json()['id']
  return extraction_id
  
def retrieve_extraction(id):
  print('Retrieving extracted data from extraction id {}\n'.format(id))
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
  # to avoid polling, implement a webhook in prod
  time.sleep(5)
  while "parsed_document" not in response.text:
    print(response.json()["status"],"\n")
    response = requests.request("GET", url, headers=headers, data=payload)
    if response.json()["status"]=="FAILED":
      print(json.dumps(response.json(), indent=2))
      exit()
    time.sleep(3)  
  print('EXTRACTED DATA:\n')
  print(json.dumps(response.json(), indent=2))


if __name__ == '__main__':
  extraction_id = extract_from_doc_url()
  retrieve_extraction(extraction_id)
