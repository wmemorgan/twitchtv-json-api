//Twitch API Processing
$(document).ready(function() {
    // API query parameters
    // var parms = "/users/ESL_SC2";
    var parms = "/channels/esl_sc2";
    console.log(parms);

    // Full API endpoint
    var endpoint = "https://wind-bow.gomix.me/twitch-api"
        + parms + "?callback=?";
    console.log(endpoint);

    // Execute Twitch.tv API call and download data
    $.getJSON(endpoint, function(data) {
        //Validate api data
        console.log(data);

    // Inject query results and article links to page
    $('#twitchtv_results').html(data);

    }); // Ends getJSON function

}); // Ends jQuery
