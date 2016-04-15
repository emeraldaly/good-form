angular.module('classApp').controller('class', function($scope, $stateParams,$rootScope, $state,$http, $filter, NgTableParams) {
$scope.listOfUsers= []


// use the edit class Id on every class
// then use the bottom of the editclassId Page
// for the myclass Page

// view all classes
// click on a user to see thier userinfopage


$scope.myClasses = []
$scope.myClass = function() {
  $http({
    method: 'GET',
    url: '/myClass'
  }).then(function(result) {
    angular.forEach(result.data, function(eachOne) {
      $scope.myClasses.push(eachOne);
    })
  });
}


$scope.createClass = function() {
  $state.go('class')
  $http({
    method: 'POST',
    url: '/createClass',
    data: {
      name: $scope.name,
      datetime: $scope.datetime
    }
  }).then(function(result) {});

}
$scope.getAllUsers = function() {
  $scope.allUsers = new NgTableParams({}, {
    getData: function($defer, params) {
      return $http.get('/getAllUsers')
        .then(function(response) {
          // get class
          // get unassigned users
          console.log(response)
          var classes = response.data
            //  console.log(classes)
          var filteredData = $filter('filter')(classes, params.filter())
          var sortedData = $filter('orderBy')(filteredData, params.orderBy());
          // console.log(sortedData)
          return sortedData;
        });

    }
  });
}

$scope.getClasses = function() {
  $scope.classesTable = new NgTableParams({}, {
    getData: function($defer, params) {
      return $http.get('/showClasses')
        .then(function(response) {
          console.log(response)
          var classes = response.data
            //  console.log(classes)
          var filteredData = $filter('filter')(classes, params.filter())
          var sortedData = $filter('orderBy')(filteredData, params.orderBy());
          return sortedData;
        });
    }
  });
}
$scope.userId = function(id) {
  $scope.userUpdate = id;
}
$scope.updateClass = function() {
  if (($scope.userRole || $scope.studentSelect) === undefined) {
    $scope.allFields = "false"
  } else {

    console.log('yep')
      // $state.transitionTo($state.current, $stateParams, { 
      //       reload: true, inherit: true, notify: true
      //     });
    $state.go($state.current, {}, {
      reload: true
    })
    $http({
      method: 'POST',
      url: '/updateClass',
      data: {
        userRole: $scope.userRole,
        userId: $scope.userUpdate,
        Id: $rootScope.classFilter
      }
    }).then(function(result) {});
  }
}
$scope.thisClass = function(classId, className) {
  $rootScope.classEdit = classId;
  $http({
    method: 'POST',
    url: '/editClassId',
    data: {
      classId: classId,
      className: className
    }
  }).then(function(result) {
    console.log(result)
  });
}

$scope.classView = [];
$scope.viewThisClass = function() {
  $http({
    method: 'GET',
    url: '/viewThisClass'
  }).then(function(result) {
    console.log(result.data)
    angular.forEach(result.data[0].role, function(eachOne) {
      $scope.classView.push(eachOne);
    })
  });
}

$scope.editThisClass = function() {
  if ($rootScope.classEdit == undefined) {
    $scope.allFields = "false"
    return
  } else
  $rootScope.classFilter = $rootScope.classEdit;
  $rootScope.classEdit = undefined;
  $state.go('editClass')
}
});