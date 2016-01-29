// 1. define the module and the other module dependencies (if any)
angular.module('cozysdk', [])
    .constant('MODULE_VERSION', '0.0.3')

    .value('defaults', {
        foo: 'bar'
    })

    .factory('factoryName', function() {


    })
    .directive('directiveName', function() {


    });