angular.module('classApp').controller('class', function($scope, $stateParams,$rootScope, $state,$http, $filter, NgTableParams) {
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
// get class
// get unassigned users
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

$state.transitionTo($state.current, angular.copy($stateParams), { reload: true, inherit: true, notify: true });
console.log($rootScope.classEdit)
   $http({
        method: 'POST',
        url: '/updateClass',
        data: {userRole:$scope.userRole,
          userId:$scope.userUpdate,
          Id:$rootScope.classEdit
        }
      }).then(function(result) {
  //  
        // 
        console.log(result)
      });
}

$scope.thisClass= function(classId){
  $rootScope.classEdit = classId;
  console.log("this is rootscope" + $rootScope.classEdit)

  $http({
        method: 'POST',
        url: '/editClassId',
        data: {classId:classId
        }
      }).then(function(result) {
        return $rootScope.classEdit;
        console.log(result)
      });  
}

$scope.classView = [];
$scope.viewThisClass = function(){
     $http({
        method: 'GET',
        url: '/viewThisClass'
       
      }).then(function(result) {
        
        console.log(result.data)
         angular.forEach(result.data[0].role, function (eachOne){
          $scope.classView.push(eachOne);
        })
  //  
        // 
        debugger
        console.log($scope.classView)
      });
  
}


$scope.editThisClass = function(){
         $state.go('editClass')
}
});