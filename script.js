
$(document).ready(function () {

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
    $('.grid').append('<div class="logo online">' + '<img src="' + logo + '">' + '</div>'
        + '<div class="display_name online">'
        + '<a href="' + channel_url + '" target="_blank">'
        + display_name + '</a>' + '</div>'
        + '<div class="status online">' + game + '<div class="preview">' + ': ' + preview + '</div>' + '</div>');
        // + '<div class="status online">' + game + ': ' + preview.slice(0, 48) + '...' + '</div>');
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
        + '<div class="status offline">' + '<h4>Offline</h4>' + '</div>'
    );
}

function listAllStreams() {
    $('#listAll').click(function(){
        $('.online').show();
        $('.offline').show();
    });
}

function listOnlineStreams() {
    $('#listOnline').click(function(){
        $('.offline').hide();
    });
}

function listOfflineStreams() {
    $('#listOffline').click(function () {
        $('.online').hide();
    });
}

function smallDisplayStreamInfo(data) {
    var logo = data["stream"]["channel"]["logo"];
    var display_name = data["stream"]["channel"]["display_name"];
    var game = data["stream"]["channel"]["game"];
    var preview = data["stream"]["channel"]["status"];
    var channel_url = data["stream"]["channel"]["url"];
    // Display stream data
    $('.grid').append('<div class="logo online">' + '<img src="' + logo + '">' + '</div>'
        + '<div class="display_name online">'
        + '<a href="' + channel_url + '" target="_blank">'
        + display_name + '</a>' + '<br>' + game + '</div>'
        // + '<div class="status online">' + game + '<div class="preview">' + ': ' + preview + '</div>' + '</div>'
    );

}

function smallDisplayChannelInfo(data) {
    var logo = data["logo"];
    var display_name = data["display_name"];
    var game = data["game"];
    var preview = data["status"];
    var channel_url = data["url"];
    // Display channel data
    $('.grid').append('<div class="logo offline">' + '<img src="' + logo + '" height="50" width="50">' + '</div>'
        + '<div class="display_name offline">'
        + '<a href="' + channel_url + '" target="_blank">'
        + display_name + '</a>' + '<br>' + '<h4>Offline</h4>' + '</div>'
        // + '<div class="status offline">' + '<h4>Offline</h4>' + '</div>'
    );
}



// var usernames = ["freecodecamp", "esl_sc2", "test_channel", "dotastarladder_en", "guit88man", "jasonr"]

var usernames = ["freecodecamp", "esl_sc2", "test_channel"]


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
        displayChannelInfo(channelData);
    } else {
        console.log(streamData["stream"]["channel"]["display_name"], "is online")
        console.log(streamData);

        displayStreamInfo(streamData);
    }

}); // Closing tag for .done function

} // Closing tag for loop

// $('#listOnline').hide();
// $('#listOffline').hide();

$('listOnlineIcon').hover(function (){ 
    $('#listOnline').show(); 
});

$('listOfflineIcon').hover(function (){
    $('#listOffline').hide();
});


// Menu Control
$('#listAll').click(function () {
    $('.online').show();
    $('.offline').show();
});

$('#listOnline').click(function () {
    $('.online').show();
    $('.offline').hide();
});

$('#listOffline').click(function () {
    $('.online').hide();
    $('.offline').show();
});

}) // Closing tag for document.ready

