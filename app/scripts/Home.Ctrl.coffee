HomeAngCtrl = ($injector, $scope, preGetContacts) ->

    Contact = $injector.get 'Contact'
    CozySdk = $injector.get 'CozySdk'

    res = preGetContacts
    console.log res
    $scope.contacts = res

    updateContactList = () ->
        promise = Contact.all()
        promise.then ((result) ->
            # handle success
            $scope.contacts = result
        ), (error) ->
            # handle error, exactly as if this was a separate catch in the chain.
            $scope.error = error

    send = (user) ->
        defaultForm =
            n : ""
        promise = Contact.send 'Contact', user
        promise.then ((res) ->
            updateContactList()
            $scope.contact = defaultForm
            $scope.form.$setPristine()
        ), (error) ->
            $scope.error = error

    update = (id, user) ->
        contactName = n: user.key
        promise = CozySdk.update 'Contact', id, contactName
        promise.then ((res) ->
            updateContactList()
        ), (error) ->
            $scope.error = error

    destroy = (id) ->
        promise = CozySdk.destroy id
        promise.then ((res) ->
            updateContactList()
        ), (error) ->
            $scope.error = error

    $scope.send = send
    $scope.update = update
    $scope.destroy = destroy

angular.module('browserapp').controller 'HomeAngCtrl', HomeAngCtrl
HomeAngCtrl.$inject = [
    '$injector'
    '$scope'
    'preGetContacts'
]