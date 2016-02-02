CozySdk = ($rootScope) ->
  
    
    {
        create: (docType, data, callback) ->
            cozysdk.create docType, data, (err, res) ->
                if err?
                    console.log 'maybe do a cozy special error warning'
                else
                    $rootScope.$apply ->
                        callback res

        find: (id) ->
            cozysdk.find id, (err, res) ->
                if err?
                    console.log 'maybe do a cozy special error warning'
                else
                    $rootScope.$apply ->
                        callback res

        exist: (id) ->
            cozysdk.exists id, (err, res) ->
                if err?
                    console.log 'maybe do a cozy special error warning'
                else
                    $rootScope.$apply ->
                        callback res

        update: (id, user) ->
            cozysdk.updateAttributes 'Contact', id, user, (err, res) ->
                if err?
                    console.log 'maybe do a cozy special error warning'
                else
                    $rootScope.$apply ->
                        callback res

        destroy: (id) ->
            cozysdk.destroy id, (err, res) ->
                if err?
                    console.log 'maybe do a cozy special error warning'
                else
                    $$rootScope.$apply ->
                        callback res

        defineRequest: () ->
            cozysdk.defineRequest 'Contact', 'all', 'function(doc) { emit(doc.n, null); }', (err, res) ->
                if err?
                    console.log 'maybe do a cozy special error warning'
                else
                    $rootScope.$apply ->
                        callback res

        destroyRequest: () ->
            cozysdk.requestDestroy 'Contact', 'all', {startkey: 'z', endkey: 'z'}, (err, res) ->
                if err?
                    console.log 'maybe do a cozy special error warning'
                else
                    $rootScope.$apply ->
                        callback res

        runRequest: () ->
            cozysdk.run 'Contact', 'all', {}, (err, res) ->
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