
// https://wind-bow.gomix.me/twitch-api/streams/esl_sc2

function apiEndpoint(username, category) {
    console.log(username);
    console.log(category);
    // Declare API endpoints
    var endpoint = "https://wind-bow.gomix.me/twitch-api/"
        + category + "/" + username + "?callback=?";
    console.log(endpoint);
    return endpoint;
}

function apiData(endpoint) {
    $.getJSON(endpoint, function(data) {
        //Validate api data
        console.log(data);
        return data;
    }); // Ends getJSON API channels data call 
}



$(document).ready(function() {
    var usernames = ["freecodecamp", "esl_sc2", "dotastarladder_en"]
    var category = "channels"

    for (i in usernames) {
        var url = apiEndpoint(usernames[i],category);
        console.log(url);

        // Execute Twitch.tv API call and download channels data        
        var data = apiData(url);
        console.log(data);

        // Parse query results
        // var logo = data["logo"];
        // console.log(logo);
        // var display_name = data["display_name"];
        // console.log(display_name);
        // var game = data["game"];
        // console.log(game);
        // var status = data["status"];
        // console.log(status)
        // var channel_url = data["url"];
        // console.log(channel_url);

    //     // Inject query results and hyperlink to channel page
    //     $('#twitchtv_results').html('<h1>Twitch.tv</h1>')
    //     $('#logo').html('<img src="' + logo +'" height="50" width="50">');
    //     $('#display_name').html('<a href="' + channel_url + '" target="_blank">' + display_name + '</a>');

    //     // Identify whether user live streaming
    //     $.getJSON(endpoint_streams, function(stream_data) {
    //         //Validate api data
    //         console.log(stream_data);

    //         if (stream_data["stream"] == null) {
    //             $('.current_status').css({"background-color":"red","color":"white"}); 
    //             $('#game').html("offline");
    //             $('#status').hide();
    //         } else {
    //             $('.current_status').css("background-color", "green"); 
    //             $('#game').html(game);
    //             $('#status').html(": " + status);

    //         } // Ends if else statement
    //     }); // Ends getJSON API streams data call
    
    }
}); // Ends jQuery
