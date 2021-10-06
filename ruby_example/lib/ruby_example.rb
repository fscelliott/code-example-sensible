# frozen_string_literal: true

require_relative "ruby_example/version"
# require "http"
require "uri" # todo delete these
require "net/http"
# require "dotenv"

# Dotenv.load('./.env')

module RubyExample
  class Error < StandardError; end


API_KEY = ENV['API_KEY']
puts "hi here's the key:"
puts API_KEY

url = URI("https://api.sensible.so/dev/extract/auto_insurance_quote")

https = Net::HTTP.new(url.host, url.port)
https.use_ssl = true

request = Net::HTTP::Post.new(url)
request["Authorization"] = "Bearer #{API_KEY}"
request["Content-Type"] = "application/pdf"
request.body = "<file contents here>"

response = https.request(request)
puts response.read_body

end
