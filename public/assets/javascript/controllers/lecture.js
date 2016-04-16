angular.module('classApp').controller('lecture', function($scope, $stateParams,$rootScope, $state,$http, $filter, NgTableParams) {

$scope.newLecture = function() {
	if ($rootScope.classEdit == undefined) {
		$scope.allFields = "false"
	} else {
		$rootScope.classEdit = undefined;
		$state.go("createLecture")
	}
}
$scope.viewLecture = function() {
	console.log("asdfds")
	$scope.viewLectureTable = new NgTableParams({}, {
		getData: function($defer, params) {
			return $http.get('/viewLecture')
				.then(function(response) {

					var classes = response.data
					var filteredData = $filter('filter')(classes, params.filter())
					var sortedData = $filter('orderBy')(filteredData, params.orderBy());
					return sortedData;
				});
		}
	});

}

$scope.showAllLectures = function() {
	if ($rootScope.classEdit == undefined) {
		$scope.allFields = "false"
	} else {
		$rootScope.classEdit = undefined;
		$state.go("viewLecture")
	}

}

$scope.createLecture = function() {
	$state.go("lectures")
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

$scope.thisLectureId = function(id) {
	$rootScope.thisLectureId = id
	$http({
		method: 'POST',
		url: '/thisLecture',
		data: {
			"id": $rootScope.thisLectureId
		}
	}).then(function(result) {
		// $state.go("viewAttendDates")
	})
}

$scope.updateLecture = function() {
	$state.go($state.current, {}, {
			reload: true
	});
	$http({
		method: 'POST',
		url: '/updateLecture',
		data: {
			"github": $scope.github,
			"info": $scope.info,
			"videoLink": $scope.videoLink
		}
	}).then(function(result) {});
}
$scope.updateLectureInfo = function() {
	console.log("nope?")
	$http({
		method: 'GET',
		url: '/updateLectureInfo'
	}).then(function(result) {
		console.log(result)
		$scope.github = result.data[0].github;
		$scope.videoLink = result.data[0].videoLink;
		$scope.info = result.data[0].info;
	})
}

$scope.editLecture = function() {
	console.log("hit")
	if ($rootScope.thisLectureId == undefined) {
		$scope.allFields = 'false';
		console.log("flase")
	} else {
		$rootScope.thisLectureId = undefined;
		$state.go("updateLecture")
	}
}
$scope.deleteLecture = function() {
	if ($rootScope.thisLectureId == undefined) {
		$scope.allFields = 'false';
		console.log("flase")
	} else {
		$rootScope.thisLectureId = undefined;
		$state.go($state.current, {}, {
			reload: true
		});
		$http({
			method: 'POST',
			url: '/deleteLecture'
		}).then(function(result) {
			// $state.go("viewAttendDates")
		})
	}
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
