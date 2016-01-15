var appConfig, routeObject;

appConfig = function($httpProvider, $routeProvider) {
  var path;
  for (path in routeObject) {
    console.log(path);
    $routeProvider.when(path, routeObject[path]);
  }
  $routeProvider.otherwise({
    redirectTo: '/'
  });
  console.log('app config');
};

angular.module('browserapp', ['ngResource', 'ngRoute']).config(appConfig);

routeObject = {
  '/': {
    templateUrl: 'partials/home.html',
    controller: 'HomeAngCtrl',
    controllerAs: 'home'
  }
};

appConfig.$inject = ['$httpProvider', '$routeProvider'];
;var HomeAngCtrl;

HomeAngCtrl = function($scope, $injector, $rootScope, $q) {
  var add, vm;
  vm = this;
  add = function(user) {
    console.log('create contact');
    return console.log('END CONTACT');
  };
  return vm.add = add;
};

angular.module('browserapp').controller('HomeAngCtrl', HomeAngCtrl);

HomeAngCtrl.$inject = ['$scope', '$injector', '$rootScope', '$q'];
;
//# sourceMappingURL=app.js.map