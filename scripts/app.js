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
    controller: 'HomeAngCtrl'
  }
};

appConfig.$inject = ['$routeProvider'];
;var Contact;

Contact = function($injector, $q) {
  var CozySdk;
  CozySdk = $injector.get('CozySdk');
  return {
    send: function(docType, data) {
      var deferred, promise;
      deferred = $q.defer();
      promise = CozySdk.create(docType, data).then(function(res) {
        return CozySdk.find(res._id);
      });
      return promise.then((function(result) {
        return deferred.resolve(result);
      }), function(error) {
        return deferred.reject(error);
      });
    },
    all: function() {
      var deferred;
      deferred = $q.defer();
      return $q.all([CozySdk.defineRequest('Contact', 'all', 'function(doc) { emit(doc.n, null); }'), CozySdk.runRequest('Contact', 'all')]).then((function(result) {
        return deferred.resolve(result);
      }), function(error) {
        return deferred.reject(error);
      });
    }
  };
};

angular.module('browserapp').factory('Contact', Contact);

Contact.$inject = ['$injector', '$q'];
;var CozySdk;

CozySdk = function($rootScope, $q) {
  return {
    create: function(docType, data) {
      var deferred;
      deferred = $q.defer();
      cozysdk.create(docType, data, function(err, res) {
        if (err != null) {
          return console.log('maybe do a cozy special error warning');
        } else {
          return $rootScope.$apply(function() {
            return deferred.resolve(res);
          });
        }
      });
      return deferred.promise;
    },
    find: function(id) {
      var deferred;
      deferred = $q.defer();
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
      var deferred;
      deferred = $q.defer();
      cozysdk.exists(id, function(err, res) {
        if (err != null) {
          return console.log('maybe do a cozy special error warning');
        } else {
          return $rootScope.$apply(function() {
            return deferred.resolve(res);
          });
        }
      });
      return deferred.promise;
    },
    update: function(docType, id, user) {
      var deferred;
      deferred = $q.defer();
      cozysdk.updateAttributes(docType, id, user, function(err, res) {
        if (err != null) {
          return console.log('maybe do a cozy special error warning');
        } else {
          return $rootScope.$apply(function() {
            return deferred.resolve(res);
          });
        }
      });
      return deferred.promise;
    },
    destroy: function(id) {
      var deferred;
      deferred = $q.defer();
      cozysdk.destroy(id, function(err, res) {
        if (err != null) {
          console.log('maybe do a cozy special error warning');
          return deferred.reject('oh no an error! try again');
        } else {
          return $rootScope.$apply(function() {
            return deferred.resolve(res);
          });
        }
      });
      return deferred.promise;
    },
    defineRequest: function(docType, requestName, defined) {
      var deferred;
      deferred = $q.defer();
      cozysdk.defineRequest(docType, requestName, defined, function(err, res) {
        if (err != null) {
          console.log('maybe do a cozy special error warning');
          return deferred.reject('oh no an error! try again');
        } else {
          return $rootScope.$apply(function() {
            return deferred.resolve(res);
          });
        }
      });
      return deferred.promise;
    },
    destroyRequest: function() {
      var deferred;
      deferred = $q.defer();
      cozysdk.requestDestroy('Contact', 'all', {
        startkey: 'z',
        endkey: 'z'
      }, function(err, res) {
        if (err != null) {
          console.log('maybe do a cozy special error warning');
          return deferred.reject('oh no an error! try again');
        } else {
          return $rootScope.$apply(function() {
            return deferred.resolve(res);
          });
        }
      });
      return deferred.promise;
    },
    runRequest: function(docType, requestName) {
      var deferred;
      deferred = $q.defer();
      cozysdk.run(docType, requestName, {}, function(err, res) {
        if (err != null) {
          console.log('maybe do a cozy special error warning');
          return deferred.reject('oh no an error! try again');
        } else {
          res = JSON.parse("" + res);
          return $rootScope.$apply(function() {
            return deferred.resolve(res);
          });
        }
      });
      return deferred.promise;
    }
  };
};

angular.module('browserapp').factory('CozySdk', CozySdk);

CozySdk.$inject = ['$rootScope', '$q'];
;var HomeAngCtrl;

HomeAngCtrl = function($injector, $scope) {
  var Contact, CozySdk, activate, destroy, send, update;
  Contact = $injector.get('Contact');
  CozySdk = $injector.get('CozySdk');
  activate = function() {
    console.log('activate');
    return Contact.all().then(function(res) {
      return $scope.contacts = res;
    });
  };
  send = function(user) {
    console.log('send');
    return Contact.send('Contact', user).then(function(res) {
      $scope.contacts = res;
      return activate();
    });
  };
  update = function(id, user) {
    var contactName;
    console.log(user);
    contactName = {
      n: user.key
    };
    console.log(contactName);
    return CozySdk.update('Contact', id, contactName).then(function(res) {
      $scope.contacts = res;
      return activate();
    });
  };
  destroy = function(id) {
    console.log('destroy');
    console.log(id);
    return CozySdk.destroy(id).then(function(res) {
      $scope.contacts = res;
      return activate();
    });
  };
  console.log('activate');
  activate();
  $scope.send = send;
  $scope.update = update;
  return $scope.destroy = destroy;
};

angular.module('browserapp').controller('HomeAngCtrl', HomeAngCtrl);

HomeAngCtrl.$inject = ['$injector', '$scope'];
;
//# sourceMappingURL=app.js.map