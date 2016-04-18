angular.module('classApp').controller('attendance', function($scope, $stateParams,$rootScope, $state,$http, $filter, NgTableParams) {

// $scope.deleteAttend = function(){
//    $http({
//         method: 'POST',
//         url: '/deleteAttend'
//       }).then(function(result) {
//         $state.go("viewAttendDates")
//       })
// }

$scope.viewOlderAttend = function(){
  if ($rootScope.classEdit == undefined) {
    $scope.allFields = "false"
    return
  } else{
  $state.go("viewAttendDates")
  }
}

$scope.repeatStyle ={'height': '35px',
                      'border-bottom': "1px lightGray solid",
                      'margin-top': '10px'};


$scope.viewAttendDates = function(){
    $scope.attendDates = new NgTableParams({}, {
    getData: function($defer, params) {
      return $http.get('/viewAttendDates')
        .then(function(response) {
          debugger
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
$scope.deleteAttend = function() {
if ($rootScope.thisAttendId == undefined) {
    $scope.allFields = "false"
    return
  } else{
    $rootScope.thisAttendId = undefined
    $state.go($state.current, {}, {
        reload: true,
      })
    $http({
      method: 'POST',
      url: '/deleteAttend',
    }).then(function(result) {
//         
      });
  }
}

$scope.editAttend =function(editId){
  if ($rootScope.thisAttendId == undefined){
    $scope.allFields = "false";    
  }
  else{
    $rootScope.thisAttendId = undefined
    $state.go("viewAttend")
  }

}

$scope.thisAttend = function(id, date){
  $rootScope.dateAttend = date;
  $rootScope.thisAttendId = id;
   $http({
        method: 'POST',
        url: '/editAttend',
        data:{"editAttend":id}
      }).then(function(result) {
    })
}

$scope.newAttendance = function(){
    if ($rootScope.classEdit == undefined) {
    $scope.allFields = "false"
    return
  } else{
  
	 $http({
        method: 'POST',
        url: '/newAttendance'
      }).then(function(result) {
        
      });
      $state.go("editAttendance")
    }
}

$scope.updateAttend= function(id, here){
// $state.transitionTo($state.current, angular.copy($stateParams), { reload: true, inherit: true, notify: true });
	// $state.go("editAten")

	$http({
        method: 'POST',
        url: '/updateAttend',
        data:{"id":id, "here":here}
      }).then(function successCallback(response) {
    
    console.log(response)
   $state.transitionTo($state.current, angular.copy($stateParams), { reload: true, inherit: true, notify: true });
  }, function errorCallback(response) {
   
   console.log(response)
  });
}

$scope.test = function(){
("workin")
}

$scope.date = '';
$scope.students = [];
$scope.getAttend = function(){
		 $http({
        method: 'GET',
        url: '/getAttend'
      }).then(function(result) {
        $scope.date = new Date();
        angular.forEach(result.data[0].student, function (eachOne){
          $scope.students.push(eachOne);
        });
      });
}
})  //end of controller