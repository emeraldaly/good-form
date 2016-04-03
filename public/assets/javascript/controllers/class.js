angular.module('classApp').controller('class', function($scope, $http, $filter, NgTableParams) {

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





$scope.showClasses = function(){
    
$scope.classesTable.reload();
  
  }


});