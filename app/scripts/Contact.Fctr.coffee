Contact = ($injector, $q) ->
  
    CozySdk = $injector.get 'CozySdk'

    
    {
        send: (docType, data) ->
            promise = CozySdk.create(docType, data).then (res) ->
                return CozySdk.find res._id
            return promise

        all: () ->
            promise = $q.all([
                CozySdk.defineRequest('Contact', 'all', 'function(doc) { emit(doc.n, null); }'),
                CozySdk.runRequest('Contact', 'all')
            ])
            return promise
    }

angular.module('browserapp').factory 'Contact', Contact
Contact.$inject = ['$injector', '$q']

# ---