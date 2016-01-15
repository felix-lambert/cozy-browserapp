HomeAngCtrl = ($scope, $injector, $rootScope, $q) ->
    vm = this

    add = (user) ->
        console.log 'create contact'
        Contact = cozydb.getModel 'Contact',
            fn: String
            n: String
            org: String
            title: String
            department: String
            bday: String
            nickname: String
            url: String
            note: String
        Contact.create user, (err, res) ->
            if err
                alert err
            else
                console.log res
                console.log 'Contact.create'
                Contact.find res._id, (err, res) ->
                    console.log 'Contact.find'
                    $scope.$apply ->
                        vm.contacts = res
        console.log 'END CONTACT'

    vm.add = add

angular.module('browserapp').controller 'HomeAngCtrl', HomeAngCtrl
HomeAngCtrl.$inject = [
    '$scope'
    '$injector'
    '$rootScope'
    '$q'
]