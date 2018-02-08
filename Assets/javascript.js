$(document).ready(function() {

    var image_file1 = "https://vignette.wikia.nocookie.net/starwars/images/2/20/LukeTLJ.jpg/revision/latest/scale-to-width-down/1000?cb=20170927034529";
    var image_file2 = "https://lumiere-a.akamaihd.net/v1/images/luke-skywalker-main_5a38c454_461eebf5.jpeg?region=0%2C0%2C1536%2C864&width=768";
    var imagearr = [image_file1, image_file2];
    var tokenarr = []


    function getFaceAPIKey() {
        var api_key = "Y7JHwFafWVDhHq_cLOCO-4jOOeu1m2iN";

        return api_key;
    }

    function getFaceAPISecret() {
        var api_secret = "7cwfnSX5J18-iIvegIVcU10jwdR-vNbq";

        return api_secret;
    }

    function facedetect(imagearr) {    

        //need to figure out inputs and outputs
        var api_key = getFaceAPIKey();
        var api_secret = getFaceAPISecret();

        //var tokenarr = [];

        for (i=0; i < imagearr.length; i++) {
            var detectQueryURL = "https://api-us.faceplusplus.com/facepp/v3/detect?api_key=" + api_key + "&api_secret=" + api_secret + "&image_url=" + imagearr[i];
            $.ajax({
                url: detectQueryURL,
                method: "POST"
            }).done(function(response) {
                tokenarr.push(response.faces[0].face_token);
            
            });
        };

        return(tokenarr);
      
    };

    function compareFace(tokenarr) {

        //need to compare the two tokens
        if (tokenarr.length > 1) {
            var compareQueryURL = "https://api-us.faceplusplus.com/facepp/v3/compare?api_key=" + api_key + "&api_secret=" + api_secret + "&face_token1=" + tokenarr[0] + "&face_token2=" + tokenarr[1];
            $.ajax({
                url: compareQueryURL,
                method: "POST"
            }).done(function(response) {
                console.log(response);
            });      
            clearInterval(timer);
        };
    };


    
    //var timer = setInterval(compareFace, 3000);
    //facedetect(imagearr).then(function () {console.log(tokenarr)});//compareFace(tokenarr))



    function getData() { 
        var data; 
        $.get("example.php", function(response) { 
            data = response;
         }); 
         return data; 
    } 
    
    var data = getData(); console.log("The data is: " + data);

    getData(function (data) {
        console.log("The data is: " + data); 
    });


    function getData(callback) {
        $.get("example.php", function(response) {
          callback(response);
        });
      }
    

});

