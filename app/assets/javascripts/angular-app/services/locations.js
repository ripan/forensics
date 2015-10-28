'use strict';

services.factory('Location', ['$resource', function($resource) {
	return $resource('/api/:email/location/:x/:y:cmd', { x: '@x', y: '@y', email: email, cmd: "@cmd" }, {
		update: {
			method: 'PUT'
		},
		getGuesses: { method: "GET", params: {cmd: "guesses"} , isArray:true},
	});
}]);

