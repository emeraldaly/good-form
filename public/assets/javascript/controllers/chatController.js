angular.module('classApp')
  .factory('Socket', ['socketFactory', function(socketFactory){
    return socketFactory();
  }])
  .controller('chatControl', ['$scope','Socket','$cookies','$rootScope', '$http', function($scope, Socket, $cookies, $rootScope, $http){
    Socket.connect();


    $scope.getUser = function() {
      $http({
        method: 'GET',
        url: '/getUser'
      })
      .then(function(res){
        $cookies.put('currentUser', res.data.firstname +' ' + res.data.lastname[0] + '.');
        console.log("Current user is", $cookies.get('currentUser'));
      });
    }

    // $scope.sendMessage = function(msg) {
    //   if(msg != null && msg != '' && msg.length <= 150) {
    //     Socket.emit('message', {message:msg})
    //   } else {
    //     //alert this another way, ideally near the textarea
    //     alert("Keep it Twitter length please...");
    //   }
    //   $scope.msg = '';
    // }

    $scope.users = [];

     $scope.messages = [];

     if($cookies.get('token') && $cookies.get('currentUser')){
       console.log($cookies.get('currentUser') + "is here to chat");
       Socket.emit('add-user', {username: $rootScope.currentUser});
     } else {
       bootbox.alert('You need to sign in to chat');
     }

     if($cookies.get('token')){
       $scope.sendMessage = function(msg) {
         if(msg != null && msg != '' && msg.length <= 140) {
           Socket.emit('message', {message:msg})
         } else {
           bootbox.alert("You cannot leave an empty message and it must be less than 140 characters");
         }
         $scope.msg = '';
       }
     }


     Socket.emit('request-users', {});



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
       $scope.messages.push({username: data.username, message: 'has left the building'});
     });


     $scope.$on('$locationChangeStart', function(event){
       Socket.disconnect(true);
     })

  }]);

   // $scope.users = [];

   //  $scope.messages = [];

   //  //get username from persisted user username
   //  // var chatUsername = function(message) {

   //  // }

   //  console.log($rootScope);
   //  console.log($cookies.getAll());



   //  $scope.getUser = function() {
   //    $http({
   //      method: 'GET',
   //      url: '/getUser'
   //    })
   //    .then(function(res){
   //      $cookies.put('currentUser', res.data.firstname +' ' + res.data.lastname[0] + '.');
   //      console.log("Current user is", $cookies.get('currentUser'));
   //    });
   //  }

   //  $scope.sendMessage = function(msg) {
   //    if(msg != null && msg != '' && msg.length <= 150) {
   //      Socket.emit('message', {message:msg})
   //    } else {
   //      //alert this another way, ideally near the textarea
   //      alert("Keep it Twitter length please...");
   //    }
   //    $scope.msg = '';
   //  }

   //  // Socket.emit('request-users', {});

   //  // Socket.on('users', function(data){
   //  //   $scope.users = data.users;
   //  // });

   //  Socket.on('message', function(data) {
   //    console.log(data);
   //    console.log($scope.messages);
   //    $scope.messages.push(data);
   //    console.log($scope.messages);
   //  });

   //  // Socket.on('add-user', function(data) {
   //  //   $scope.users.push(data.username);
   //  //   $scope.messages.push({username: data.username, message: 'has arrived'});
   //  // });

   //  // Socket.on('remove-user', function(data){
   //  //   $scope.users.splice($scope.users.indexOf(data.username),1);
   //  //   $scope.messages.push({username: data.username, message: 'left'});
   //  // });

   //  // Socket.on('prompt-username', function(data){
   //  //   chatUsername(data.message);
   //  // });

   //  // $scope.$on('$locationChangeStart', function(event){
   //  //   Socket.disconnect(true);
   //  // });
