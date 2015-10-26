'use strict';

// Direction controller
controllers.controller('DirectionsController', ['$scope', '$stateParams', '$location', 'Direction', 'Location', 'LineOptions', function($scope, $stateParams, $location, Direction, Location, LineOptions) {
    $scope.direction = {position_x:null,position_y:null, isSentRequest:false};
    $scope.isAddNew = false;
    $scope.guessesCount = 5;
    $scope.guessesRemaining = 5;
    $scope.email = "",
    // Create new Direction
    $scope.create = function() {
        // Create new Direction object
        var direction = new Direction($scope.direction);

        // Redirect after save
        direction.$save(function(response) {
            $scope.index();
            $location.path('directions');
            toastr.success('Location added successfully!');
        }, $scope.failCallbacks);
    };

    // Remove existing Direction
    $scope.destroy = function(direction) {
        if (direction) {
            direction.$remove();

            for (var i in $scope.directions) {
                if ($scope.directions[i] === direction) {
                    $scope.directions.splice(i, 1);
                }
            }
        } else {
            $scope.direction.$remove(function() {
                $location.path('directions');
            });
        }
        toastr.info('Location deleted successfully!');
    };

    // Update existing Direction
    $scope.update = function() {
        var direction = $scope.direction;

        direction.$update(function(response) {
            $location.path('directions');
            toastr.success('Location updated successfully!');
        }, function(errorResponse) {
            $scope.error = errorResponse.data.message;
        });
    };

    // Find a list of Directions
    $scope.index = function() {
        $scope.email = email;
        $scope.directions = Direction.query({email:$scope.email});
        var queryParams = {x:0,y:0};
        Location.query(queryParams).$promise.then(function (locations) {
            $scope.direction.isSentRequest=true;
            $scope.guessesRemaining = $scope.guessesCount - locations.length
        });         
    };

    // Find existing Direction
    $scope.show = function() {
        $scope.direction = Direction.get({
            id: $stateParams.id
        });
    };

    $scope.$watch('directions', function (newVal, oldVal) {
        if (newVal != oldVal) {
            $scope.drawGrid();
        }
    }, true);

    $scope.drawGrid = function () {
        $scope.options = LineOptions;
        $scope.labels = _.chain( $scope.directions).pluck('position_x').value();
        $scope.data = [_.chain( $scope.directions).pluck('position_y').value()];
    };

    $scope.sendSearch = function (direction) {

        if($scope.guessesRemaining <= 0){
            toastr.error('Sorry no more guess!');
            return;
        }

        $scope.direction = direction
        var queryParams = {x:direction.position_x,y:direction.position_y};
        Location.query(queryParams).$promise.then(function (locations) {
            $scope.direction.isSentRequest=true;
            $scope.guessesRemaining = $scope.guessesCount - locations.length
            toastr.info('Request sent to search party successfully! Yo have '+$scope.guessesRemaining+' guess remaining');
        }, $scope.failCallbacks); 
        $scope.direction.isSentRequest=true;       
    };    

    $scope.failCallbacks = function (errorResponse) {
        $scope.direction.isSentRequest=false;
        toastr.error(JSON.stringify(errorResponse.data));
    };

}]);





