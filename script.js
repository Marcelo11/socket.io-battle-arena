$( document ).ready(function() {
	var socket=io.connect();
	var txtMen = $("#txtMensaje");
	var color = $("#color");
	var eliminado;
	
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
	
	var bolitas="<div id='bolita"+i+"' class='bolita' type='bolita' name='bolita' style='background-color:"+posBol.color+";left:"+posBol.left+"px;top:"+posBol.top+"px'>"+i+"</div>"

	socket.emit("posicionar",bolitas);
	
	}
	
	});
	
	socket.on("posicionado",function(data){
		$("#plataforma").append(data);
		
		$("#plataforma div").on("mousemove",hacer);
	});
	
	function hacer(){
		eliminado=$(this);
		var $div1=$("#"+$(txtMen).val());
		
		var x1 = $div1.offset().left;
		var y1 = $div1.offset().top;
		var h1 = $div1.outerHeight(true);
		var w1 = $div1.outerWidth(true);
		var b1 = y1 + h1;
		var r1 = x1 + w1;
		var x2 = $(this).offset().left;
		var y2 = $(this).offset().top;
		var h2 = $(this).outerHeight(true);
		var w2 = $(this).outerWidth(true);
		var b2 = y2 + h2;
		var r2 = x2 + w2;
		
		if(b1 < y2|| y1 > b2|| r1 < x2 || x1> r2){ return false};
		
		$(eliminado).remove();
		
		var obj={
			eli:$(eliminado).text()
		}
		
		socket.emit("eliminar",obj);
			
		
	}
	
	socket.on("eliminado",function(data){
		$("#bolita" + data.eli).remove();
	});
	
	$("#boton").on("click",function(){
		var jugadorColor=$("#color").val();
		var jugadorBorde;
		
		if(jugadorColor=="#F44336"){
			jugadorBorde="#D21305";
		}
		if(jugadorColor=="#A4F21E"){
			jugadorBorde="#7FC407";
		}
		if(jugadorColor=="#2196F3"){
			jugadorBorde="#0173A8";
		}
		
		var objJugador={
			id: $(txtMen).val(),
			color: $(color).val(),
			borde:jugadorBorde
		}
		
		var obj={
			jugadorPrincipal:"<div id='" + objJugador.id + "' class='player' name='player' style='background-color:"+  objJugador.color + ";border: 5px solid " + objJugador.borde + " ' >" + objJugador.id + "</div>"
		}
		
		socket.emit("crear",obj);
	});
	
	socket.on("creado",function(data){
		$("body").append(data.jugadorPrincipal);
	});
	
	
 $("body").on("mousemove",function(data){
	 var miJugador={
		 jugador:$(txtMen).val(),
		 x:event.pageX,
		 y:event.pageY
	 }
	 
	 $("#"+$(txtMen).val()).css("left",event.pageX);
	 $("#"+$(txtMen).val()).css("top",event.pageY);
	 
	 socket.emit("mover",miJugador);
	 
 });
 
 socket.on("moviendo",function(data){
	 var move={
		 left:data.x,
		 top:data.y
	 }
	 
	 $("#"+ data.jugador).css(move);
	
	});
	
	
	
});