HomeAngCtrl = ($injector) ->

    Contact = $injector.get('Contact');
    CozySdk = $injector.get 'CozySdk'
    vm = this

    activate

    activate = ->
        Contact.all (res) ->
            vm.contacts = res

    send = (user) ->
        console.log 'create contact'
        Contact.send 'Contact', user, (res) ->
            vm.contacts = res
            activate

    update = (id, user) ->
        CozySdk.updateAttributes 'Contact', id, user, (res) ->
            vm.contacts = res
            activate

    destroy = (id) ->
        CozySdk.destroy id, (res) ->
            vm.contacts = res
            activate

    vm.send = send
    vm.update = update
    vm.destroy = destroy

angular.module('browserapp').controller 'HomeAngCtrl', HomeAngCtrl
HomeAngCtrl.$inject = [
    '$injector'
]