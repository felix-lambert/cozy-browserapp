Model = require './model'

pouchdbDataAdapter =
  find: (id, callback) ->
    id = id + '' # cast to string
    PouchdbBackedModel.db.get id, (err, doc) ->
      if err
        callback err
      else if not doc?
        callback null, null
      else
        callback null, doc

create: (attributes, callback) ->
  if attributes.id? or attributes._id?
    attributes.id = attributes._id unless attributes.id
    attributes._id = attributes.id unless attributes._id
    func = 'put'
  else
    attributes._id = attributes.id = uuid.v4().split('-').join('')
    func = 'post'

  PouchdbBackedModel.db[func] attributes, (err, response) ->
    if err
      callback err
    else if not response.ok
      callback new Error 'An error occured while creating document.'
    else
      callback null, {id: response.id}

# Public: a model backed by the pouchdb data-system
#    expose the complete {Model} interface
module.exports = class PouchdbBackedModel extends Model
  @adapter         : pouchdbDataAdapter

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