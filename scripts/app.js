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
      var data;
      if (err) {
        return alert(err);
      } else {
        data = JSON.parse(res);
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
    var Contact;
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
    console.log('find');
    console.log(id);
    return Contact.find(id, function(err, result) {
      console.log(err);
      console.log('Contact.find');
      return console.log(result);
    });
  };
  vm.add = add;
  vm.find = find;
};

angular.module('browserapp').controller('HomeAngCtrl', HomeAngCtrl);

HomeAngCtrl.$inject = ['$scope'];
;
//# sourceMappingURL=app.js.map