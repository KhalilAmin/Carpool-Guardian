$(document).ready(function() {

    var formData = new FormData($('#upload_form')[0]);
    formData.append('image', $('input[type=file]')[0].files[0]); 
    console.log(formData);

    function getFaceAPIKey() {
        var api_key = "Y7JHwFafWVDhHq_cLOCO-4jOOeu1m2iN";
        return api_key;
    };

    function getFaceAPISecret() {
        var api_secret = "7cwfnSX5J18-iIvegIVcU10jwdR-vNbq";
        return api_secret;
    };

    function faceDetect(image) {  
       
        //need to figure out inputs and outputs
        var api_key = getFaceAPIKey();
        var api_secret = getFaceAPISecret();

        //image = imagearr.pop()
        

        var detectQueryURL = "https://api-us.faceplusplus.com/facepp/v3/";
        console.log(detectQueryURL);
            $.ajax({
                //async: true,
                url: detectQueryURL,
                method: "POST",
                api_key: "Y7JHwFafWVDhHq_cLOCO-4jOOeu1m2iN",
                api_secret: "7cwfnSX5J18-iIvegIVcU10jwdR-vNbq",
                image: formData,
                contentType: false,
                processData: false,
            }).done(function(response) {
                console.log(response);
                }
            );
        };


        

        

     

    //faceDetect(formData);

   // document.getElementById('my-custom-design-upload').addEventListener('change', readFile, false);



});