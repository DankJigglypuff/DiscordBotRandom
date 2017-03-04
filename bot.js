var DiscordClient = require('discord.io');
var bot = new DiscordClient({
    autorun: true,
    email: "lolyouthoughtyoucould@gmail.com", // email
    password: "StealMyMemes", // password
    //OR
    token: ""
});

bot.on('ready', function() {
    console.log(bot.username + " - (" + bot.id + ")");
});

bot.on('message', function(user, userID, channelID, message, rawEvent) {
   if (message === "boobsorbutts") {
		var rollDie = getRandomizer( 1, 8 );
		var results = "";
		results = rollDie;
		
		if (results === 1){
		   sendFiles(channelID, ["1.png"]);
		}
		if (results === 2){
		   sendFiles(channelID, ["2.png"]);
		}
		if (results === 3){
		   sendFiles(channelID, ["3.jpg"]);
		}
		if (results === 4){
		   sendFiles(channelID, ["4.png"]);
		}
		if (results === 5){
		   sendFiles(channelID, ["5.png"]);
		}
		if (results === 6){
		   sendFiles(channelID, ["6.gif"]);
		}
		if (results === 7){
		   sendFiles(channelID, ["7.jpg"]);
		}
		if (results === 8){
		   sendFiles(channelID, ["8.jpg"]);
		}
	}
});

function getRandomizer(bottom, top) {
    return function() {
        return Math.floor( Math.random() * ( 1 + top - bottom ) ) + bottom;
    }
}

function sendFiles(channelID, fileArr, interval) {
	var resArr = [], len = fileArr.length;
	var callback = typeof(arguments[2]) === 'function' ? arguments[2] : arguments[3];
	if (typeof(interval) !== 'number') interval = 1000;

	function _sendFiles() {
		setTimeout(function() {
			if (fileArr[0]) {
				bot.uploadFile({
					to: channelID,
					file: fileArr.shift()
				}, function(err, res) {
					if (err) {
						resArr.push(err);
					} else {
						resArr.push(res);
					}
					if (resArr.length === len) if (typeof(callback) === 'function') callback(resArr);
				});
				_sendFiles();
			}
		}, interval);
	}
	_sendFiles();
}
