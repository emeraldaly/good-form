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

  $http({
        method: 'GET',
        url: '/getAllUsers',
      }).then(function(result) {
        // 
          angular.forEach(result.data, function (eachOne){
          $scope.listOfUsers.push(eachOne);
        })
      });
  }
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
  });
$scope.userId = function(id){
  $scope.userUpdate = id;
}
$scope.updateClass = function(){
   console.log($scope.userUpdate)
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
  
     $state.go('editClass')
  $http({
        method: 'POST',
        url: '/editClassId',
        data: {classId:classId
        }
      }).then(function(result) {
        // 
        $state.go('editClass')
        console.log(result)
      });  
}

});