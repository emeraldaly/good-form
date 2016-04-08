angular.module('classApp').controller('homework', function($scope,  $state,$http, $filter, NgTableParams) {

$scope.submitHw = function(){
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

$scope.homeworkByClass = function(){
  console.log("hit it")
  $state.go("viewHomeworkByClass")
}

$scope.submissionsPage = function(){
    $state.go("homeworkSubmissions")
}
$scope.thisHomework= function(homeworkId){
  console.log(homeworkId)
  $http({
        method: 'POST',
        url: '/thisHomework',
        data: {homeworkId:homeworkId
        }
      }).then(function(result) {
        console.log(result)
      });  
}

$scope.homeworks=[]
$scope.viewHomeworkByClass= function(){

  
   $http({
        method: 'GET',
        url: '/viewHomeworkByClass',
      }).then(function(result) {
        
        angular.forEach(result.data, function (eachOne){
          $scope.homeworks.push(eachOne);
      })
  });  
}

$scope.createHomework = function(){
  
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