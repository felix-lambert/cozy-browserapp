Contact = ($injector, $q) ->
  
    CozySdk = $injector.get 'CozySdk'

    
    {
        send: (docType, data) ->
            deferred = $q.defer()

            promise = CozySdk.create(docType, data).then (res) ->
                return CozySdk.find res._id
            promise.then ((result) ->
                deferred.resolve result
            ), (error) ->
                deferred.reject error


        all: () ->
            deferred = $q.defer()
            $q.all([
                CozySdk.defineRequest('Contact', 'all', 'function(doc) { emit(doc.n, null); }'),
                CozySdk.runRequest('Contact', 'all')
            ]).then ((result) ->
                deferred.resolve result
            ), (error) ->
                deferred.reject error
    }

angular.module('browserapp').factory 'Contact', Contact
Contact.$inject = ['$injector', '$q']

# ---