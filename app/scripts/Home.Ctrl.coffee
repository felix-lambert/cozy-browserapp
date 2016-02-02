HomeAngCtrl = ($injector, $scope) ->

    Contact = $injector.get('Contact');
    CozySdk = $injector.get 'CozySdk'

    activate = () ->
        console.log 'activate'
        Contact.all().then (res) ->
            console.log res
            $scope.contacts = res

    send = (user) ->
        console.log 'send'
        Contact.send('Contact', user).then (res) ->
            $scope.contacts = res
            activate()

    update = (id, user) ->
        console.log user
        contactName = n: user.key
        console.log contactName
        CozySdk.update('Contact', id, contactName).then (res) ->
            $scope.contacts = res
            activate()

    destroy = (id) ->
        console.log 'destroy'
        console.log id
        CozySdk.destroy(id).then (res) ->
            $scope.contacts = res
            activate()

    console.log 'activate'
    activate()
    $scope.send = send
    $scope.update = update
    $scope.destroy = destroy

angular.module('browserapp').controller 'HomeAngCtrl', HomeAngCtrl
HomeAngCtrl.$inject = [
    '$injector'
    '$scope'
]