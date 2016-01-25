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

    update = (id, user) ->
        cozydb.updateAttributes 'Contact', id, user, (err, res) ->
            if err
                alert err
            $scope.$apply ->
                vm.contacts = res
        return

    destroy = (id) ->
        cozydb.destroy id, (err, res) ->
            if err
                alert err
            $scope.$apply ->
                vm.contacts = res
        return

    define = () ->
        cozydb.defineRequest 'Contact', 'all', 'function(doc) { emit(doc.id, doc); }', (err, res) ->
            if err
                alert err
            cozydb.run 'Contact', 'all', {}, (err, res) ->
                $scope.$apply ->
                    vm.contacts = res
        return

    vm.add = add
    vm.find = find
    vm.exist = exist
    vm.update = update
    vm.destroy = destroy
    vm.define = define
    return    

angular.module('browserapp').controller 'HomeAngCtrl', HomeAngCtrl
HomeAngCtrl.$inject = [
    '$scope'
]