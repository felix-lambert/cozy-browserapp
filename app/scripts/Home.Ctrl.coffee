HomeAngCtrl = ($scope) ->
    vm = this

    add = (user) ->
        console.log 'create contact'
        Contact = cozydb.getModel('Contact',
            fn: String
            n: String
            org: String
            title: String
            department: String
            bday: String
            nickname: String
            url: String
            note: String)
        Contact.create user, (err, res) ->
            if err
                alert err
            else
                console.log res
                console.log res[0]._id
                Contact.find res[0]._id, (err, res) ->
                    console.log 'Contact.create'
                    console.log res
                    $scope.$apply ->
                        vm.contacts = res
            console.log 'END CONTACT'
        return

    vm.add = add
    return

angular.module('browserapp').controller 'HomeAngCtrl', HomeAngCtrl
HomeAngCtrl.$inject = [
    '$scope'
]