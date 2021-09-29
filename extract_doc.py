#!/usr/local/bin/python
import requests
import time
import json
import sys
from constants import *
from secrets import *
import base64

'''
extract structured data from the example PDF specified in constants.py
'''

def extract_from_local_doc():  
  print(doc_local_path)
  with open(doc_local_path, 'rb') as pdf_file:
    encoded_string = base64.b64encode(pdf_file.read())
    print(encoded_string)
    pdf_file.close()
  url = "https://api.sensible.so/dev/extract/{}".format(doc_type)
  payload= encoded_string
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