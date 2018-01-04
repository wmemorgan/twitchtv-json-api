
function apiEndpoint(username, category) {
    // console.log(username);
    // console.log(category);
    // Declare API endpoints
    var endpoint = "https://wind-bow.gomix.me/twitch-api/"
        + category + "/" + username + "?callback=?";
    // console.log(endpoint);
    return endpoint;
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

function displayChannelInfo(data) {
        // Parse query results
        data = data["responseJSON"];
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

$(document).ready(function () {

    var usernames = ["freecodecamp", "esl_sc2", "dotastarladder_en", "guit88man"]
    // var i = 0;
    console.log(usernames);
    // while (i < usernames.length-1) {
    for (i in usernames) {   
        var category = "channels"
        var url = "https://wind-bow.gomix.me/twitch-api/" + category + "/" + usernames[i] + "?callback=?"
        // var json = $.getJSON(url, function (data) {
        //     // console.log(data);

        // }); // End json function
    var streamPromise = $.getJSON(apiEndpoint(usernames[i], "streams"));
    var channelPromise = $.getJSON(apiEndpoint(usernames[i],"channels"));
    $.when(streamPromise, channelPromise).done(function(data){ 
        if (streamPromise.responseJSON.stream == null) {
            console.log(usernames[i], "User is offline")
        } else {
            console.log(usernames[i], "User is online!")
        }
        // console.log(firstPromise);
        // console.log(secondPromise);
            // console.log(promise.responseJSON.display_name);
            // displayChannelInfo(promise);
            // i++;
        });

        // promise.fail(function(){
        //     console.log("Nothing to see here...");
        // });

        // promise.always(function(){
        //     console.log("I'm still here!");
        // })

        // Parse query results



                // if (json.readyState = 1) {
                //     console.log(json);
                //     console.log(json.readyState);
                //     console.log(json.responseJSON);
                //     i++;
                //     console.log("Next up is....",i, usernames[i]);
                // } else {
                //     console.log("Nothing to see here...")
                // }
        
    } // Ends loop

}); // Ends jQuery