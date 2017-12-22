//Twitch API Processing
$(document).ready(function() {
    // API query parameters
    var parms = ;
    console.log(parms);

    // Full API URL
    var url = " "
        + parms + "&callback=?"
    console.log(url);

    // Execute Twitch.tv API call and download data
    $.getJSON(url, function(data) {
        //Validate api data
        console.log(data);

    // Inject query results and article links to page
    $('#twitchtv_results').text(data);

    }); // Ends getJSON function

}); // Ends jQuery
