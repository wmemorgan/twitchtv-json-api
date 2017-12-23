
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

function displayResults(logo) {
    $('#twitchtv_results').append('<div class="col-lg-3 col-sm-6 boxy current_status" id="display_name">'
        + '<a href="' + channel_url + '" target="_blank">' + display_name + '</a>' + '</div>');
}


$(document).ready(function() {
    var usernames = ["freecodecamp", "esl_sc2", "dotastarladder_en","guit88man"]
    var category = "channels"

    for (i in usernames) {
        var url = apiEndpoint(usernames[i],category);
        console.log(url);

        // Execute Twitch.tv API call and download channels data        
        $.getJSON(url, function (data) {
            console.log(data);
            // Parse query results
            var logo = data["logo"];
            console.log(logo);
            var display_name = data["display_name"];
            console.log(display_name);
            var game = data["game"];
            console.log(game);
            var status = data["status"];
            console.log(status)
            var channel_url = data["url"];
            console.log(channel_url);

            // Identify whether user live streaming
            $.getJSON(apiEndpoint(usernames[i], "streams"), function (stream_data) {
                //Validate api data
                console.log(apiEndpoint(usernames[i], "streams"));
                console.log(stream_data);

            if (stream_data["stream"] == null) {
        
        // Inject query results and hyperlink to channel page
        // $('#twitchtv_results').html('<h1>Twitch.tv</h1>')
        // $('#twitchtv_results').append('<div class="col-lg-3 col-sm-6 boxy current_status" id="logo">'
        //     + '<img src="' + logo +'" height="50" width="50">' + '</div>');
                $('#twitchtv_results').append('<div class="row">'
                + '<div class="col-lg-3 col-sm-6 boxy current_status" id="logo">'
                + '<img src="' + logo + '" height="50" width="50">' + '</div>'
                + '<div class="col-lg-3 col-sm-6 boxy current_status" id="display_name">'
                + '<a href="' + channel_url + '" target="_blank">' + display_name + '</a>' 
                + '</div>'
                + '<div class="col-lg-3 col-sm-6 boxy current_status" id="game"'
                + '<h5>offline</h5>'
                + '</div>' 
                + '</div>');
        } else {
                $('#twitchtv_results').append('<div class="row">'
                    + '<div class="col-lg-3 col-sm-6 boxy current_status" id="logo">'
                    + '<img src="' + logo + '" height="50" width="50">' + '</div>'
                    + '<div class="col-lg-3 col-sm-6 boxy current_status" id="display_name">'
                    + '<a href="' + channel_url + '" target="_blank">' + display_name + '</a>'
                    + '</div>'
                    + '<div class="col-lg-3 col-sm-6 boxy current_status" id="game">'
                    + game
                    + '</div>'
                    + '<div class="col-lg-3 col-sm-6 boxy current_status" id="status">'
                    + status
                    + '</div>'
                    + '</div>');
        }

        // displayResults(logo);



            // if (stream_data["stream"] == null) {
            //     // $('.current_status').css({"background-color":"red"}); 
            //     $('#game').append(
            //         +'<div class="col-lg-3 col-sm-6 boxy current_status" id="game"'
            //         +'<h5>offline</h5>'
            //         +'</div>'
            //         );
            //     $('#status').hide();
            // } else {
            //     // $('.current_status').css("background-color", "green"); 
            //     $('#game').append('<div class="row">'
            //     +'<div class="col-lg-3 col-sm-6 boxy current_status" id="game">'
            //     +game
            //     +'</div>'
            //     +'</div>');
            //     $('#status').append(": " + status);

            // } // Ends if else statement
        }); // Ends getJSON API streams data call
     }); // Ends getJSON API channels data call 
    } // End of for loop
}); // Ends jQuery
