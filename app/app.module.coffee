appConfig = ($httpProvider, $routeProvider) ->
    for path of routeObject
        $routeProvider.when path, routeObject[path]
    $routeProvider.otherwise redirectTo: '/'
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
