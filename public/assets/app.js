var classApp = angular.module('classApp', ['ui.bootstrap', 'ui.router', 'btford.socket-io', 'ngTable', 'ngCookies']);

classApp.config(function ($stateProvider, $urlRouterProvider) {
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
});
classApp.run(['$state', function ($state) {
  $state.transitionTo('info');
}])

classApp.controller('newUser', function ($scope, $http, $state, $rootScope) {
  $scope.addUser = function () {
    console.log($scope.userFirstName)
    $http({
      method: 'POST',
      url: '/addUser',
      data: {
        username: $scope.userEmail,
        userRole: $scope.userRole,
        userPassword: $scope.userPassword,
        userFirstName: $scope.userFirstName,
        userLastName: $scope.userLastName,
      }
    }).then(function (result) {
      if (result.data == "taken") {
        $scope.userTaken = "This email was already used, please try another";
      } else {
        $state.go($state.current, {}, {
          reload: true
        });
        $rootScope.message = "New User Created!";

      }
      $state.go('login');
    });
  };

  $scope.register = function () {
    $http({
      method: 'POST',
      url: '/newUser',
      data: {
        username: $scope.userEmail,
        organizationName: $scope.organizationName,
        address: $scope.address,
        website: $scope.website,
        userRole: $scope.userRole,
        userPassword: $scope.userPassword,
        userFirstName: $scope.userFirstName,
        userLastName: $scope.userLastName,
      }
    }).then(function (result) {
      console.log(result)
    });
  }
});

classApp.controller('loginController', ['$scope', '$http', '$state', '$rootScope', '$cookies', function ($scope, $http, $state, $rootScope, $cookies) {

  $scope.login = function () {
    $http({
        method: 'POST',
        url: '/login',
        data: {
          username: $scope.userEmail,
          password: $scope.userPassword,
        }
      })
      .then(function (result) {
        $state.go('home');
      }, function (err) {
        console.log("Login error ", err);
      });
  }
}]);

classApp.controller('fEventCalendar', function ($scope, $http) {
  $scope.addEvent = function () {
    $http({
      method: 'POST',
      url: '/addEvent',
      data: {
        title: $scope.title,
        start: $scope.start
      }
    }).then(function (result) {
      console.log(result.data)
    });

  }
});


classApp.controller('navbarController', function ($scope, $window, $http) {

  $scope.logout = function () {
    $window.location.href = '/'
    $http({
      method: 'GET',
      url: '/logout',
    }).then(function (result) {
      console.log("logout hit");
    });
  }
});

classApp.controller('metricsController', function ($scope, $http) {
$scope.githubs = [];
$scope.firstnames = [];
$scope.lastnames = [];
$scope.repos = [];
$scope.commits = [];
$scope.name = "";
$scope.data = [];

$scope.getAllUsersGithub = function () {
  $http({
    method: 'GET',
    url: '/getAllUsersGithub',
  }).then(function (results) {
    angular.forEach(results.data, function (eacher) {
      $scope.githubs.push({
        fname: eacher.firstname,
        lname: eacher.lastname,
        github: eacher.github
      });
    });
  });
}

$scope.githubLookup = function () {
  console.log($scope.repeatSelect);
  $http.get('https://api.github.com/users/' + $scope.repeatSelect + '/repos')
    .then(function (response) {
      angular.forEach(response.data, function (eacher) {
        $scope.repos.push({
          fullname: eacher.full_name
        });
        console.log($scope.repos);
      })
      angular.forEach($scope.repos, function (eacher) {
        $http.get('https://api.github.com/repos/' + eacher.fullname + "/commits")
          .then(function (response) {
            console.log(response);
            $scope.commits.push(response.data.length);

          });
        $scope.commits = $scope.data;
      });
    })
};

});

classApp.directive('donutChart', function(){
  function linkster(scope, el, attr){
    var color = d3.scale.category10();
    var width = 425;
    var height = 425;
    var min = Math.min(width, height);
    var svg = d3.select(el[0]).append('svg');
    var pie = d3.layout.pie().sort(null);
    var arc = d3.svg.arc()
      .outerRadius(min / 2 * 0.9)
      .innerRadius(min / 2 * 0.5);

    svg.attr({width: width, height: height});

    // center the donut chart
    var g = svg.append('g')
      .attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')');
    
    // add the <path>s for each arc slice
    var arcs = g.selectAll('path');

    scope.$watch('data', function(data){
      if(!data){ return; }
      arcs = arcs.data(pie(data));
      arcs.exit().remove();
      arcs.enter().append('path')
        .style('stroke', 'white')
        .attr('fill', function(d, i){ return color(i) });
      // update all the arcs (not just the ones that might have been added)
      arcs.attr('d', arc);
    }, true);
  }
  return {
    link: linkster,
    restrict: 'E',
    scope: { data: '=' }
  };
});

