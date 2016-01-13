client = require './utils/client'
Model = require './model'

cozyDataAdapter =
  find: (id, callback) ->
    client.get "data/#{id}/", (error, response, body) ->
      if error
        callback error
      else if response.statusCode is 404
        callback null, null
      else
        callback null, body

    create: (attributes, callback) ->
      path = "data/"
      if attributes.id?
        path += "#{attributes.id}/"
        delete attributes.id
        return callback new Error 'cant create an object with a set id'

      client.post path, attributes, (error, response, body) ->
        if error
          callback error
        else if response.statusCode is 409
          callback new Error "This document already exists"
        else if response.statusCode isnt 201
          callback new Error "Server error occured."
        else
          body.id = body._id
          callback null, body

# Public: a model backed by the cozy data-system
#    expose the complete {Model} interface
module.exports = class CozyBackedModel extends Model
  @adapter         : cozyDataAdapter


  @cast: ->
    unless @__addedToSchema
      @__addedToSchema = true
      @schema._id = String
      @schema._attachments = Object
      @schema._rev = String
      @schema.id = String
      @schema.docType = String
      @schema.binaries = Object
    super

  