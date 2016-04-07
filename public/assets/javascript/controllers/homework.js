angular.module('classApp').controller('homework', function($scope,  $state,$http, $filter, NgTableParams) {


$scope.createHomework = function(){

	console.log($scope.description + "  " +$scope.name)

 $http({
        method: 'POST',
        url: '/createHomework',
        data: {description:$scope.description,
        	name:$scope.name
        }
      }).then(function(result) {
        console.log(result)
      });  
}

$scope.getAssignments = function(){
	 $http({
        method: 'GET',
        url: '/viewAssignments',
      }).then(function(result) {
        debugger
        console.log(result)
        console.log(result.data.assignment)
      });  


     }

})//end of controller