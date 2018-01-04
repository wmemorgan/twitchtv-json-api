
function apiEndpoint(username, category) {
    // console.log(username);
    // console.log(category);
    // Declare API endpoints
    var endpoint = "https://wind-bow.gomix.me/twitch-api/"
        + category + "/" + username + "?callback=?";
    // console.log(endpoint);
    return endpoint;
}

function apiData(endpoint) {
    var jsonObject = $.getJSON(endpoint, function (data) {
        console.log(data);
    });
    return jsonObject;
}

function displayStreamInfo(data) {
    var logo = data["stream"]["channel"]["logo"];
    // console.log(logo);
    var display_name = data["stream"]["channel"]["display_name"];
    // console.log(display_name);
    var game = data["stream"]["channel"]["game"];
    // console.log(game);
    var preview = data["stream"]["channel"]["status"];
    // console.log(status)
    var channel_url = data["stream"]["channel"]["url"];
    // console.log(channel_url);
    $('.grid').append('<div class="logo">' + '<img src="' + logo + '" height="50" width="50">' + '</div>'
        + '<div class="display_name">'
        + '<a href="' + channel_url + '" target="_blank">'
        + display_name + '</a>' + '</div>'
        + '<div class="status">' + game + ': ' + preview + '</div>');
}

function displayChannelInfo(data) {
    var logo = data["logo"];
    // console.log(logo);
    var display_name = data["display_name"];
    // console.log(display_name);
    var game = data["game"];
    // console.log(game);
    var preview = data["status"];
    // console.log(status)
    var channel_url = data["url"];
    // console.log(channel_url);
    $('.grid').append('<div class="logo">' + '<img src="' + logo + '" height="50" width="50">' + '</div>'
        + '<div class="display_name">'
        + '<a href="' + channel_url + '" target="_blank">'
        + display_name + '</a>' + '</div>'
        + '<div class="status">' + '<h4>Offline</h4>' + '</div>');
}

var usernames = ["freecodecamp", "esl_sc2", "dotastarladder_en", "guit88man", "jasonr"]
// var i = 4;

for (i in usernames) {

var streamEndpoint = apiEndpoint(usernames[i], "streams")
var channelEndpoint = apiEndpoint(usernames[i], "channels")

$.when(
    apiData(streamEndpoint),
    apiData(channelEndpoint)
).done(function (streamData, channelData) { // handle the data they return here
    // do stuff with your data
    var streamJSON = streamData[2]["responseJSON"];
    var channelJSON = channelData[2]["responseJSON"];

    if (streamData[0]["stream"] == null) {
        console.log(channelJSON["display_name"], "is offline")
        console.log(channelJSON);
        displayChannelInfo(channelJSON)
    } else {
        console.log(streamJSON["stream"]["channel"]["display_name"], "is online")
        console.log(streamJSON);
        displayStreamInfo(streamJSON);
    }

});

}



