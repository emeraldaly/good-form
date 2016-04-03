angular.module('classApp').controller('class', function($scope, $http) {

$scope.createClass = function(){
	$http({
        method: 'POST',
        url: '/createClass',
        data: {name:$scope.name, 
          datetime:$scope.datetime
        }
      }).then(function(result) {
        console.log(result)
      });
  
	}

	$scope.showClasses = function(){
	$http({
        method: 'get',
        url: '/showClasses'
      }).then(function(result) {
      	$scope.classes = result
      	console.log($scope.classes)
        
      });
  
	}


});