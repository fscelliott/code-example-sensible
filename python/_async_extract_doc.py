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
doc_url = "YOUR_PDF_URL"
# Your Sensible API key
API_KEY = ""

def extract_from_doc_url():  
  body = json.dumps({"document_url": doc_url})
  headers = {
    'Authorization': 'Bearer {}'.format(API_KEY),  'Content-Type': 'application/json'
  }
  response  = requests.request("POST", "https://api.sensible.so/dev/extract_from_url/{}".format(doc_type), headers=headers, data=body)
  try:
    response.raise_for_status()
  except requests.RequestException as err:
    print(response.text)
  # This is the ID we'll poll to retrieve the extraction
  # In production you'd use a webhook to avoid polling
  extraction_id = response.json()['id']
  json_response = {}
  poll_count = 0
  while not "parsed_document" in json_response:
    # Wait a few seconds for the extraction to complete on each iteration
    time.sleep(3)
    poll_count +=1
    headers = {
      'Authorization': 'Bearer {}'.format(API_KEY)
    }
    response  = requests.request("GET", "https://api.sensible.so/dev/documents/{}".format(extraction_id), headers=headers)
    try:
      response.raise_for_status()
    except requests.RequestException as err:
      print(response.text)
      break
    json_response = response.json()
    print("Poll attempt: {} status: {}".format(poll_count, json_response["status"]))
    if json_response["status"] == "FAILED":
      break
  print(json.dumps(json_response, indent=2))


if __name__ == '__main__':
  extract_from_doc_url()

