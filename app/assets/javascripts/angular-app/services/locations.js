'use strict';

services.factory('Location', ['$resource', function($resource) {
	return $resource('/api/:email/location/:x/:y', { x: '@x', y: '@y', email: email }, {
		update: {
			method: 'PUT'
		}
	});
}]);

