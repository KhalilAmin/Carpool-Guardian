$(document).ready(function() {

    var api_key = "Y7JHwFafWVDhHq_cLOCO-4jOOeu1m2iN";
    var api_secret = "7cwfnSX5J18-iIvegIVcU10jwdR-vNbq";
    var image_file = "images/Thatch.JPG";
    //var queryURL = "https://api-us.faceplusplus.com/facepp/v3/detect";

    var queryURL = "https://api-us.faceplusplus.com/facepp/v3/detect?api_key=" + api_key + "&api_secret=" + api_secret + "&image_file=" + image_file;
    
    

    console.log(queryURL);
    $.ajax({
        url: queryURL,
        method: "POST",

        
    }).done(function(response) {
        console.log(response);

    });
    // $.ajax({
    //     url: queryURL,
    //     method: "POST",
    //     data: {
    //         api_key: api_key,
    //         api_secret: api_secret,
    //         image_file: image_file
    //     },
    //     dataType: 'jsonp'
        
    // }).done(function(response) {
    //     console.log(response);

    // });
});

