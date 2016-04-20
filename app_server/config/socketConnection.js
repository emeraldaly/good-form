//socket connection
module.exports = function(io){
  io.on('connection', function(socket){
    var users = [];
    //this changes to logged in user's name
    var username = " ";

    console.log('a user has connected at:' + socket.id);

    socket.on('request-users', function(){
      socket.emit('users', {users: users});
      console.log(users);
    });

    socket.on('add-user', function(data){
      io.emit('add-user', {
        username: data.username
      });
      username = data.username;
      users.push(data.username);
    });

    socket.on('message', function(data){
      io.emit('message', {
        username: username,
        message: data.message
      });
    });

    socket.on('disconnect', function(data){
      // console.log(username + ' has disconnected');
      console.log('User has disconnected from ', socket.id);
      // users.splice(users.indexOf(username), 1);
      // io.emit('remove-user', {username: username});
    });
  });
}
