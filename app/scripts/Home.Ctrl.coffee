HomeAngCtrl = ($injector, $scope) ->

    Contact = $injector.get('Contact');
    CozySdk = $injector.get 'CozySdk'
    vm = this

    activate = () ->
        promise = Contact.all()
        promise.then (res) ->
            vm.contacts = res[1]

    send = (user) ->
        promise = Contact.send 'Contact', user
        promise.then (res) ->
            vm.contacts = res
            activate()

    update = (id, user) ->
        contactName = n: user.key
        promise = CozySdk.update 'Contact', id, contactName
        promise.then (res) ->
            vm.contacts = res
            activate()

    destroy = (id) ->
        promise = CozySdk.destroy id
        promise.then (res) ->
            vm.contacts = res
            activate()

    activate()
    vm.send = send
    vm.update = update
    vm.destroy = destroy

angular.module('browserapp').controller 'HomeAngCtrl', HomeAngCtrl
HomeAngCtrl.$inject = [
    '$injector'
    '$scope'
]