angular.module('classApp')
  .factory('Socket', ['socketFactory', function(socketFactory){
    return socketFactory();
  }])
  .controller('chatControl', ['$scope','Socket','$cookies','$rootScope', '$http', function($scope, Socket, $cookies, $rootScope, $http){
    Socket.connect();

    $scope.users = [];

    $scope.messages = [];

    //get username from persisted user username
    // var chatUsername = function(message) {

    // }

    $scope.getUser = function(){
      $http.get('/getUser')
      .then(function(res){
        console.log("Get user response:", res);
        console.log("This user res: " + res.data.firstname +' ' +res.data.lastname[0] + '.');
      });
    }

    $scope.sendMessage = function(msg) {
      if(msg != null && msg != '' && msg.length <= 150) {
        Socket.emit('message', {message:msg})
      } else {
        //alert this another way, ideally near the textarea
        alert("Keep it Twitter length please...");
      }
      $scope.msg = '';
    }

    if($cookies.get('currentUser')){
      console.log($cookies.get('currentUser'));
      Socket.emit('add-user', {username: $rootScope.currentUser});
    } else {
      alert('You need to sign in to chat');
    }

    // Socket.emit('request-users', {});

    // Socket.on('users', function(data){
    //   $scope.users = data.users;
    // });

    Socket.on('message', function(data) {
      $scope.messages.push(data);
      console.log($scope.messages);
    });

    Socket.on('add-user', function(data) {
      $scope.users.push(data.username);
      $scope.messages.push({username: data.username, message: 'has arrived'});
    });

    // Socket.on('remove-user', function(data){
    //   $scope.users.splice($scope.users.indexOf(data.username),1);
    //   $scope.messages.push({username: data.username, message: 'left'});
    // });

    // Socket.on('prompt-username', function(data){
    //   chatUsername(data.message);
    // });

    // $scope.$on('$locationChangeStart', function(event){
    //   Socket.disconnect(true);
    // });
  }]);
