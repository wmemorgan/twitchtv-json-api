
// https://wind-bow.gomix.me/twitch-api/streams/esl_sc2

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
    $.getJSON(endpoint, function(data) {
        // Validate api data
        // console.log(data);
        return data;
    }); // Ends getJSON API channels data call 
}

function displayStreamInfo(data) {
    // Parse query results
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
        +'<div class="status">' + game + ': ' + preview + '</div>');
}

function displayChannelInfo(data) {
    // Parse query results
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
                    +'<div class="display_name">'
                    + '<a href="' + channel_url + '" target="_blank">'
                    + display_name + '</a>' + '</div>'
                    +'<div class="status">' + '<h4>Offline</h4>' + '</div>');
}

function isOnline(endpoint) {
   $.getJSON(endpoint, function(data){
    if (data["stream"]==null) {
        return true;
    } else {
        return false;
    }
   });
    
}

$(document).ready(function() {
    var usernames = ["freecodecamp", "esl_sc2", "dotastarladder_en","guit88man"]
    // var usernames = ["freecodecamp"]
    // var category = "channels"

    for (i = 0;  i < (usernames.length); i++) {
        console.log(i, usernames[i]);
        
        // Obtain endpoint URLs
        var channel_endpoint = apiEndpoint(usernames[i], "channels");
        console.log(i, channel_endpoint);

        var stream_endpoint = apiEndpoint(usernames[i], "streams");
        console.log(i, stream_endpoint);

        // Identify whether user live streaming
        $.getJSON(stream_endpoint, function (stream_data) {

            if (stream_data["stream"] == null) {
                // Execute Twitch.tv API call and download channel data        
                $.getJSON(channel_endpoint, function (channel_data) {
                    console.log(i, channel_data);
                    displayChannelInfo(channel_data)
                }); // Ends getJSON API channels data call
            } else {
                console.log(i, stream_data);
                displayStreamInfo(stream_data);
            }
        }); // Ends getJSON API streams data call 
    } // End of for loop
}); // Ends jQuery
