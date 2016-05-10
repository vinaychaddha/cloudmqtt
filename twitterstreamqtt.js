
// console.log(data) display all json data
// console.log(data.text) does not display tweet but says "undefined"
// what works is for loop and display of each character
// these crednetials are for @gvcdisplay handle
// 

var Twitter = require('twitter');
var mqtt = require('mqtt');

var clientmqtt  = mqtt.connect('mqtt://m12.cloudmqtt.com:16479', {
	username: 'sxdzesyk',
	password: 'dc_pY7Q7gOTw'
	} );

clientmqtt.on('connect', function () {
  console.log('connected to cloudmqtt');
  clientmqtt.subscribe('mqtt2serial/status');
 });
 
clientmqtt.on('message', function (topic, message) {
  // message is Buffer 
  console.log(message.toString());
});


var clienttwitter = new Twitter({
  consumer_key: '4qoDQy2xnBf0C6cCtVyaBh4nx',
  consumer_secret: 'FHzB0s1EptznmLfAwTPQTTf8AoB7yiybilcJMd7BCTefq6IM9j',
  access_token_key: '728902331849445377-Gzg6DsiDOxcc91TOsoEOVls7tQSOgTa',
  access_token_secret: '2eR9bPvoF4vzz0C2cnCakmrwIzpBB1P1cbMb8fCWHISEN'
});

clienttwitter.get('statuses/home_timeline',{ count:1  } , function(err, data)
{
//  console.log(data);	
  for (var i = 0; i < data.length ; i++) 
//    console.log(data[i].user.name);
      console.log(data[i].text);
});

clienttwitter.stream('statuses/filter', {track: 'gvcdisplay'}, function(stream) {
 stream.on('data', function(tweet) {
   console.log(tweet.text);
   clientmqtt.publish('mqtt2serial/command', tweet.text);
 });
 
 stream.on('error' , function(error) {
   throw error;
   });
 });



