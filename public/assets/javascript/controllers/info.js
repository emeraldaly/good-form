
angular.module('classApp').controller('infoCreate', function($scope, $state, $http, $filter, $rootScope, NgTableParams) {


	$scope.createInfo = function() {
		if (($scope.information == undefined) || ($rootScope.classEdit == undefined) || ($scope.title == undefined) ){
			$scope.message = "Please enter all fields to continue";
		}
		else{
			console.log($scope.userUpdate)
			$state.go($state.current, {}, {reload: true});
			$http({
				method: 'POST',
				url: '/createInfo',
				data: {
					title: $scope.title.toUpperCase(),
					information: $scope.information,
				}
			}).then(function(result) {
				$rootScope.classEdit = undefined;
				$rootScope.infos.push(result.data)
			});
		}
	}
})
angular.module('classApp').controller('info', function($scope, $state, $http, $filter, $rootScope, NgTableParams) {
	//threw this in the info so it would load when the page loads, has nothing to do with the infoboard
	$scope.orgName = function(){
		$http({
      method: 'GET',
      url: '/orgName'
    }).then(function(result) {
    	debugger
      $rootScope.organizationName = result.data[0].name
    });  
	}
	$rootScope.infos=[];
	$scope.viewInfo = function() {
		$http({
			method: 'GET',
			url: '/viewInfo',
		}).then(function(result) {
			angular.forEach(result.data, function (eachOne){
				$rootScope.infos.push(eachOne);
			})
		});
	}
	$scope.classesTable = new NgTableParams({}, {
		getData: function($defer, params) {
			return $http.get('/showClasses')
			.then(function(response) {
				console.log(response)
				var classes = response.data
							//  console.log(classes)
							// var filteredData = $filter('filter')(classes, params.filter())
							// var sortedData = $filter('orderBy')(filteredData, params.orderBy());
							// console.log(sortedData)
							return classes;
						});
		}
	});

	}); //end of module
