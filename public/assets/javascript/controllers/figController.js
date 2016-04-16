angular.module('classApp').controller('figController', function($scope, $state) {
	$scope.classer = function(){
		$state.go('class');
	};
$scope.addUserer = function(){
		$state.go('addUser');
	};
$scope.viewAssignments = function(){
		$state.go('viewAssignments');
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
$scope.info = function(){
		$state.go('info');
	};
$scope.lectureLinks = function(){
		$state.go('lectureLinks');
	};

$scope.updateUser = function(){
		$state.go('updateUser');
	};
$scope.lecture = function(){
		$state.go('lectures');
	};	
})