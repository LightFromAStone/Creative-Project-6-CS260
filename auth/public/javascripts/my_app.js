angular.module('myApp', []).
  controller('myController', ['$scope', '$http',
                              function($scope, $http) {
    $http.get('/user/profile')
        .success(function(data, status, headers, config) {
      $scope.user = data;
      $scope.error = "";
    }).
    error(function(data, status, headers, config) {
      $scope.user = {};
      $scope.error = data;
    });
    
    $scope.hideUser = function() {
      console.log('hiding user');
      $scope.userIsHidden = true;
      $scope.voteIsHidden = false;
    };
      
    $scope.hideVoting = function() {
      console.log('hiding voting');
    $scope.userIsHidden = false;
    $scope.voteIsHidden = true;
    }
    
  }]);