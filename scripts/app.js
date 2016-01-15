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
        JSON.stringify(res);
        console.log(res);
        console.log(res[0]._id);
        console.log(res._id);
        Contact.find(res[0]._id, function(err, res) {
          console.log('Contact.create');
          console.log(res);
          return $scope.$apply(function() {
            return vm.contacts = res;
          });
        });
      }
      return console.log('END CONTACT');
    });
  };
  vm.add = add;
};

angular.module('browserapp').controller('HomeAngCtrl', HomeAngCtrl);

HomeAngCtrl.$inject = ['$scope'];
;
//# sourceMappingURL=app.js.map