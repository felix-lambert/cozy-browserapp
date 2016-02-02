Contact = ($injector, $q) ->
  
    CozySdk = $injector.get 'CozySdk'
    {
        send: (docType, data) ->
            promise = CozySdk.create docType, data
            return promise

        all: () ->
            CozySdk.defineRequest('Contact', 'all', 'function(doc) { emit(doc.n, null); }').then () ->
                promise = CozySdk.runRequest 'Contact', 'all'
            return promise
    }

angular.module('browserapp').factory 'Contact', Contact
Contact.$inject = ['$injector', '$q']

# ---