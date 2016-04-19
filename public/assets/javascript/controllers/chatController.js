angular.module('classApp')
  .factory('Socket', ['socketFactory', function(socketFactory){
    return socketFactory();
  }])
  .controller('chatControl', ['$scope','Socket','$cookies','$rootScope', '$http', function($scope, Socket, $cookies, $rootScope, $http){
    Socket.connect();

    $scope.users = [];

    $scope.messages = [];

    $scope.getUser = function() {
      $http({
        method: 'GET',
        url: '/getUser'
      })
      .then(function(res){
        $cookies.put('currentUser', res.data.firstname +' ' + res.data.lastname[0] + '.');
      });
    }

    if($cookies.get('currentUser')){
      console.log($cookies.get('currentUser') + "is the currentUser");
      Socket.emit('add-user', {username: $rootScope.currentUser});
    } else {
      alert('Make sure your cookies are enabled to use chat');
    }


      $scope.sendMessage = function(msg) {
        console.log(msg);
        if(msg != null && msg != '' && msg.length <= 150) {
          Socket.emit('message', {message:msg})
        } else {
         alert("Please keep it Twitter length");
        }
        $scope.msg = '';
      }


     // Socket.emit('request-users', {});

     Socket.on('users', function(data){
       $scope.users = data.users;
     });

     Socket.on('message', function(data) {
       $scope.messages.push(data);
     });

     Socket.on('add-user', function(data) {
       $scope.users.push(data.username);
       $scope.messages.push({username: data.username, message: 'has arrived'});
     });

     Socket.on('remove-user', function(data){
       $scope.users.splice($scope.users.indexOf(data.username),1);
       $scope.messages.push({username: data.username, message: 'has left the chat'});
     });

     $scope.$on('$locationChangeStart', function(event){
       Socket.disconnect(true);
     })
  }]);
