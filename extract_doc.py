#!/usr/local/bin/python
import requests
import time
import json
import sys
from constants import *
from secrets import *
import base64

'''
extract structured data from PDFs under 4.5MB or that require under 30 seconds to process
'''

def extract_from_local_doc():  
  print(doc_local_path)
  try:
    with open(doc_local_path, 'rb') as pdf_file:
      pdf_bytes = pdf_file.read()
      pdf_file.close()
  except IOError as err:
    raise SystemExit(err)
  url = "https://api.sensible.so/dev/extract/{}".format(doc_type)
  payload = pdf_bytes
  headers = {
  'Authorization': 'Bearer {}'.format(API_KEY),
  'Content-Type': 'application/pdf'
}

  try:
    response  = requests.request("POST", url, headers=headers, data=payload)
    response.raise_for_status()
  except requests.RequestException as err:
    print(response.text)
    raise SystemExit(err)
  print(json.dumps(response.json(), indent=2))
if __name__ == '__main__':
  extract_from_local_doc()