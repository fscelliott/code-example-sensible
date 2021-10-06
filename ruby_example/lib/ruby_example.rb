# frozen_string_literal: true

require_relative "ruby_example/version"
require "faraday"
require "uri" # todo delete these
require "net/http"
require 'json'
# require "dotenv"

# Dotenv.load('./.env')



module RubyExample
  class Error < StandardError; end

# TODO: delete test vars on publish
# specify your variable values here 
doc_type = "auto_insurance_quote"
doc_local_path = "../../TODELETE_auto_insurance_anyco.pdf"
# TODO: on publish, specify API key inline here instead + delete test vars
# var API_KEY = "YOUR_API_KEY"
API_KEY = ENV['API_KEY']

begin 
  pdf_bytes = IO.binread(doc_local_path)
rescue IOError => e
  fail(e)
end 

url = URI("https://api.sensible.so/dev/extract/#{doc_type}")

response = Faraday.post(url) do |req|
  req.headers['Content-Type'] = 'application/pdf'
  req.body = pdf_bytes
  req.headers["Authorization"] = "Bearer #{API_KEY}"
end

# TODO: is it a style problem that I don't tell Farady to expect response.body to be JSON?
puts("RESPONSE")
puts response.body
response_json = JSON.parse(response.body)
puts response_json["id"]
end
