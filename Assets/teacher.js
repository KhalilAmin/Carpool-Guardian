$(document).ready(function() {

    var config = {
        apiKey: "AIzaSyBgbVsxVcSiEnm0UEm1fBcW9cTZl_KUgFo",
        authDomain: "carpoolguardian.firebaseapp.com",
        databaseURL: "https://carpoolguardian.firebaseio.com",
        projectId: "carpoolguardian",
        storageBucket: "carpoolguardian.appspot.com",
        messagingSenderId: "594175940867"
      };
      firebase.initializeApp(config);

    var database = firebase.database();

    var driverarr = 


    var image_file1 = "https://vignette.wikia.nocookie.net/starwars/images/2/20/LukeTLJ.jpg/revision/latest/scale-to-width-down/1000?cb=20170927034529";
    var image_file2 = "https://lumiere-a.akamaihd.net/v1/images/luke-skywalker-main_5a38c454_461eebf5.jpeg?region=0%2C0%2C1536%2C864&width=768";
    //var image_file2 = '/Users/pawhalen/Documents/imagetest/oldluke.jpg'
    var imagearr = [image_file1, image_file2];
    var tokenarr = [];




    //var image = "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"

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
        
        var detectQueryURL = "https://api-us.faceplusplus.com/facepp/v3/detect";
        if (tokenarr.length === 2) {
            compareFace();
        } else {
            $.ajax({
                //async: true,
                url: detectQueryURL,
                method: "POST",
                data: {
                    api_key: api_key,
                    api_secret: api_secret,
                    image_base64: image
                }
            }).done(function(response) {
                console.log(response);
                //tokenarr.push(response.faces[0].face_token);
                //faceDetect();
                }
            );
        };
    };


    function compareFace() {

        var api_key = getFaceAPIKey();
        var api_secret = getFaceAPISecret();

        //need to compare the two tokens
        if (tokenarr.length > 1) {
            var compareQueryURL = "https://api-us.faceplusplus.com/facepp/v3/compare?api_key=" + api_key + "&api_secret=" + api_secret + "&face_token1=" + tokenarr[0] + "&face_token2=" + tokenarr[1];
            $.ajax({
                url: compareQueryURL,
                method: "POST"
            }).done(function(response) {
                console.log(response);
            });     
        };
    };

    function buildDB() {

        var conecount = 3;
        var familycount = 8;

        var img = imageTest();
        //console.log(img);
        database.ref("families/0").update({
            approved: img
        });

        database.ref().once("value").then(function(snapshot) {
            data = snapshot.val();
            //faceDetect(data.families[0].approved);
        });

        

        // for (var i = 0; i<conecount; i++) {
        //     database.ref("cones/" + i).set({
        //         token: ""
        //     });
        // }

        // for (var j=0; j<familycount; j++) {
        //     database.ref("families/" + j).set({
        //         approved: [""],
        //         children: [""]
        //     });
        // }
        
    };

    function getBase64Image(imagepath) {
        var image = new Image();
        image.src = imagepath
        
        var canvas = document.createElement("canvas");
        canvas.width = image.width;
        canvas.height = image.height;
        var ctx = canvas.getContext("2d");
        ctx.drawImage(image, 0, 0);
        var dataURL = canvas.toDataURL("image/png");

   

        return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
    };
    

    function imageTest() {
        var imagepath = "Assets/Images/someguy.png";

        base64 = getBase64Image(imagepath);


        //console.log(base64)
        //faceDetect(base64);
        return base64;

    };



    var img = $('img');
    //img.css('display', 'none');
    
    
    function readFile(e) {
      if(window.FileReader) {
        var file  = e.target.files[0];
        var reader = new FileReader();
        if (file && file.type.match('image.*')) {
          reader.readAsDataURL(file);
        } else {
          img.css('display', 'none');
          img.attr('src', '');
        }
        reader.onloadend = function (e) {
          base64url = reader.result.slice(22);
          console.log(base64url);
          //faceDetect(base64url);
        }
      }
    }
    
////////////////////////////////////////////////////////////////////
$("#uploadbutton").click(function(){
    console.log('here');
    $('#fileclick').trigger('click');                 
    return false;
  });

//document.getElementById('fileclick').addEventListener('change', readFile, false);
$("#fileclick").change(readFile);


$("#login").on("click", function(event) {
    event.preventDefault();

    username = $("#username").val().trim();
    password = $("#password").val().trim();

    console.log(username, password);
});

$("#signup").on("click", function(event) {
    event.preventDefault();

    username = $("#username").val().trim();
    password = $("#password").val().trim();

    console.log(username, password);
});









buildDB();
 
//faceDetect();


    
clientid = "20b4fc8f3c7461a"
clientsec = "ffb0877c0f7341d33e976291b94f5cd361239eeb"

});
    
