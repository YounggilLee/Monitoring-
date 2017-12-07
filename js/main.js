$(document).ready(function() {
//console.log(_.partition([1, 2, 3, 4], n => n % 2));

var connection = new autobahn.Connection({
    url : 'ws://138.197.146.172:8080/ws',
    realm: 'realm1'
    });
    
    connection.onopen = function (session) {
    
    console.log('websocket is connected ...')
    
    session.subscribe('com.test.temp', function(message) {
    
    console.log(message);
    });
    }
    
    connection.open();

}); // End ready function