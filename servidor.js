var express = require("express");
app = express(),
servidor = require("http").createServer(app);
var io = require("socket.io").listen(servidor);

servidor.listen(4000);

app.use(express.static(__dirname + "/"));

app.get("/",function(req,res){
	res.sendfile(__dirname + "index.html");
});

io.on("connection",function(socket){
	
	socket.on("posicionar",function(data){
		io.sockets.emit("posicionado",data);
	});
	
	socket.on("crear",function(data){
		io.sockets.emit("creado",data);
	});
	
	socket.on("mover",function(data){
		io.sockets.emit("moviendo",data);
	});
	
});