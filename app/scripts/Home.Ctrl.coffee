HomeAngCtrl = ($scope) ->
    vm = this

    add = (user) ->
        console.log 'create contact'

        cozydb.create 'Contact', user, (err, body, res) ->
            if err
                alert err
            else
                data = JSON.parse body
                console.log data
                console.log data._id
                $scope.$apply ->
                    vm.contacts = data
        console.log 'END CONTACT'
        return

    find = (id) ->
        cozydb.find id, (err, body, res) ->
            if err
                alert err
            $scope.$apply ->
                console.log result
                vm.contacts = body
            console.log err
            console.log 'Contact.find'
            console.log body
        return

    vm.add = add
    vm.find = find
    return    

angular.module('browserapp').controller 'HomeAngCtrl', HomeAngCtrl
HomeAngCtrl.$inject = [
    '$scope'
]