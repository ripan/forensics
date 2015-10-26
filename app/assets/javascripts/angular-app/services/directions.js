'use strict';

services.factory('Direction', ['$resource', function($resource) {
	return $resource('/api/:email/directions/:id', { id: '@id',email: email }, {
		update: {
			method: 'PUT'
		}
	});
}]);

