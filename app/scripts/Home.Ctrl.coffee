HomeAngCtrl = ($scope, $injector, $rootScope, $q) ->
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
        console.log 'Contact.create'
        console.log res
        # Contact.find (err, response) ->
        #   console.log '//////////////////'
        #   console.log response
        #   console.log '//////////////////'
        #   return
        $scope.$apply ->
          $scope.contacts = res
          vm.contacts = res
          return
      return
    console.log 'END CONTACT'
    return

  vm.add = add
  return

angular.module('browserapp').controller 'HomeAngCtrl', HomeAngCtrl
HomeAngCtrl.$inject = [
  '$scope'
  '$injector'
  '$rootScope'
  '$q'
]