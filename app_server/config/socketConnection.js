//socket connection
module.exports = function(io){
  io.on('connection', function(socket){

    //change this to logged in user's name
    var username = "st";
    console.log('a user has connected at:' + socket.id);

  // //   socket.on('request-users', function(){
  // //     socket.emit('users', {users: users});
  //   // });

  //   // socket.on('add-user', function(data){
  // //     if(users.indexOf(data.username) == -1){
  // //       io.emit('add-user', {
  // //         username: data.username
  // //       });
  // //       username = data.username;
  // //       users.push(data.username);
  //       // users.push(username);
  // //       User.save(function(err){
  // //         if (err) throw err;
  // //         console.log('user saved to db');
  // //       });
  // //     } else {
  // //       socket.emit('prompt-username', {
  // //         message : "User already exists"
  // //       })
  // //     }
  //   // });

    socket.on('message', function(data){
      //change this to logged in user's name
      var username = function(req, res){
        debugger
        console.log(req.session.user.firstname);
      };
      username();

      io.emit('message', {
        username: username,
        message: data.message
      });
    });

  //   // when the client emits 'typing', we broadcast it to others
  //     // socket.on('typing', function () {
  //     //   socket.broadcast.emit('typing', {
  //     //     username: socket.username
  //     //   });
  //     // });

  //     // when the client emits 'stop typing', we broadcast it to others
  //     // socket.on('stop typing', function () {
  //     //   socket.broadcast.emit('stop typing', {
  //     //     username: socket.username
  //     //   });
  //     // });

    socket.on('disconnect', function(data){
  //     // console.log(username + ' has disconnected');
      console.log('User has disconnected from ', socket.id);
  //   //   users.splice(users.indexOf(username), 1);
  //     // io.emit('remove-user', {username: username});
    });
  });
}
