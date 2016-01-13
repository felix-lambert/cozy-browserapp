angular.module('browserapp').controller 'HomeAngCtrl', HomeAngCtrl

HomeAngCtrl.$inject = ['$scope', '$injector', '$rootScope', '$q']

HomeAngCtrl = ($scope, $injector, $rootScope, $q) ->
  vm    = this
  vm.add  = add

  add = (user) ->
    console.log 'contact'
    Contact = cozydb.getModel 'Contact',
      fn            : String
      n             : String
      org           : String
      title         : String
      department    : String
      bday          : String
      nickname      : String
      url           : String
      note          : String

    Contact.create user, (err, res) ->
      if err?
        alert err
      else
        $scope.$apply () ->
          vm.contacts = res

    console.log 'end contact'
