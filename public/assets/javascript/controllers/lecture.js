angular.module('classApp').controller('lecture', function($scope, $stateParams,$rootScope, $state,$http, $filter, NgTableParams) {


$scope.createLecture = function() {
	console.log(+" " + $scope.date)
	$http({
		method: 'POST',
		url: '/createLecture',
		data: {
			"github": $scope.github,
			"info": $scope.info,
			"videoLink": $scope.videoLink,
			"date": $scope.date,
		}
	}).then(function(result) {
		// $state.go("viewAttendDates")
	})
}


$scope.customFilter = function(id) {
	$rootScope.lectureFilter = id
	console.log("lecture id is" + $rootScope.lectureFilter)
	$scope.appState = "show"
}


$scope.thisLecture = []

$scope.getThisLecture = function() {
	debugger
	$http({
		method: 'GET',
		url: '/myLecture',
	}).then(function(response) {
		angular.forEach(response.data, function(eachOne) {

			$scope.thisLecture.push(eachOne);
		})
	});
}

$scope.myLecture = function() {
	$scope.myLectureTable = new NgTableParams({}, {
		getData: function($defer, params) {
			return $http.get('/myLecture')
				.then(function(response) {

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
