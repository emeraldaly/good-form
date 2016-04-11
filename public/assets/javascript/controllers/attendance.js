angular.module('classApp').controller('attendance', function($scope, $stateParams,$rootScope, $state,$http, $filter, NgTableParams) {

$scope.newAttendance = function(){
	 $http({
        method: 'POST',
        url: '/newAttendance'
      }).then(function(result) {
        
      });
      $state.go("editAttendance")
}

$scope.updateAttend= function(id, here){
// $state.transitionTo($state.current, angular.copy($stateParams), { reload: true, inherit: true, notify: true });
	// $state.go("editAten")
debugger
	$http({
        method: 'POST',
        url: '/updateAttend',
        data:{"id":id, "here":here}
      }).then(function successCallback(response) {
    
    console.log(response)
   $state.transitionTo($state.current, angular.copy($stateParams), { reload: true, inherit: true, notify: true });
  }, function errorCallback(response) {
   
   debugger
   console.log(response)
  });
}

$scope.test = function(){
("workin")
}

$scope.students = []
$scope.getAttend = function(){
		 $http({
        method: 'GET',
        url: '/getAttend'
      }).then(function(result) {
    
        
        angular.forEach(result.data[0].student, function (eachOne){
          $scope.students.push(eachOne);
        });
      });
}
})  //end of controller