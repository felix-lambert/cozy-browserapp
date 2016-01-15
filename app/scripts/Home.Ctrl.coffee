HomeAngCtrl = ($scope) ->
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
                data = JSON.parse res
                console.log data
                console.log data._id
                $scope.$apply ->
                    vm.contacts = data
        console.log 'END CONTACT'
        return

    find = (id) ->
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
        console.log 'find'
        console.log id
        Contact.find id, (err, result) ->
            if err
                alert err
            $scope.$apply ->
                console.log 'apply'
                console.log result
                vm.contacts = result
            console.log err
            console.log 'Contact.find'
            console.log result


    vm.add = add
    vm.find = find
    return    

angular.module('browserapp').controller 'HomeAngCtrl', HomeAngCtrl
HomeAngCtrl.$inject = [
    '$scope'
]