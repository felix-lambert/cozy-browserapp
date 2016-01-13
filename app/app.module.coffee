appConfig = ($httpProvider, $routeProvider) ->
  for path of routeObject
    console.log path
    $routeProvider.when path, routeObject[path]
  $routeProvider.otherwise redirectTo: '/'
  console.log 'app config'
  return

angular.module('browserapp', [
  'ngResource'
  'ngRoute'
]).config appConfig
routeObject = '/':
  templateUrl: 'partials/home.html'
  controller: 'HomeAngCtrl'
  controllerAs: 'home'
appConfig.$inject = [
  '$httpProvider'
  '$routeProvider'
]