var recoverAccountPage = {
	socket:null,
	recoverfunction:null
};


window.onload = function() {
	recoverAccountPage.socket = new WebSocket("ws://" + location.href.substring(7).split("/")[0] + "/polaris");
	
	
	recoverAccountPage.socket.onopen = () => {
		console.log('[DEBUG] WebSocket connection opened on RecoverPasswordSite')
	}
	
	recoverAccountPage.socket.onclose = () => {
			console.log('[DEBUG] WebSocket connection closed on RecoverPasswordSite')
	}
	
	recoverAccountPage.socket.onmessage = (message) => {
		var msg = JSON.parse(message.data)
		
		switch(msg.event){
			case 'RECOVERED PASSWORD':
				break;
			default:
		}
	}

	var docButt = document.getElementById('Summit');
	var docEmailField = document.getElementById('EmailField');

	docButt.addEventListener('click',function(pointer, localX, localY, event){
		let msg = new Object();
        msg.event = 'RECOVER PASSWORD';
        msg.email = docEmailField.value;
		recoverAccountPage.socket.send(JSON.stringify(msg));
	});
}