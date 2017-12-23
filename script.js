
// https://wind-bow.gomix.me/twitch-api/streams/esl_sc2
$(document).ready(function() {
    // API query parameters
    // var username = "freecodecamp"
    // var username = "esl_sc2"
    var username = "dotastarladder_en"
    console.log(username);
    var parm_channels = "/channels/";
    console.log(parm_channels);
    var parm_streams = "/streams/";
    console.log(parm_streams);

    // Full API endpoints
    var endpoint_channels = "https://wind-bow.gomix.me/twitch-api"
        + parm_channels + username + "?callback=?";
    console.log(endpoint_channels);
    var endpoint_streams = "https://wind-bow.gomix.me/twitch-api"
        + parm_streams + username + "?callback=?";
    console.log(endpoint_streams);

    // Execute Twitch.tv API call and download channels data
    $.getJSON(endpoint_channels, function(data) {
        //Validate api data
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

        // Inject query results and article links to page
        $('#twitchtv_results').html('<h1>Twitch.tv</h1>')
        $('#logo').html('<img src="' + logo +'" height="50" width="50">');
        $('#display_name').html(display_name);

        // Identify whether user live streaming
        $.getJSON(endpoint_streams, function(stream_data) {
            //Validate api data
            console.log(stream_data);

            if (stream_data["stream"] == null) {
                $('.current_status').css({"background-color":"red","color":"white"}); 
                $('#game').html("offline");
                $('#status').hide();
            } else {
                $('.current_status').css("background-color", "green"); 
                $('#game').html(game);
                $('#status').html(": " + status);

            } // Ends if else statement
        }); // Ends getJSON API streams data call
    }); // Ends getJSON API channels data call

}); // Ends jQuery
