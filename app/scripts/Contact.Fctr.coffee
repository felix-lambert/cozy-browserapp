Contact = ($injector) ->
  
    CozySdk = $injector.get 'CozySdk'

    
    {

        send: (docType, data, callback) ->
            console.log 'send'
            CozySdk.create docType, data, (res) ->
                CozySdk.find res._id, (result) ->
                    callback result

        all: (callback) ->
            CozySdk.defineRequest 'Contact', 'all', 'function(doc) { emit(doc.n, null); }', (res) ->
                CozySdk.runRequest 'Contact', 'all', (result) ->
                    callback result
    }

angular.module('browserapp').factory 'Contact', Contact
Contact.$inject = ['$injector']

# ---