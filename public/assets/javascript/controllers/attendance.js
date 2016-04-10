angular.module('classApp').controller('attendance', function($scope, $stateParams,$rootScope, $state,$http, $filter, NgTableParams) {

$scope.newAttendance = function(){
	 $http({
        method: 'POST',
        url: '/newAttendance'
      }).then(function(result) {
        console.log(result)
      });
}

})  //end of controller