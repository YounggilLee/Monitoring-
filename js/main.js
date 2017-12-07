
$(document).ready(function() {
//console.log(_.partition([1, 2, 3, 4], n => n % 2));

var ws = new WebSocket('ws://138.197.146.172:8080/ws','wamp.2.json');
ws.onopen = function () {
console.log('websocket is connected ...')
ws.send('Thank you for accepting this Web socket')
}
ws.onmessage = function (ev) {
console.log(ev);
    }
}); // End ready function