# frozen_string_literal: true

require_relative "ruby_example/version"
# require "http"
require "uri" # todo delete these
require "net/http"
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


pdf_bytes = IO.binread(doc_local_path)


url = URI("https://api.sensible.so/dev/extract/#{doc_type}")

https = Net::HTTP.new(url.host, url.port)
https.use_ssl = true

request = Net::HTTP::Post.new(url)
request["Authorization"] = "Bearer #{API_KEY}"
request["Content-Type"] = "application/pdf"
request.body = pdf_bytes

response = https.request(request)
puts response.read_body

end
