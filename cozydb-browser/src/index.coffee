client = require './utils/client'

module.exports.create = (docType, attributes, callback) ->
    path = "data/"
    attributes.docType = docType
    if attributes.id?
        path += "#{attributes.id}/"
        delete attributes.id
        return callback new Error 'cant create an object with a set id'
    
    client.post path, attributes, (error, body, response) ->
        if error
            callback error
        else
            callback null, body, response

module.exports.find = (id, callback) ->
    client.get "data/#{id}/", null, (error, body, response) ->
        if error
            callback error
        else if response.statusCode is 404
            callback null, null, null
        else
            callback null, body, response