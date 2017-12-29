
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

function isOnline(data, game, status) {
    if (data["stream"] == null) {
        $('#twitchtv_results').append('<div class="col-lg-3 col-sm-6 boxy current_status" id="game"'
            + '<h5>offline</h5>'
            + '</div>'
            + '</div>');
    } else {
        $('#twitchtv_results').append('<div class="col-lg-3 col-sm-6 boxy current_status" id="game">'
            + game
            + '</div>'
            + '<div class="col-lg-3 col-sm-6 boxy current_status" id="status">'
            + status
            + '</div>'
            + '</div>');
    }
}

$(document).ready(function() {
    var usernames = ["freecodecamp", "esl_sc2", "dotastarladder_en","guit88man"]
    // var usernames = ["freecodecamp"]
    // var category = "channels"

    for (i = 0;  i < (usernames.length); i++) {
        console.log(i, usernames[i]);
        var url = apiEndpoint(usernames[i], "channels");
        console.log(url);
     
        // Execute Twitch.tv API call and download channels data        
        $.getJSON(url, function (data) {
            console.log(data);
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
            console.log(channel_url);


            $('.grid').append('<div class="logo">' + '<img src="' + logo + '" height="50" width="50">' + '</div>');
            $('.grid').append('<div class="display_name">' 
                             + '<a href="' + channel_url + '" target="_blank">' 
                             + display_name + '</a>'+ '</div>');
            // $('.grid').append('<div class="preview">' + preview + '</div>');


        //         isOnline(stream_data, game, status);


     }); // Ends getJSON API channels data call
        // Identify whether user live streaming
        // var url2 = apiEndpoint(usernames[i], "streams");
        // console.log(i, url2);
        // $.getJSON(url2, function (stream_data) {

        //     //     //Validate api data
        //     console.log(i, stream_data);
        //     if (stream_data.stream == null) {
        //         $('.grid').append('<div class="status">' + '<h5>Offline</h5>' + '</div>');
        //     } else {
        //                 var game = stream_data.stream.game;
        //                 var preview = stream_data.stream.channel.status;
        //             $('.grid').append('<div class="status">' + game + ': ' + preview + '</div>');
        //     }
        // }); // Ends getJSON API streams data call 
    } // End of for loop
}); // Ends jQuery
