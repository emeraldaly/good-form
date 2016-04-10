angular.module('classApp').controller('attendance', function($scope, $stateParams,$rootScope, $state,$http, $filter, NgTableParams) {

$scope.newAttendance = function(){
	 $http({
        method: 'POST',
        url: '/newAttendance'
      }).then(function(result) {
        console.log(result)
      });
      $state.go("editAttendance")
}

$scope.updateAttend= function(id, here){
	console.log(id + here)
	$http({
        method: 'POST',
        url: '/updateAttend',
        data:{"id":id, "here":here}
      }).then(function(result) {
        console.log(result)
      })
}

$scope.students = []
$scope.getAttend = function(){
		 $http({
        method: 'GET',
        url: '/getAttend'
      }).then(function(result) {
    
        console.log(result)
        angular.forEach(result.data[0].student, function (eachOne){
          $scope.students.push(eachOne);
        });
      });
}
})  //end of controller