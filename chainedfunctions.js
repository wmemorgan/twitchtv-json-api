$(document).ready(function () {

  
function apiEndpoint(username, category) {
    // console.log(username);
    // console.log(category);
    // Declare API endpoints
    var endpoint = "https://wind-bow.gomix.me/twitch-api/"
        + category + "/" + username + "?callback=?";
    // console.log(endpoint);
    return endpoint;
}

function isOnline(endpoint) {
    $.getJSON(endpoint, function (data) {
        if (data["stream"] == null) {
            return true;
        } else {
            return false;
        }
    });

}


function apiData(endpoint) {
    var json = $.getJSON(endpoint, function(data) {
        console.log(data);
    });
    return json;
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
        + '<div class="status">' + game + ': ' + preview + '</div>');
}

function displayChannelInfo(json) {
    // Parse query results
    data = json["responseJSON"];
    var logo = data["logo"];
    console.log(logo);
    var display_name = data["display_name"];
    console.log(display_name);
    var game = data["game"];
    console.log(game);
    var preview = data["status"];
    console.log(status)
    var channel_url = data["url"];
    console.log(channel_url);
    $('.grid').append('<div class="logo">' + '<img src="' + logo + '" height="50" width="50">' + '</div>'
        + '<div class="display_name">'
        + '<a href="' + channel_url + '" target="_blank">'
        + display_name + '</a>' + '</div>'
        + '<div class="status">' + '<h4>Offline</h4>' + '</div>');
}


    var usernames = ["freecodecamp", "esl_sc2", "dotastarladder_en", "guit88man"]
    var i = 0;
    var category = "channels";
    apiEndpoint(usernames[i], category).then(apiData()).then(displayChannelInfo())

}); // Ends jQuery