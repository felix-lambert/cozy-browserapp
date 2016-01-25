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
            callback null, JSON.parse body

module.exports.find = (id, callback) ->
    client.get "data/#{id}/", null, (error, body, response) ->
        if error
            callback error
        else if response.status is 404
            callback null, null, null
        else
            callback null, body

module.exports.exists = (id, callback) ->
    client.get "data/exist/#{id}/", null, (error, body, response) ->
        if error
            callback error
        else if not body? or not body.exist?
            callback new Error "Data system returned invalid data."
        else
            callback null, body.exist

module.exports.updateAttributes = (docType, id, attributes, callback) ->
    console.log 'updateAttributes'
    attributes.docType = docType
    client.put "data/merge/#{id}/", attributes, (error, body, response) ->
        if error
            callback error
        else if response.status is 404
            callback new Error "Document #{id} not found"
        else if response.status isnt 200
            callback new Error "Server error occured."
        else
            callback null, JSON.parse body

module.exports.destroy = (id, callback) ->
    client.del "data/#{id}/", null, (error, body, response) ->
        console.log response
        if error
            callback error
        else if response.status is 404
            callback new Error "Document #{id} not found"
        else if response.status isnt 204
            callback new Error "Server error occured."
        else
            callback null