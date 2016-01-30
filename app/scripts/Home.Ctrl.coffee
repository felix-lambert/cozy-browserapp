HomeAngCtrl = ($injector) ->

    Contact = $injector.get('Contact');
    CozySdk = $injector.get 'CozySdk'
    vm = this

    activate = () ->
        console.log 'activate'
        Contact.all (res) ->
            vm.contacts = res

    send = (user) ->
        console.log 'send'
        Contact.send 'Contact', user, (res) ->
            vm.contacts = res
            activate()

    update = (id, user) ->
        CozySdk.updateAttributes 'Contact', id, user, (res) ->
            vm.contacts = res
            activate()

    destroy = (id) ->
        CozySdk.destroy id, (res) ->
            vm.contacts = res
            activate()

    console.log 'activate'
    activate()
    vm.send = send
    vm.update = update
    vm.destroy = destroy

angular.module('browserapp').controller 'HomeAngCtrl', HomeAngCtrl
HomeAngCtrl.$inject = [
    '$injector'
]