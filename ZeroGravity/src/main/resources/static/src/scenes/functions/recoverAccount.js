var recoverAccountPage = {
	socket:null
};

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

var docButt = document.getElementById('Submit');
var docEmailField = document.getElementById('EmailField');

docButt.addEventListener('click',function(){
	let msg = new Object();
    msg.event = 'RECOVER PASSWORD';
    msg.email = docEmailField.value;
	recoverAccountPage.socket.send(JSON.stringify(msg));

	swal("Good job!", "If the email is correct you will receive one email soon", "success")
	return false;
	
});

//Esto es para que al dar sumit no se recargue la pagina de nuevo
var form = document.getElementById("myForm");
function handleForm(event) { event.preventDefault(); } 
form.addEventListener('submit', handleForm);
