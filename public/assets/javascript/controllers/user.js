angular.module('classApp').controller('user', function($scope,  $state,$http, $filter, NgTableParams) {

  $scope.updateUser = function(){
    $state.go($state.current, {}, {reload: true});
    $http({
      method: 'POST',
      url: '/updateUser',
      data: {portfolio:$scope.portfolio, 
        github:$scope.github,
        linkedin:$scope.linkedin
      }
    }).then(function(result) {
      console.log(result)
    });
  }

  $scope.currentUser=function(){
    $http({
      method: 'GET',
      url: '/currentUser',
    }).then(function(result) {
      console.log(result)
      $scope.github = result.data[0].github,
      $scope.linkedin = result.data[0].linkedin,
      $scope.portfolio = result.data[0].portfolio
    });
  }


}) //end of controller