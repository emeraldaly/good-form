
angular.module('classApp').controller('info', function($scope, $state, $http, $filter, NgTableParams) {

		$scope.createInfo = function() {
			$http({
				method: 'POST',
				url: '/createInfo',
				data: {
					title: $scope.title,
					information: $scope.information,
					class: $scope.userUpdate
				}
			}).then(function(result) {
				console.log(result)
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

	}) //end of module