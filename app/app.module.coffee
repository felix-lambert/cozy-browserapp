appConfig = ($routeProvider) ->
    for path of routeObject
        $routeProvider.when path, routeObject[path]
    $routeProvider.otherwise redirectTo: '/'

angular.module('browserapp', [
    'ngResource'
    'ngRoute'
]).config appConfig

routeObject = '/':
    templateUrl: 'partials/home.html'
    controller: 'HomeAngCtrl'
    resolve:
      	preGetContacts: ->
        	promise = Contact.all()
        	return promise   

appConfig.$inject = [
    '$routeProvider'
]