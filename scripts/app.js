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

angular.module('browserapp').controller('HomeAngCtrl', HomeAngCtrl);

HomeAngCtrl.$inject = ['$scope', '$injector', '$rootScope', '$q'];

HomeAngCtrl = function($scope, $injector, $rootScope, $q) {
  var add, vm;
  vm = this;
  vm.add = add;
  return add = function(user) {
    var Contact;
    console.log('contact');
    Contact = cozydb.getModel('Contact', {
      fn: String,
      n: String,
      org: String,
      title: String,
      department: String,
      bday: String,
      nickname: String,
      url: String,
      note: String
    });
    Contact.create(user, function(err, res) {
      if (err != null) {
        return alert(err);
      } else {
        return $scope.$apply(function() {
          return vm.contacts = res;
        });
      }
    });
    return console.log('end contact');
  };
};
;
//# sourceMappingURL=app.js.map