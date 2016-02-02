CozySdk = ($rootScope, $q) ->
  
    
    {
        create: (docType, data) ->
            deferred = $q.defer()
            cozysdk.create docType, data, (err, res) ->
                if err?
                    console.log 'maybe do a cozy special error warning'
                else
                    deferred.resolve res
            return deferred.promise

        find: (id) ->
            deferred = $q.defer()
            cozysdk.find id, (err, res) ->
                if err?
                    console.log 'maybe do a cozy special error warning'
                else
                    deferred.resolve res
            return deferred.promise

        exist: (id) ->
            deferred = $q.defer()
            cozysdk.exists id, (err, res) ->
                if err?
                    console.log 'maybe do a cozy special error warning'
                else
                    deferred.resolve res
            return deferred.promise

        update: (docType, id, user) ->
            deferred = $q.defer()
            cozysdk.updateAttributes docType, id, user, (err, res) ->
                if err?
                    console.log 'maybe do a cozy special error warning'
                else
                    deferred.resolve res
            return deferred.promise

        destroy: (id) ->
            deferred = $q.defer()
            cozysdk.destroy id, (err, res) ->
                if err?
                    console.log 'maybe do a cozy special error warning'
                    deferred.reject 'oh no an error! try again'
                else
                    deferred.resolve res
            return deferred.promise

        defineRequest: (docType, requestName, defined) ->
            deferred = $q.defer()
            cozysdk.defineRequest docType, requestName, defined, (err, res) ->
                if err?
                    console.log 'maybe do a cozy special error warning'
                    deferred.reject 'oh no an error! try again'
                else
                    deferred.resolve res
            return deferred.promise

        destroyRequest: () ->
            deferred = $q.defer()
            cozysdk.requestDestroy 'Contact', 'all', {startkey: 'z', endkey: 'z'}, (err, res) ->
                if err?
                    console.log 'maybe do a cozy special error warning'
                    deferred.reject 'oh no an error! try again'
                else
                    deferred.resolve res
            return deferred.promise

        runRequest: (docType, requestName) ->
            deferred = $q.defer()
            cozysdk.run docType, requestName, {}, (err, res) ->
                if err?
                    console.log 'maybe do a cozy special error warning'
                    deferred.reject 'oh no an error! try again'
                else
                    res = JSON.parse "#{res}"
                    deferred.resolve res
            return deferred.promise

    }

angular.module('browserapp').factory 'CozySdk', CozySdk
CozySdk.$inject = ['$rootScope', '$q']

# ---