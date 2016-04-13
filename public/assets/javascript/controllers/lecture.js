angular.module('classApp').controller('lecture', function($scope, $stateParams,$rootScope, $state,$http, $filter, NgTableParams) {

$scope.createLecture = function(){
	console.log(Date.($scope.date))
   // $http({
   //      method: 'POST',
   //      url: '/createLecture',
   //      data:{"github":$scope.github, "info":$scope.info, "videoLink":$scope.videoLink}
   //    }).then(function(result) {
   //      debugger
   //      // $state.go("viewAttendDates")
   //    })
}

}) //end of controller
