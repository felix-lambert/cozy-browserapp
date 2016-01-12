angular.module('Bookmarks').controller('HomeAngCtrl', HomeAngCtrl);

HomeAngCtrl.$inject = ['$scope', '$injector', '$rootScope', '$q'];

function HomeAngCtrl($scope, $injector, $rootScope, $q) {

	var vm        = this;
	vm.add = add;
	var data = {};

	function add(user) {
		console.log('create contact');
		console.log('contact');
		// console.log(contact);
		console.log('user');
		console.log(user);
		var defaultForm = {
          fn : "",
          n : "",
            org           : "",
	        title         : "",
	        department    : "",
	        bday          : "",
	        nickname      : "",
	        url           : "",
	        note          : ""
      	};
      	Contact = cozydb.getModel('Contact', {
			fn            : String,
	        n             : String,
	        org           : String,
	        title         : String,
	        department    : String,
	        bday          : String,
	        nickname      : String,
	        url           : String,
	        note          : String
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
	        	$scope.$apply(function () {
            		$scope.contacts = res;
	        		vm.contacts = res;
       			});
	        }
	    });
	    console.log('END CONTACT');
	}
}