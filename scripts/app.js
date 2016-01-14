var appConfig, routeObject;

appConfig = function($httpProvider, $routeProvider) {
  var path;
  for (path in routeObject) {
    $routeProvider.when(path, routeObject[path]);
  }
  $routeProvider.otherwise({
    redirectTo: '/'
  });
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

HomeAngCtrl = function($scope) {
  var add, vm;
  vm = this;
  add = function(user) {
    var Contact;
    console.log('create contact');
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
    return Contact.create(user, function(err, res) {
      if (err) {
        alert(err);
      } else {
        console.log('Contact.create');
        console.log(res);
        $scope.$apply(function() {
          $scope.contacts = res;
          return vm.contacts = res;
        });
      }
      return console.log('END CONTACT');
    });
  };
  return vm.add = add;
};

angular.module('browserapp').controller('HomeAngCtrl', HomeAngCtrl);

HomeAngCtrl.$inject = ['$scope'];
;
//# sourceMappingURL=app.js.map