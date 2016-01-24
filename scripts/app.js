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

HomeAngCtrl = function($scope) {
  var add, find, vm;
  vm = this;
  add = function(user) {
    console.log('create contact');
    cozydb.create('Contact', user, function(err, body, res) {
      var data;
      if (err) {
        return alert(err);
      } else {
        data = JSON.parse(body);
        console.log(data);
        console.log(data._id);
        return $scope.$apply(function() {
          return vm.contacts = data;
        });
      }
    });
    console.log('END CONTACT');
  };
  find = function(id) {
    cozydb.find(id, function(err, body, res) {
      if (err) {
        alert(err);
      }
      $scope.$apply(function() {
        console.log(result);
        return vm.contacts = body;
      });
      console.log(err);
      console.log('Contact.find');
      return console.log(body);
    });
  };
  vm.add = add;
  vm.find = find;
};

angular.module('browserapp').controller('HomeAngCtrl', HomeAngCtrl);

HomeAngCtrl.$inject = ['$scope'];
;
//# sourceMappingURL=app.js.map