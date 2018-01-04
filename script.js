
function apiEndpoint(username, category) {
    // Declare API endpoints
    var endpoint = "https://wind-bow.gomix.me/twitch-api/"
        + category + "/" + username + "?callback=?";
    return endpoint;
}

function apiData(endpoint) {
    // Call API data
    var jsonObject = $.getJSON(endpoint, function (data) {
        console.log(data);
    });
    return jsonObject;
}

function displayStreamInfo(data) {
    var logo = data["stream"]["channel"]["logo"];
    var display_name = data["stream"]["channel"]["display_name"];
    var game = data["stream"]["channel"]["game"];
    var preview = data["stream"]["channel"]["status"];
    var channel_url = data["stream"]["channel"]["url"];
    // Display stream data
    $('.grid').append('<div class="logo online">' + '<img src="' + logo + '" height="50" width="50">' + '</div>'
        + '<div class="display_name online">'
        + '<a href="' + channel_url + '" target="_blank">'
        + display_name + '</a>' + '</div>'
        + '<div class="status online">' + game + ': ' + preview + '</div>');
}

function displayChannelInfo(data) {
    var logo = data["logo"];
    var display_name = data["display_name"];
    var game = data["game"];
    var preview = data["status"];
    var channel_url = data["url"];
    // Display channel data
    $('.grid').append('<div class="logo offline">' + '<img src="' + logo + '" height="50" width="50">' + '</div>'
        + '<div class="display_name offline">'
        + '<a href="' + channel_url + '" target="_blank">'
        + display_name + '</a>' + '</div>'
        + '<div class="status offline">' + '<h4>Offline</h4>' + '</div>');
}

var usernames = ["freecodecamp", "esl_sc2", "test_channel", "dotastarladder_en", "guit88man", "jasonr"]

for (i in usernames) {

var streamEndpoint = apiEndpoint(usernames[i], "streams")
var channelEndpoint = apiEndpoint(usernames[i], "channels")

$.when(
    apiData(streamEndpoint),
    apiData(channelEndpoint)
).done(function (streamJSON, channelJSON) {
   
    var streamData = streamJSON[2]["responseJSON"];
    var channelData = channelJSON[2]["responseJSON"];

    // Evaluate if user is streaming live
    if (streamData["stream"] == null) {
        console.log(channelData["display_name"], "is offline")
        console.log(channelData);
        displayChannelInfo(channelData)
    } else {
        console.log(streamData["stream"]["channel"]["display_name"], "is online")
        console.log(streamData);
        displayStreamInfo(streamData);
    }

});

}



