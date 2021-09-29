#!/usr/local/bin/python
import requests
import time
import json
import os
from constants import *
from secrets import *
from _async_extract_doc import *

'''
extract structured data from PDFs
'''

def extract_from_local_doc():  
  print("extracting from doc: ", doc_local_path)
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
  print('EXTRACTED DATA:\n')  
  print(json.dumps(response.json(), indent=2))
if __name__ == '__main__':
  size_mb= os.path.getsize(doc_local_path)/(1024*1024)
  if size_mb >= 4.5:
    Print("PDF greater than 4.5 MB; attempting async extraction")
    extraction_id = extract_from_doc_url()
    retrieve_extraction(extraction_id)
  else:
    extract_from_local_doc()