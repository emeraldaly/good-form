angular.module('classApp').controller('user', function($scope,  $state,$http, $filter, NgTableParams) {

$scope.updateUser = function(){
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

}) //end of controller