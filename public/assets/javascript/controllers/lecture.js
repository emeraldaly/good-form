angular.module('classApp').controller('lecture', function($scope, $stateParams,$rootScope, $state,$http, $filter, NgTableParams) {

$scope.createLecture = function(){
	console.log( + " " + $scope.date) 
   $http({
        method: 'POST',
        url: '/createLecture',
        data:{"github":$scope.github, "info":$scope.info, 
        "videoLink":$scope.videoLink,"date":$scope.date,}
      }).then(function(result) {
        // $state.go("viewAttendDates")
      })
}

exports.viewLecture = function(req,res){
	//will be used to view all the lectures
}

exports.myLecture = function (req, res){
	//used to find lecture by the person logged in
  Lecture.find({
  class:{ $in:req.session.user._class}
  })
  .exec(function(err, docs){
      if(err){
        console.log(err);
        res.send(err);
      } else {
        res.send(docs);
      }
    });
}

}) //end of controller
