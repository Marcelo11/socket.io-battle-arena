$( document ).ready(function() {
	var socket=io.connect();
	var txtMen = $("#txtMensaje");
	var color = $("#color");
	
	$("#boton").on("click",function(){
		$("#login-overlay").slideUp();
	});
	
	$("#mapa").on("click",function(){

	for(var i=1;i<100;i++){
		
	var c = Math.floor(Math.random() *5 )+ 1 ;
	var col;
	
	if (c==1) {
	  col="#F220E6"
	 }
	 if (c==2) {
	  col="#FF0000"

	 }
	 if (c==3) {
	  col="#00FF5A"
	 }
	 if (c==4) {
	  col="#FF4900"
	 }

	var posBol={
	 left:Math.floor(Math.random() * 2000) + 1,
	 top:Math.floor(Math.random() * 900) + 1,
	 color:col
	}
	
	var bolitas="<div id='"+i+"' class='bolita' type='bolita' name='bolita' style='background-color:"+posBol.color+";left:"+posBol.left+"px;top:"+posBol.top+"px'>"+i+"</div>"

	socket.emit("posicionar",bolitas);
	
	}
	
	});
	
	socket.on("posicionado",function(data){
		$("#plataforma").append(data);
	});
	
	$("#boton").on("click",function(){
		var jugadorColor=$("#color").val();
		var jugadorBorde;
		
		
		
	});
	
});