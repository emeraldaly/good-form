var classApp = angular.module('classApp', ['ui.bootstrap','ui.router', 'btford.socket-io', 'ngTable', 'ngCookies']);

classApp.config(function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/views/info.html')
  $stateProvider
  // HOME STATES AND NESTED VIEWS ========================================
  .state('home', {
    url: '/home',
    templateUrl: '/views/home.html'
  })
  .state('allUsersView', {
    url: '/allUsersView',
    templateUrl: '/views/allUsersView.html'
  })
  .state('myLecture', {
    url: '/myLecture',
    templateUrl: '/views/myLecture.html'
  })
  .state('updateLecture', {
    url: '/updateLecture',
    templateUrl: '/views/updateLecture.html'
  })
.state('lectures', {
    url: '/lectures',
    templateUrl: '/views/lectures.html'
  })
.state('viewLecture', {
    url: '/viewLecture',
    templateUrl: '/views/viewLecture.html'
  })
  .state('createLecture', {
    url: '/createLecture',
    templateUrl: '/views/createLecture.html'
  })
    .state('editAttend', {
    url: '/editAttend',
    templateUrl: '/views/editAttend.html'
  })
  .state('viewAttendDates', {
    url: '/viewAttendDates',
    templateUrl: '/views/viewAttendDates.html'
  })
   .state('viewAttend', {
    url: '/viewAttend',
    templateUrl: '/views/viewAttend.html'
  })
  .state('attendance', {
    url: '/attendance',
    templateUrl: '/views/attendance.html'
  })
    .state('submitHomework', {
    url: '/submitHomework',
    templateUrl: '/views/submitHomework.html'
  })
     .state('editAttendance', {
    url: '/editAttendance',
    templateUrl: '/views/editAttendance.html'
  })
   .state('homeworkSubmissions', {
    url: '/homeworkSubmissions',
    templateUrl: '/views/homeworkSubmissions.html'
  })
   .state('viewHomeworkByClass', {
    url: '/viewHomeworkByClass',
    templateUrl: '/views/viewHomeworkByClass.html'
  })
  .state('register', {
    url: '/register',
    templateUrl: '/views/register.html'
  })
  .state('addUser', {
    url: '/addUser',
    templateUrl: '/views/addUser.html'
  })
  .state('class', {
    url: '/class',
    templateUrl: '/views/class.html'
  })
  .state('showClasses', {
    url: '/showClasses',
    templateUrl: '/views/showClasses.html'
  })
  .state('createClass', {
    url: '/createClass',
    templateUrl: '/views/createClass.html'
  })
  .state('info', {
    url: '/info',
    templateUrl: '/views/info.html'
  })
  .state('chat', {
    url: '/chat',
    templateUrl: '/views/chat.html',
    controller: 'chatControl'
  })
  .state('editClass', {
    url: '/editClass',
    templateUrl: '/views/editClass.html'
  })
  .state('metrics', {
    url: '/metrics',
    templateUrl: '/views/metrics.html'
  })
  .state('metricshw', {
    url: '/metricshw',
    templateUrl: '/views/metrics_hw.html'
  })
  .state('createHomework', {
    url: '/createHomework',
    templateUrl: '/views/createHomework.html'
  })
  .state('myClass', {
    url: '/myClass',
    templateUrl: '/views/myClass.html'
  })
   .state('myClassStudents', {
    url: '/myClassStudents',
    templateUrl: '/views/myClassStudents.html'
  })
  .state('myHomework', {
    url: '/myHomework',
    templateUrl: '/views/myHomework.html'
  })
  .state('updateUser', {
    url: '/updateUser',
    templateUrl: '/views/updateUser.html'
  })
  .state('lectureLinks', {
    url: '/lectureLinks',
    templateUrl: '/views/lectureLinks.html'
  })
  // .state('login', {
  //   url: '/splash',
  //   templateUrl: '/splash.html'
  // })
});
classApp.run(['$state', function ($state) {
   $state.transitionTo('info');
}])

classApp.controller('newUser', function($scope, $http, $state, $rootScope) {
  $scope.addUser = function(){
    console.log($scope.userFirstName)
    $http({
      method: 'POST',
      url: '/addUser',
      data: {username:$scope.userEmail,
        userRole:$scope.userRole,
        userPassword:$scope.userPassword,
        userFirstName:$scope.userFirstName,
        userLastName:$scope.userLastName,
      }
    }).then(function(result) {
      if (result.data == "taken"){
       $scope.userTaken="This email was already used, please try another";
      }
      else{
        $state.go($state.current, {}, {reload: true});
        $rootScope.message = "New User Created!";

      }
      $state.go('login');
    });
  };

  $scope.register = function(){
    $http({
      method: 'POST',
      url: '/newUser',
      data: {username:$scope.userEmail,
        organizationName:$scope.organizationName,
        address:$scope.address,
        website:$scope.website,
        userRole:$scope.userRole,
        userPassword:$scope.userPassword,
        userFirstName:$scope.userFirstName,
        userLastName:$scope.userLastName,
      }
    }).then(function(result) {
      console.log(result)
      }
    );
  }
});

