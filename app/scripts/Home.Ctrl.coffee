HomeAngCtrl = ($injector, $scope, preGetContacts) ->

    Contact = $injector.get 'Contact'
    CozySdk = $injector.get 'CozySdk'

    res = preGetContacts
    console.log res
    $scope.contacts = res

    updateContactList = () ->
        promise = Contact.all()
        promise.then (res) ->
            $scope.contacts = res

    send = (user) ->
        promise = Contact.send 'Contact', user
        promise.then (res) ->
            updateContactList()

    update = (id, user) ->
        contactName = n: user.key
        promise = CozySdk.update 'Contact', id, contactName
        promise.then (res) ->
            updateContactList()

    destroy = (id) ->
        promise = CozySdk.destroy id
        promise.then (res) ->
            updateContactList()

    $scope.send = send
    $scope.update = update
    $scope.destroy = destroy

angular.module('browserapp').controller 'HomeAngCtrl', HomeAngCtrl
HomeAngCtrl.$inject = [
    '$injector'
    '$scope'
    'preGetContacts'
]