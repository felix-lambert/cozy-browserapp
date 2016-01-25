HomeAngCtrl = ($scope) ->
    vm = this

    add = (user) ->
        console.log 'create contact'
        cozydb.create 'Contact', user, (err, res) ->
            if err
                alert err
            else
                $scope.$apply ->
                    vm.contacts = res
        return

    find = (id) ->
        cozydb.find id, (err, res) ->
            if err
                alert err
            $scope.$apply ->
                console.log res
                vm.contacts = res
        return

    exist = (id) ->
        cozydb.exists id, (err, res) ->
            if err
                alert err
            $scope.$apply ->
                console.log res
                vm.contacts = res
        return

    vm.add = add
    vm.find = find
    vm.exist = exist
    return    

angular.module('browserapp').controller 'HomeAngCtrl', HomeAngCtrl
HomeAngCtrl.$inject = [
    '$scope'
]