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
    find: function(id, callback) {
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
    exist: function(id, callback) {
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
    update: function(id, user, callback) {
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
    destroy: function(id, callback) {
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
    defineRequest: function(docType, requestName, defined, callback) {
      return cozysdk.defineRequest(docType, requestName, defined, function(err, res) {
        if (err != null) {
          return console.log('maybe do a cozy special error warning');
        } else {
          return $rootScope.$apply(function() {
            return callback(res);
          });
        }
      });
    },
    destroyRequest: function(callback) {
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
    runRequest: function(docType, requestName, callback) {
      return cozysdk.run('Contact', requestName, {}, function(err, res) {
        if (err != null) {
          return console.log('maybe do a cozy special error warning');
        } else {
          console.log(res);
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

HomeAngCtrl = function($injector) {
  var Contact, CozySdk, activate, destroy, send, update, vm;
  Contact = $injector.get('Contact');
  CozySdk = $injector.get('CozySdk');
  vm = this;
  activate = function() {
    console.log('activate');
    return Contact.all(function(res) {
      return vm.contacts = res;
    });
  };
  send = function(user) {
    console.log('send');
    return Contact.send('Contact', user, function(res) {
      vm.contacts = res;
      return activate();
    });
  };
  update = function(id, user) {
    return CozySdk.updateAttributes('Contact', id, user, function(res) {
      vm.contacts = res;
      return activate();
    });
  };
  destroy = function(id) {
    return CozySdk.destroy(id, function(res) {
      vm.contacts = res;
      return activate();
    });
  };
  console.log('activate');
  activate();
  vm.send = send;
  vm.update = update;
  return vm.destroy = destroy;
};

angular.module('browserapp').controller('HomeAngCtrl', HomeAngCtrl);

HomeAngCtrl.$inject = ['$injector'];
;
//# sourceMappingURL=app.js.map