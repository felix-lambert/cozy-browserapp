HomeAngCtrl = ($injector, $scope) ->

    Contact = $injector.get('Contact');
    CozySdk = $injector.get 'CozySdk'

    activate = () ->
        promise = Contact.all()
        promise.then (res) ->
            $scope.contacts = res[1]

    send = (user) ->
        promise = Contact.send 'Contact', user
        promise.then (res) ->
            $scope.contacts = res
            activate()

    update = (id, user) ->
        contactName = n: user.key
        CozySdk.update 'Contact', id, contactName
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
]