function startup() {
	window.addEventListener('message',function(event) {
		console.log('message received:  ' + event.data,event);
	},false);
}