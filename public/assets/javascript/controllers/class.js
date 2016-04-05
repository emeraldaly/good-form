angular.module('classApp').controller('class', function($scope,  $state,$http, $filter, NgTableParams) {
$scope.listOfUsers= []
$scope.createClass = function(){
  $http({
        method: 'POST',
        url: '/createClass',
        data: {name:$scope.name, 
          datetime:$scope.datetime
        }
      }).then(function(result) {
        console.log(result)
      });
  
  }
  $scope.getAllUsers = function(){
$scope.zz = new NgTableParams({
  }, {
    getData: function($defer, params) {
      return $http.get('/getAllUsers')
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
  }



$scope.getClasses = function(){
$scope.classesTable = new NgTableParams({
  }, {
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
  })
}
$scope.userId = function(id){
  $scope.userUpdate = id;
}
$scope.updateClass = function(){ 
  debugger
   console.log($scope.userRole + $scope.userUpdate)
   $http({
        method: 'POST',
        url: '/updateClass',
        data: {userRole:$scope.userRole,
          userId:$scope.userUpdate
        }
      }).then(function(result) {
        // 
        console.log(result)
      });
}

$scope.thisClass= function(classId){
  $http({
        method: 'POST',
        url: '/editClassId',
        data: {classId:classId
        }
      }).then(function(result) {
        console.log(result)
      });  
}

$scope.editThisClass = function(){
         $state.go('editClass')
}
});