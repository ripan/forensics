'use strict';

// Direction controller
controllers.controller('DirectionsController', ['$scope', '$stateParams', '$location', 'Direction', 'Location', 'LineOptions', function($scope, $stateParams, $location, Direction, Location, LineOptions) {
    $scope.direction = {position_x:null,position_y:null, isSentRequest:false};
    $scope.isAddNew = false;
    $scope.guessesCount = 5;
    $scope.guessesRemaining = 5;
    $scope.guessLocations = [];
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
        Location.getGuesses().$promise.then(function (locations) {
            $scope.guessLocations = locations;
            $scope.guessesRemaining = $scope.guessesCount - locations.length;
            $scope.updateSelection();
        });
    };

    // Find existing Direction
    $scope.show = function() {
        $scope.direction = Direction.get({
            id: $stateParams.id
        });
    };

    $scope.updateSelection = function() {
        $.each($scope.directions, function(index, direction) {
            var sentDirection = _.find($scope.guessLocations,{position_x:direction.position_x,position_y:direction.position_y});
            if(sentDirection){
                direction.isSentRequest=true;
            }
        });
    };

    $scope.$watch('directions', function (newVal, oldVal) {
        if (newVal != oldVal) {
            $scope.drawGrid();
        }
    }, true);

    $scope.$watch('guessLocations', function (newVal, oldVal) {
        if (newVal != oldVal) {
            $scope.drawGrid();
        }
    }, true);

    $scope.drawGrid = function () {
        $scope.options = LineOptions;
        $scope.series = ['Directions'];
        $scope.labels = _.chain( $scope.directions).pluck('position_x').value();
        $scope.data = [_.chain( $scope.directions).pluck('position_y').value()];
    };

    $scope.sendSearch = function (direction) {

        if($scope.guessesRemaining <= 0){
            toastr.error('Sorry no more guess!');
            return;
        }

        var queryParams = {x:direction.position_x,y:direction.position_y};
        Location.query(queryParams).$promise.then(function (locations) {
            direction.isSentRequest=true;
            $scope.guessLocations = locations;
            $scope.guessesRemaining = $scope.guessesCount - locations.length
            toastr.info('Request sent to search party successfully! Yo have '+$scope.guessesRemaining+' guess remaining');
        }, $scope.failCallbacks); 
        direction.isSentRequest=true;       
    };    

    $scope.failCallbacks = function (errorResponse) {
        $scope.guessLocations = errorResponse.data.guseeses;
        $scope.direction.isSentRequest=false;
        toastr.error(JSON.stringify(errorResponse.data.error));
    };

}]);





