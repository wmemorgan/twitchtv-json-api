//Twitch API Processing
$(document).ready(function() {
    // API query parameters
    var channel = "freecodecamp"
    console.log(channel)
    var parms = "/channels/"+channel;
    console.log(parms);

    // Full API endpoint
    var endpoint = "https://wind-bow.gomix.me/twitch-api"
        + parms + "?callback=?";
    console.log(endpoint);

    // Execute Twitch.tv API call and download data
    $.getJSON(endpoint, function(data) {
        //Validate api data
        console.log(data);

        // Parse query results
        var logo = data["logo"];
        console.log(logo);
        var channel_name = data["display_name"];
        console.log(channel_name);
        var status = data["status"];
        console.log(status)
        var channel_url = data["url"];
        console.log(channel_url);

        // Inject query results and article links to page
        $('#twitchtv_results').html('<div>' + '<img src="' + logo +'" height="75" width="75">' + '</div>');
        // $('img').attr('src', logo);

    }); // Ends getJSON function

}); // Ends jQuery
