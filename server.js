var app = require('http').createServer(handler),
    io = require('socket.io').listen(app),
    fs = require('fs');

app.listen(process.env.PORT || 9000);

function handler(req, res){
    fs.readFile(__dirname + '/index.html',
        function (err, data) {
            if (err) {
                res.writeHead(500);
                return res.end('Error loading index.html');
            }
            res.writeHead(200);
            data = data.toString('utf-8').replace('<%=host%>', req.headers.host);
            res.end(data);
        }
    );
};

io.sockets.on('connection', function(socket){
  console.log('Socket ID : ' + socket.id + ', Connect');

  socket.on("normal", function(data){
    console.log(data);
     io.sockets.emit('normal', data);
  });

  socket.on("SpecialCall", function(data){
      console.log(data);
       io.sockets.emit('Call', data);
  });

  socket.on('disconnect', function() {
     console.log('Got disconnect!');
  });
});
