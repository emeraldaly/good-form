angular.module('classApp').controller('homework', function($scope, $rootScope, $state,$http, $filter, NgTableParams) {

$scope.submitHw = function(){
  $state.go("myHomework")
  $http({
        method: 'POST',
        url: '/submitHw',
        data: {github:$scope.github,
          heroku:$scope.heroku
        }
      }).then(function(result) {
        console.log(result)
      });  
}

$scope.uncompleted = []
$scope.uncompletedSubmission = function(){
  $http({
        method: 'GET',
        url: '/uncompletedSubmission',
      }).then(function(result) {

        angular.forEach(result.data, function (eachOne){
          $scope.uncompleted.push(eachOne);
      })
  });  

}
$scope.homeworkByClass = function(){
  if ($rootScope.classEdit == undefined) {
    $scope.allFields = "false";

  }
  else{
  $rootScope.classEdit = undefined
  $state.go("viewHomeworkByClass")
  }

}

$scope.viewSubmissions = function(){
$scope.submissions = new NgTableParams({
  }, {
    getData: function($defer, params) {
      return $http.get('/viewSubmissions')
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




  //  $http({
  //       method: 'GET',
  //       url: '/viewSubmissions',
  //     }).then(function(result) {
           
  //       angular.forEach(result.data, function (eachOne){
  //         $scope.homeworks.push(eachOne);
  //     })
  // });  
}

$scope.submissionsPage = function(){
    $state.go("homeworkSubmissions")
}
$scope.thisHomework= function(homeworkId){
  $scope.homeworkId = homeworkId;
  $http({
        method: 'POST',
        url: '/thisHomework',
        data: {homeworkId:homeworkId
        }
      }).then(function(result) {
        console.log(result)
      });  
}

$scope.goToSubmit=function(){
  if ($scope.homeworkId == undefined){
    $scope.message = "please selct an assignment"
  }
  else{
    $state.go("submitHomework")
  }
}

$scope.viewHomeworkByClass= function(){
$scope.homeworks = new NgTableParams({
  }, {
    getData: function($defer, params) {
      return $http.get('/viewHomeworkByClass')
      .then(function(response) {
         var classes = response.data
            var filteredData = $filter('filter')(classes, params.filter())
        var sortedData = $filter('orderBy')(filteredData, params.orderBy());
        console.log(sortedData)
        return classes;
     });
     
    }
  });
}

$scope.createHomework = function(){ 
   if ($rootScope.classEdit == undefined) {
    $scope.allFields = "false"
  }
  else{
    $rootScope.classEdit = undefined;
    $state.go($state.current, {}, {
    reload: true
  });
    $http({
        method: 'POST',
        url: '/createHomework',
        data: {description:$scope.description,
          name:$scope.name,
          duedate:$scope.duedate,
          duetime:$scope.duetime
        }
      }).then(function(result) {
        console.log(result)
      });  
  }
 
}

$scope.assignments=[]
$scope.getAssignments = function(){
	 $http({
        method: 'GET',
        url: '/viewAssignments',
      }).then(function(result) {
        angular.forEach(result.data.assignment, function (eachOne){
          $scope.assignments.push(eachOne);
      })
  });  
}

})//end of controller