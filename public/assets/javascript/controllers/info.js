
angular.module('classApp').controller('info', function($scope, $state, $http, $filter, $rootScope, NgTableParams) {
		$scope.createInfo = function() {
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
				$scope.viewInfo()
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
