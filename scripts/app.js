var appConfig, routeObject;

appConfig = function($routeProvider) {
  var path;
  for (path in routeObject) {
    $routeProvider.when(path, routeObject[path]);
  }
  return $routeProvider.otherwise({
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

appConfig.$inject = ['$routeProvider'];
;var Contact;

Contact = function($injector) {
  var CozySdk;
  CozySdk = $injector.get('CozySdk');
  return {
    send: function(docType, data, callback) {
      console.log('send');
      return CozySdk.create(docType, data, function(res) {
        return CozySdk.find(res._id, function(result) {
          return callback(result);
        });
      });
    },
    all: function(callback) {
      return CozySdk.defineRequest('Contact', 'all', 'function(doc) { emit(doc.n, null); }', function(res) {
        return CozySdk.runRequest('Contact', 'all', function(result) {
          return callback(result);
        });
      });
    }
  };
};

angular.module('browserapp').factory('Contact', Contact);

Contact.$inject = ['$injector'];
;var CozySdk;

CozySdk = function($rootScope) {
  return {
    create: function(docType, data, callback) {
      return cozysdk.create(docType, data, function(err, res) {
        if (err != null) {
          return console.log('maybe do a cozy special error warning');
        } else {
          return $rootScope.$apply(function() {
            return callback(res);
          });
        }
      });
    },
    find: function(id) {
      return cozysdk.find(id, function(err, res) {
        if (err != null) {
          return console.log('maybe do a cozy special error warning');
        } else {
          return $rootScope.$apply(function() {
            return callback(res);
          });
        }
      });
    },
    exist: function(id) {
      return cozysdk.exists(id, function(err, res) {
        if (err != null) {
          return console.log('maybe do a cozy special error warning');
        } else {
          return $rootScope.$apply(function() {
            return callback(res);
          });
        }
      });
    },
    update: function(id, user) {
      return cozysdk.updateAttributes('Contact', id, user, function(err, res) {
        if (err != null) {
          return console.log('maybe do a cozy special error warning');
        } else {
          return $rootScope.$apply(function() {
            return callback(res);
          });
        }
      });
    },
    destroy: function(id) {
      return cozysdk.destroy(id, function(err, res) {
        if (err != null) {
          return console.log('maybe do a cozy special error warning');
        } else {
          return $$rootScope.$apply(function() {
            return callback(res);
          });
        }
      });
    },
    defineRequest: function() {
      return cozysdk.defineRequest('Contact', 'all', 'function(doc) { emit(doc.n, null); }', function(err, res) {
        if (err != null) {
          return console.log('maybe do a cozy special error warning');
        } else {
          return $rootScope.$apply(function() {
            return callback(res);
          });
        }
      });
    },
    destroyRequest: function() {
      return cozysdk.requestDestroy('Contact', 'all', {
        startkey: 'z',
        endkey: 'z'
      }, function(err, res) {
        if (err != null) {
          return console.log('maybe do a cozy special error warning');
        } else {
          return $rootScope.$apply(function() {
            return callback(res);
          });
        }
      });
    },
    runRequest: function() {
      return cozysdk.run('Contact', 'all', {
        startkey: 'z',
        endkey: 'z'
      }, function(err, res) {
        if (err != null) {
          return console.log('maybe do a cozy special error warning');
        } else {
          return $rootScope.$apply(function() {
            return callback(res);
          });
        }
      });
    }
  };
};

angular.module('browserapp').factory('CozySdk', CozySdk);

CozySdk.$inject = ['$rootScope'];
;var HomeAngCtrl;

HomeAngCtrl = function($scope) {
  var add, define, destroy, destroyRequest, exist, find, update, vm;
  vm = this;
  add = function(user) {
    console.log('create contact');
    cozysdk.create('Contact', user, function(err, res) {
      if (err) {
        alert(err);
      }
      return vm.contacts = res;
    });
  };
  find = function(id) {
    cozysdk.find(id, function(err, res) {
      if (err) {
        alert(err);
      }
      return $scope.$apply(function() {
        console.log(res);
        return vm.contacts = res;
      });
    });
  };
  exist = function(id) {
    cozysdk.exists(id, function(err, res) {
      if (err) {
        alert(err);
      }
      return $scope.$apply(function() {
        console.log(res);
        return vm.contacts = res;
      });
    });
  };
  update = function(id, user) {
    cozysdk.updateAttributes('Contact', id, user, function(err, res) {
      if (err) {
        alert(err);
      }
      return $scope.$apply(function() {
        return vm.contacts = res;
      });
    });
  };
  destroy = function(id) {
    cozysdk.destroy(id, function(err, res) {
      if (err) {
        alert(err);
      }
      return $scope.$apply(function() {
        return vm.contacts = res;
      });
    });
  };
  define = function() {
    cozysdk.defineRequest('Contact', 'all', 'function(doc) { emit(doc.n, null); }', function(err, res) {
      if (err) {
        alert(err);
      }
      return cozydb.run('Contact', 'all', {}, function(err, res) {
        return $scope.$apply(function() {
          return vm.contacts = res;
        });
      });
    });
  };
  destroyRequest = function() {
    cozysdk.requestDestroy('Contact', 'all', {
      startkey: 'z',
      endkey: 'z'
    }, function(err, res) {
      if (err) {
        alert(err);
      }
      return cozydb.run('Contact', 'all', {}, function(err, res) {
        return $scope.$apply(function() {
          return vm.contacts = res;
        });
      });
    });
  };
  vm.add = add;
  vm.find = find;
  vm.exist = exist;
  vm.update = update;
  vm.destroy = destroy;
  vm.define = define;
  vm.destroyRequest = destroyRequest;
};

angular.module('browserapp').controller('HomeAngCtrl', HomeAngCtrl);

HomeAngCtrl.$inject = ['$scope'];
;
//# sourceMappingURL=app.js.map