var validateAccountPage = {
	socket:null
};

validateAccountPage.socket = new WebSocket("ws://" + location.href.substring(7).split("/")[0] + "/polaris");
	
	
validateAccountPage.socket.onopen = () => {
		console.log('[DEBUG] WebSocket connection opened on ValidateSite')
}
	
validateAccountPage.socket.onclose = () => {
		console.log('[DEBUG] WebSocket connection closed on ValidateSite')
}
	
validateAccountPage.socket.onmessage = (message) => {
	var msg = JSON.parse(message.data)	
	switch(msg.event){
		case 'VALIDATE EMAIL':
			break;
		default:
	}
}
/*
let msg = new Object();
msg.event = 'VALIDATE EMAIL';
msg.email = docEmailField.value;
validateAccountPage.socket.send(JSON.stringify(msg));*/
