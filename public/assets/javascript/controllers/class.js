angular.module('classApp').controller('class', function($scope, $stateParams,$rootScope, $state,$http, $filter, NgTableParams) {
  $scope.listOfUsers= []


// use the edit class Id on every class
// then use the bottom of the editclassId Page
// for the myclass Page

// view all classes
// click on a user to see thier userinfopage

$scope.repeatStyle ={'height': '35px',
'border-bottom': "1px lightGray solid",
'margin-top': '10px'};

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

$scope.removeFromClass = function(id){
  $state.go($state.current, {}, {
    reload: true
  });
  $http({
    method: 'POST',
    url: '/removeFromClass',
    data: {
      classId:$rootScope.classFilter,
      userId:id 
    }
  });
}


$scope.noDelete = function(){
  $scope.deleteChoice = 'false'
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
  $rootScope.userUpdate = id;
}
$scope.deleteClass = function() {
  if ($rootScope.classEdit == undefined) {
    $scope.allFields = "false"
    return
  } else{
    $state.go($state.current, {}, {
      reload: true,
    })
    $http({
      method: 'POST',
      url: '/deleteClass',
      data: {
        classId:$rootScope.classEdit
      }
    });
  }
}

$scope.updateClass = function() {
  if (($scope.userRole == undefined) || ($rootScope.userUpdate === undefined)) {
    $scope.allFields = "false"
    console.log($rootScope.userUpdate)
  } else {
    console.log($rootScope.userUpdate)
      // $state.transitionTo($state.current, $stateParams, { 
      //       reload: true, inherit: true, notify: true
      //     });
      $state.go($state.current, {}, {
        reload: true,
      })
      $http({
        method: 'POST',
        url: '/updateClass',
        data: {
          userRole: $scope.userRole,
          userId: $rootScope.userUpdate,
          Id: $rootScope.classFilter
        }
      }).then(function(result) {
        $rootScope.userUpdate = undefined;
      });
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
  $scope.userUpdate = undefined;
  $scope.classView = [];
  $scope.viewThisClass = function() {
    $http({
      method: 'GET',
      url: '/viewThisClass'
    }).then(function(result) {
      $scope.className = result.data[0].name
      console.log(result.data)
      angular.forEach(result.data[0].role, function(eachOne) {
        $scope.classView.push(eachOne);
      })
    });
  }

  $scope.deleteClassButton = function(){
    if ($rootScope.classEdit == undefined) {
      $scope.message = "Please select a class to continue";
    }
    else {
      $scope.deleteChoice = "true";
      $scope.message="";
    }
  }
  $scope.editThisClass = function() {
    if ($rootScope.classEdit == undefined) {
      $scope.message = "Please select a class to continue"
      $scope.allFields = "false"
      return
    } else {
      $rootScope.classFilter = $rootScope.classEdit;
      $rootScope.classEdit = undefined;
      $state.go('editClass')
    }
  }
});