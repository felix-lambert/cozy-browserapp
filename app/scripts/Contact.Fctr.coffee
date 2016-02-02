Contact = ($injector, $q) ->
  
    CozySdk = $injector.get 'CozySdk'
    {
        send: (docType, data) ->
            promise = CozySdk.create docType, data
            return promise

        all: () ->
            promise = CozySdk.defineRequest('Contact', 'all', 'function(doc) { emit(doc.n, null); }').then () ->
            promise.then () ->
                CozySdk.runRequest 'Contact', 'all'
            return promise
    }

angular.module('browserapp').factory 'Contact', Contact
Contact.$inject = ['$injector', '$q']

# ---