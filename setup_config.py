#!/usr/local/bin/python
import requests
import time
import json
from secrets import *
from constants import *

'''
create the doc type and config required to extract data from the example PDF specified in constants.py
'''

def create_doc_type():
  # get existing doc types  
  url = "https://api.sensible.so/dev/document_types"
  payload = ""
  headers = {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer {}'.format(API_KEY),
  }
  json_response = requests.request("GET", url, headers=headers, data=payload).json() 
  # Create the doc type if it doesn't already exist
  if doc_type not in json.dumps(json_response):
    print('\nCreating doc type\n')
    payload2 = json.dumps({
      "name": doc_type,
      "schema": {
        "ocr_level": 0
      }
    })
    json_response = requests.request("POST", url, headers=headers, data=payload2).json()
    # get updated list of doc types
    json_response = requests.request("GET", url, headers=headers, data=payload).json() 
  else:
    print("\nDoc type {} already exists, skipping creation\n".format(doc_type))
  
  # get the doc type id
  for i in range(len(json_response)):
    if doc_type in json_response[i]["name"]:
      doc_type_id = json_response[i]["id"]
  return (doc_type_id)


def create_config(doc_type_id):
  # get existing configs in doc type
  url = "https://api.sensible.so/dev/document_types/{}/configurations".format(doc_type_id)
  payload = ""
  headers = {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer {}'.format(API_KEY)}
  json_response = requests.request("GET", url, headers=headers, data=payload).json()
  if config_name not in json.dumps(json_response):
    print("Creating config named {}\n".format(config_name))
    payload2 = json.dumps({
      "name": config_name,
      "configuration": config,
      "publish_as": "production"
    })
    response = requests.request("POST", url, headers=headers, data=payload2)
  else:
    # check if user created draft without publishing it, if so, publish to prod env
    for i in range(len(json_response)):
      if config_name in json_response[i]["name"]:
        if not "production" in json.dumps(json_response[i]):
          publish_config(doc_type_id)
        else:
          print(config_name , "Config named {} already exists in prod env, skipping publishing\n".format(config_name))

def publish_config(doc_type_id):
  print("Publishing draft config named {} to prod env\n".format(config_name))
  url = "https://api.sensible.so/dev/document_types/{}/configurations/anyco".format(doc_type_id)
  payload = json.dumps({
    "configuration": config,
    "publish_as": "production"
    })
  headers = {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer {}'.format(API_KEY)
    }
  response = requests.request("PUT", url, headers=headers, data=payload)

if __name__ == '__main__':
  doc_type_id = create_doc_type()
  create_config(doc_type_id)
