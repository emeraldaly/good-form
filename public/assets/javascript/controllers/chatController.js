angular.module('classApp')
  .factory('Socket', ['socketFactory', function(socketFactory){
    return socketFactory();
  }])
  .controller('chatControl', ['$scope', 'Socket', function($scope, Socket){
    Socket.connect();

    // $scope.users = [];

    $scope.messages = [];

    //get username from persisted user username
    // var chatUsername = function(message) {

    // }

    $scope.sendMessage = function(msg) {
      if(msg != null && msg != '' && msg.length <= 150) {
        Socket.emit('message', {message:msg})
      } else {
        //alert this another way, ideally near the textarea
        alert("Keep it Twitter length please...");
      }
      $scope.msg = '';
    }

    // Socket.emit('request-users', {});

    // Socket.on('users', function(data){
    //   $scope.users = data.users;
    // });

    Socket.on('message', function(data) {
      console.log(data);
      console.log($scope.messages);
      $scope.messages.push(data);
      console.log($scope.messages);
    });

    // Socket.on('add-user', function(data) {
    //   $scope.users.push(data.username);
    //   $scope.messages.push({username: data.username, message: 'has arrived'});
    // });

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
