#!/usr/bin/ruby 
# frozen_string_literal: true

# TODO: delete require_relative?
require_relative "ruby_example/version"
require "faraday"
require 'json'

#module RubyExample
  #class Error < StandardError; end


# TODO: delete test vars on publish
# specify your variable values here 
Doc_type = "auto_insurance_quote"
Doc_local_path = "../../TODELETE_auto_insurance_anyco.pdf"
# TODO: on publish, specify API key inline here instead + delete test vars
# var API_KEY = "YOUR_API_KEY"
API_KEY = ENV['API_KEY']

def self.extract_from_local_doc()


  begin 
    pdf_bytes = IO.binread(Doc_local_path)
  rescue IOError => e
    fail(e)
  end 

  url = URI("https://api.sensible.so/dev/extract/#{Doc_type}")

  response = Faraday.post(url) do |req|
    req.headers['Content-Type'] = 'application/pdf'
    req.body = pdf_bytes
    req.headers["Authorization"] = "Bearer #{API_KEY}"
  end 
  if !response.success?
    abort "The request failed: #{response.status} #{response.reason_phrase}"
  end  

  # TODO: is it a style problem that I don't tell Farady to expect response.body to be JSON?
  puts "EXTRACTED DATA"
  response_json = JSON.parse(response.body)
  puts JSON.pretty_generate(response_json)
  

end

#end  


if __FILE__ == $PROGRAM_NAME
  size_Mb = File.size(Doc_local_path)/(1024*1024)
  puts size_Mb
  if size_Mb < 4.5
    extract_from_local_doc()
  end
end