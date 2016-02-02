HomeAngCtrl = ($injector, $scope, preGetContacts) ->

    Contact = $injector.get('Contact');
    CozySdk = $injector.get 'CozySdk'

    activate = () ->
        res = preGetContacts
        $scope.contacts = res

    send = (user) ->
        promise = Contact.send 'Contact', user
        promise.then (res) ->
            $scope.contacts = res
            activate()

    update = (id, user) ->
        contactName = n: user.key
        promise = CozySdk.update 'Contact', id, contactName
        promise.then (res) ->
            $scope.contacts = res
            activate()

    destroy = (id) ->
        promise = CozySdk.destroy id
        promise.then (res) ->
            $scope.contacts = res
            activate()

    activate()
    $scope.send = send
    $scope.update = update
    $scope.destroy = destroy

angular.module('browserapp').controller 'HomeAngCtrl', HomeAngCtrl
HomeAngCtrl.$inject = [
    '$injector'
    '$scope'
    'preGetContacts'
]