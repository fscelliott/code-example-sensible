#!/usr/bin/ruby 
# frozen_string_literal: true

# TODO: delete require_relative?
#require_relative "ruby_example/version"
require "faraday"
require 'json'

# TODO: style problem that I don't use modules & classes & just define some constants?
# TODO: delete test vars on publish
# specify your variable values here 
Doc_type = "auto_insurance_quote"
Doc_url = "https://github.com/sensible-hq/sensible-docs/raw/main/readme-sync/assets/v0/pdfs/auto_insurance_anyco.pdf"
# TODO: on publish, specify API key inline here instead + delete test vars
# var API_KEY = "YOUR_API_KEY"
API_KEY = ENV['API_KEY']


def extract_from_url()
  puts "Initiating asyn request to extract from doc at url #{Doc_url}"

  url = URI("https://api.sensible.so/dev/extract_from_url/#{Doc_type}")
  response = Faraday.post(url) do |req|
    req.headers['Content-Type'] = 'application/json'
    req.body = JSON.dump({"document_url": "#{Doc_url}"})
    req.headers["Authorization"] = "Bearer #{API_KEY}"
  end 
  if !response.success?
    abort "The request failed: #{response.status} #{response.reason_phrase}"
  end  
  # TODO: is it a style problem that I don't tell Farady to expect response.body to be JSON?

  response_json = JSON.parse(response.body)
  extraction_id = response_json["id"] 
  return extraction_id
end

if __FILE__ == $PROGRAM_NAME
  # TODO: clean up error handling so I on check Doc_local_path 1x
  extraction_id = extract_from_url()
end