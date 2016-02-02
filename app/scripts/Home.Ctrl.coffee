HomeAngCtrl = ($injector, $scope) ->

    Contact = $injector.get('Contact');
    CozySdk = $injector.get 'CozySdk'

    activate = () ->
        console.log 'activate'
        Contact.all (res) ->
            $scope.contacts = res

    send = (user) ->
        console.log 'send'
        Contact.send 'Contact', user, (res) ->
            $scope.contacts = res
            activate()

    update = (id, user) ->
        CozySdk.updateAttributes 'Contact', id, user, (res) ->
            $scope.contacts = res
            activate()

    destroy = (id) ->
        console.log 'destroy'
        console.log id
        CozySdk.destroy id, (res) ->
            $scope.contacts = res
            activate()

    updateChange = (id) ->
        $scope.update = true
        $scope.updateId = id

    console.log 'activate'
    activate()
    $scope.send = send
    $scope.update = update
    $scope.destroy = destroy
    $scope.updateChange = updateChange

angular.module('browserapp').controller 'HomeAngCtrl', HomeAngCtrl
HomeAngCtrl.$inject = [
    '$injector'
    '$scope'
]