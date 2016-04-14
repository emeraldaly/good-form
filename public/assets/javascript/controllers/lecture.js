angular.module('classApp').controller('lecture', function($scope, $stateParams,$rootScope, $state,$http, $filter, NgTableParams) {

$scope.createLecture = function(){
	console.log( + " " + $scope.date) 
   $http({
        method: 'POST',
        url: '/createLecture',
        data:{"github":$scope.github, "info":$scope.info, 
        "videoLink":$scope.videoLink,"date":$scope.date,}
      }).then(function(result) {
        // $state.go("viewAttendDates")
      })
}

$scope.myLecture= function(){
   $scope.myLectureTable = new NgTableParams({
  }, {
    getData: function($defer, params) {
      return $http.get('/myLecture')
      .then(function(response) {
        console.log(response)
        
         var classes = response.data
         console.log(classes)
        var filteredData = $filter('filter')(classes, params.filter())
        var sortedData = $filter('orderBy')(filteredData, params.orderBy());
        console.log(sortedData)
        return sortedData;
     });
     
    }
  });
}
}) //end of controller
