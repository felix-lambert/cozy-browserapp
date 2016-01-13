# Public: the model class
class Model

  # STATIC FUNCTIONS
  # Private: get the Model's docType
  #
  # Returns {String} the model docType
  @getDocType: -> this.docType?.toLowerCase() or this.name.toLowerCase()

  # Public: find a model by its Id (GET)
  #
  # id - {String}, id of the model we are looking for
  # callback - Function({Error} err, Model result)
  #
  # Returns null
  @find: (id, callback) ->
    @adapter.find id, (err, attributes) =>
      if err
        return callback err
      else if attributes?.docType?.toLowerCase() isnt @getDocType()
        return callback null, null

      else
        return callback null, new this(attributes)

  # Public: create a new instance of this model (POST)
  #
  # data - Object, arguments for the new model
  # callback - Function({Error} err, {Model} created)
  #
  # Returns null
  @create: (data, callback) ->
    data.docType = @getDocType()
    data = @cast data
    @adapter.create data, (err, attributes) =>
      return callback err if err
      data[k] = v for k,v of attributes
      callback null, new (this)(data)

  # Public: cast a POJO using this model schema
  #
  # attributes - {Object} to cast
  # target - optional {Object} that will be filled with cast properties
  #
  # Returns {Object} target
  @cast: (attributes, target = {}) ->
    castObject attributes, @schema, target, @name

      # REQUESTS FUNCTION


  # Public: Define a map/reduce request for this model
  #
  # name - {String}, name of the request
  # request - a single {Function} (map only) *OR* an object with properties
  #        :map - {Function}
  #        :reduce -  {Function}
  # callback - Function({Error} err)
  #
  # Returns null
  @defineRequest: (name, request, callback) ->

    if typeof(request) is "function" or typeof(request) is 'string'
      map = request
    else
      map = request.map
      reduce = request.reduce

    @requestsAdapter.define.call this, name, {map, reduce}, callback

  # instance methods

  # Public: constructor
  #
  # attributes - Object, attributes of the model
  #
  # Returns a {Model} instance
  constructor: (attributes) ->
    attributes ?= {}
    @constructor.cast attributes, this
    @id ?= attributes._id if attributes._id


    # Public: getAttributes
    #
    # Returns this model attributes as a POJO
    #
    # Returns Object
    getAttributes: ->
      out = {}
      for own key, value of this
        out[key] = value
      return out

  toJSON: -> @getAttributes()
  toObject: -> @getAttributes()
  toString: -> @constructor.getDocType() + JSON.stringify @toJSON()

module.exports = Model
{castObject} = require './utils/type_checking'