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
    Contact.create(user, function(err, res) {
      if (err) {
        alert(err);
      } else {
        console.log('Contact.create');
        console.log(res);
        Contact.find(function(err, response) {
          console.log('//////////////////');
          console.log(response);
          console.log('//////////////////');
        });
        $scope.$apply(function() {
          $scope.contacts = res;
          vm.contacts = res;
        });
      }
    });
    console.log('END CONTACT');
  };
  vm.add = add;
};

angular.module('Bookmarks').controller('HomeAngCtrl', HomeAngCtrl);

HomeAngCtrl.$inject = ['$scope', '$injector', '$rootScope', '$q'];
;
//# sourceMappingURL=app.js.map