Contact = ($injector, $q) ->
  
    CozySdk = $injector.get 'CozySdk'
    {
        send: (docType, data) ->
            promise = CozySdk.create docType, data
            return promise

        all: () ->
            CozySdk.defineRequest('Contact', 'all', 'function(doc) { emit(doc.n, null); }').then () ->
                return CozySdk.runRequest 'Contact', 'all'
    }

angular.module('browserapp').factory 'Contact', Contact
Contact.$inject = ['$injector', '$q']

# ---