angular.module('classApp').controller('figController', function($scope, $state, $http, $cookies) {
	$scope.classer = function(){
		$state.go('class');
	};
$scope.viewAssignments = function(){
		$state.go('createHomework');
	};

$scope.metrics = function(){
		$state.go('metrics');
	};
	$scope.chatter = function(){
		$state.go('chat');
	};
	$scope.showClasses = function(){
		$state.go('showClasses');
	};
$scope.info = function(){
		$state.go('info');
	};
$scope.lectureLinks = function(){
		$state.go('lectureLinks');
	};
$scope.attend = function(){
		$state.go('attendance');
	};
$scope.updateUser = function(){
		$state.go('updateUser');
	};
	$scope.allUser = function(){
		$state.go('allUsers');
	};
	$scope.addUser = function(){
		$state.go('addUser');
	};
$scope.lecture = function(){
		$state.go('lectures');
	};	
$scope.setCookie = function(){
  $http({
method: 'GET',
url: '/adminStatus'
}).then(function(result){
  console.log(result.data);
$cookies.remove('34839');
$cookies.put('34839', result.data);
$scope.slkjdd = $cookies.get('34839');
console.log("cooked");
})
}	
})

