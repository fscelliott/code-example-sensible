#!/usr/local/bin/python
import json

doc_type = "auto_insurance_quote_api_test"
config_name = "anyco"
document_url = "https://github.com/sensible-hq/sensible-docs/raw/main/readme-sync/assets/v0/pdfs/auto_insurance_anyco.pdf"
config = json.dumps({
  "fields": [
    {
      "id": "policy_period",
      "anchor": "policy period",
      "method": {
        "id": "label",
        "position": "right"
      }
    },
    {
      "id": "comprehensive_premium",
      "anchor": "comprehensive",
      "type": "currency",
      "method": {
        "id": "row",
        "tiebreaker": "second"
      }
    },
    {
      "id": "property_liability_premium",
      "anchor": "property",
      "type": "currency",
      "method": {
        "id": "row",
        "tiebreaker": "second"
      }
    },
    {
      "id": "policy_number",
      "type": "number",
      "anchor": {
        "match": [
          {
            "text": "policy number",
            "type": "startsWith"
          }
        ]
      },
      "method": {
        "id": "box"
      }
    }
  ]
})