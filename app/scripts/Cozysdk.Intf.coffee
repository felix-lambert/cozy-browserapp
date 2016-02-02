CozySdk = ($rootScope) ->
  
    
    {
        create: (docType, data, callback) ->
            cozysdk.create docType, data, (err, res) ->
                if err?
                    console.log 'maybe do a cozy special error warning'
                else
                    $rootScope.$apply ->
                        callback res

        find: (id, callback) ->
            cozysdk.find id, (err, res) ->
                if err?
                    console.log 'maybe do a cozy special error warning'
                else
                    $rootScope.$apply ->
                        callback res

        exist: (id, callback) ->
            cozysdk.exists id, (err, res) ->
                if err?
                    console.log 'maybe do a cozy special error warning'
                else
                    $rootScope.$apply ->
                        callback res

        update: (id, user, callback) ->
            cozysdk.updateAttributes 'Contact', id, user, (err, res) ->
                if err?
                    console.log 'maybe do a cozy special error warning'
                else
                    $rootScope.$apply ->
                        callback res

        destroy: (id, callback) ->
            cozysdk.destroy id, (err, res) ->
                if err?
                    console.log 'maybe do a cozy special error warning'
                else
                    $$rootScope.$apply ->
                        callback res

        defineRequest: (docType, requestName, defined, callback) ->
            cozysdk.defineRequest docType, requestName, defined, (err, res) ->
                if err?
                    console.log 'maybe do a cozy special error warning'
                else
                    $rootScope.$apply ->
                        callback res

        destroyRequest: (callback) ->
            cozysdk.requestDestroy 'Contact', 'all', {startkey: 'z', endkey: 'z'}, (err, res) ->
                if err?
                    console.log 'maybe do a cozy special error warning'
                else
                    $rootScope.$apply ->
                        callback res

        runRequest: (docType, requestName, callback) ->
            cozysdk.run 'Contact', requestName, {}, (err, res) ->
                if err?
                    console.log 'maybe do a cozy special error warning'
                else
                    console.log res
                    $rootScope.$apply ->
                        callback res

    }

angular.module('browserapp').factory 'CozySdk', CozySdk
CozySdk.$inject = ['$rootScope']

# ---