classApp.controller('loginController',['$scope', '$http', '$state','$rootScope', '$cookies',  function($scope, $http, $state, $rootScope, $cookies) {

  $scope.login = function(){
    $http({
      method: 'POST',
      url: '/login',
      data: {
        username:$scope.userEmail,
        password:$scope.userPassword,
      }
    })
    .then(function(result){
      $state.go('home');
    }, function(err){
      console.log("Login error ", err);
    });
  }
}]);

classApp.controller('fEventCalendar', function($scope, $http){
  //$scope.clicked = function () {
   // console.log('this has been clicked-hurrah!')
  //}
  $scope.addEvent = function() {
    // console.log('where are all the turkeys?')
    //console.log("where does the grass grow best?")
     $http({
      method: 'POST',
      url: '/addEvent',
      data: {
        title: $scope.title,
        start: $scope.start
        }
      }).then(function(result) {
        console.log(result.data)
      });

   }
 });


classApp.controller('navbarController', function($scope, $window, $http){
  
  $scope.logout = function() {
    $window.location.href='/'
    // console.log('where are all the turkeys?')
    //console.log("where does the grass grow best?")
     $http({
      method: 'GET',
      url: '/logout',
      }).then(function(result) {
        console.log("logout hit");
      });
     
   }
 });


classApp.controller('metricsController', function($scope, $http, $state) {
  $scope.metrics = function() {
      $state.go('metrics');
  }
  
  	$scope.nested = function(){
		$state.go('metricshw');
	};
  });
  
classApp.directive('attendanceChart', function(){
function link(scope, element, attr){
var data = scope.data; 
//var color = d3.scale.category10();
//var data = [10, 20, 30];
//var width = 300;
//var height = 300;
//var min = Math.min(width, height);
//var svg = d3.select(element[0]).append('svg');
//var pie = d3.layout.pie().sort(null);
//var arc = d3.svg.arc()
// .outerRadius(min / 2 * 0.9)
// .innerRadius(min / 2 * 0.5);
//
// svg.attr({width: width, height: height});
//
// var g = svg.append('g')
// // center the donut chart
// .attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')');
//
// // add the <path>s for each arc slice
// g.selectAll('path').data(pie(data))
// .enter().append('path')
// .style('stroke', 'white')
// .attr('d', arc)
// .attr('fill', function(d, i){ return color(i) });
var width = 200,
    height = 250;

var fill = d3.scale.category10();

var nodes = d3.range(10).map(function(i) {
  return {index: i};
});

var force = d3.layout.force()
    .nodes(nodes)
    .size([width, height])
    .on("tick", tick)
    .start();

var svg = d3.select("div.testdiv").append("svg")
    .attr("width", width)
    .attr("height", height);

var node = svg.selectAll(".node")
    .data(nodes)
  .enter().append("circle")
    .attr("class", "node")
    .attr("cx", function(d) { return d.x; })
    .attr("cy", function(d) { return d.y; })
    .attr("r", 12)
    .style("fill", function(d, i) { return fill(i & 3); })
    .style("stroke", function(d, i) { return d3.rgb(fill(i & 3)).darker(2); })
    .call(force.drag)
    .on("mousedown", function() { d3.event.stopPropagation(); });

  
svg.style("opacity", 1e-6)
  .transition()
    .duration(300)
    .style("opacity", 1);

d3.select("body")
    .on("mousedown", mousedown);

function tick(e) {

  // Push different nodes in different directions for clustering.
  var k = 1 * e.alpha;
  nodes.forEach(function(o, i) {
    o.y += i & 1 ? k : -k;
    o.x += i & 2 ? k : -k;
  });

  node.attr("cx", function(d) { return d.x; })
      .attr("cy", function(d) { return d.y; });
}
//
//function mousedown() {
//  nodes.forEach(function(o, i) {
//    o.x += (Math.random() - .5) * 40;
//    o.y += (Math.random() - .5) * 40;
//  });
//  force.resume();
//}



}
 return {
 link: link,
 restrict: 'E',
 scope: { data: '=' }
 }
 });

angular.module('classApp').run(function($rootScope, $cookies){
  if($cookies.get('token') && $cookies.get('currentUser')){
    $rootScope.token = $cookies.get('token');
    $rootScope.currentUser = $cookies.get('currentUser');
  }
});
