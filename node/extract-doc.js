require('isomorphic-fetch');
var docType = "auto_insurance_quote"
var docLocalPath = "TODELETE_auto_insurance_anyco.pdf"
//var docUrl = "https://github.com/sensible-hq/sensible-docs/raw/main/readme-sync/assets/v0/pdfs/auto_insurance_anyco.pdf"


var options = {
  'method': 'POST',
  'url': `https://api.sensible.so/dev/extract/${docType}`,
  'headers': {
    'Authorization': `Bearer ${API_KEY}`,
    'Content-Type': 'application/pdf'
  },
  body: "<file contents here>"

};
request(options, function (error, response) {
  if (error) throw new Error(error);
  console.log(response.body);
});