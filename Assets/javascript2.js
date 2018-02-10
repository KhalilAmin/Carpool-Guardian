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


    var image_file1 = "https://vignette.wikia.nocookie.net/starwars/images/2/20/LukeTLJ.jpg/revision/latest/scale-to-width-down/1000?cb=20170927034529";
    var image_file2 = "https://lumiere-a.akamaihd.net/v1/images/luke-skywalker-main_5a38c454_461eebf5.jpeg?region=0%2C0%2C1536%2C864&width=768";
    //var image_file2 = '/Users/pawhalen/Documents/imagetest/oldluke.jpg'
    var imagearr = [image_file1, image_file2];
    var tokenarr = []




    //var image = "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"

    function getFaceAPIKey() {
        var api_key = "Y7JHwFafWVDhHq_cLOCO-4jOOeu1m2iN";
        return api_key;
    };

    function getFaceAPISecret() {
        var api_secret = "7cwfnSX5J18-iIvegIVcU10jwdR-vNbq";
        return api_secret;
    };
    

        //console.log(blah);

    // var ctx = document.getElementById('canvas').getContext('2d');
    // var img = new Image;
    // img.onload = function() {
    //     ctx.drawImage(img, 20,20);
    //     alert('the image is drawn');
    // }
    // img.src = URL.createObjectURL(e.target.files[0]);

    // function getBase64FromImageUrl(url) {
    //     var img = new Image();
    
    //     img.setAttribute('crossOrigin', 'anonymous');
    
    //     img.onload = function () {
    //         var canvas = document.createElement("canvas");
    //         canvas.width =this.width;
    //         canvas.height =this.height;
    
    //         var ctx = canvas.getContext("2d");
    //         ctx.drawImage(this, 0, 0);
    
    //         var dataURL = canvas.toDataURL("image/png");
    
    //         faceDetect(dataURL.replace(/^data:image\/(png|jpg);base64,/, ""));
    //     };
    
    //     img.src = url;
    // }

//getBase64FromImageUrl("Assets/Images/someguy.png");


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
      }

    function imageTest() {
        var imagepath = "Assets/Images/someguy.png"

        base64 = getBase64Image(imagepath);


        console.log(base64)
        //faceDetect(base64);
        return base64;

    }
 


//"Assets/Images/someguy.png"
    // function faceDetect(image) {  
       
    //     //need to figure out inputs and outputs
    //     var api_key = getFaceAPIKey();
    //     var api_secret = getFaceAPISecret();

    //     image = imagearr.pop()
        

    //     var detectQueryURL = "https://api-us.faceplusplus.com/facepp/v3/detect?api_key=" + api_key + "&api_secret=" + api_secret + "&image_file=Images/someguy.png";
    //     if (tokenarr.length === 2) {
    //         compareFace();
    //     } else {
    //         $.ajax({
    //             //async: true,
    //             url: detectQueryURL,
    //             method: "POST",
    //             data: {
    //                 image_base64: ""
    //             }
    //         }).done(function(response) {
    //             tokenarr.push(response.faces[0].face_token);
    //             faceDetect();
    //             }
    //         );
    //     };
    // };


    
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
        console.log(img);
        database.ref("families/0").update({
            approved: img
        });

        database.ref().once("value").then(function(snapshot) {
            data = snapshot.val();
            console.log(data.families[0].approved[0]);
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



    var img = $('img');
    //img.css('display', 'none');
    
    $('#upload-button').click(function(){
      $('#my-custom-design-upload').trigger('click');                 
      return false;
    });
    
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
          faceDetect(base64url);
        }
      }
    }
    
    document.getElementById('my-custom-design-upload').addEventListener('change', readFile, false);

buildDB();
 
//faceDetect();

    // function faceDetect(image) {  
       
    //     //need to figure out inputs and outputs
    //     var api_key = getFaceAPIKey();
    //     var api_secret = getFaceAPISecret();

    //     //image = imagearr.pop()
        

    //     var detectQueryURL = "https://api-us.faceplusplus.com/facepp/v3/detect?api_key=" + api_key + "&api_secret=" + api_secret + "&image_base64=" + image;
    //     console.log(detectQueryURL);
    //         $.ajax({
    //             //async: true,
    //             url: detectQueryURL,
    //             method: "POST"
    //         }).done(function(response) {
    //             console.log(response);
    //             }
    //         );
    //     };
    



    // function getBase64(file) {
    //     var reader = new FileReader();
    //     reader.readAsDataURL(file);
    //     reader.onload = function () {
    //     console.log(reader.result);
    //     };
    //     reader.onerror = function (error) {
    //     console.log('Error: ', error);
    //     };
    // }
 
// // var file = document.querySelector('#files > input[type="file"]').files[0];
// // getBase64("Images/oldluke.jpg");


//     var base64url;

//     var img = $('img');
//     img.css('display', 'none');

//     $('#upload-button').click(function(){
//         $('#my-custom-design-upload').trigger('click');                 
//         return false;
//     });

//     function readfichier(e) {
//         if(window.FileReader) {
//             var file  = e.target.files[0];
        
//             var reader = new FileReader();
//             if (file && file.type.match('image.*')) {
//                 reader.readAsDataURL(file);
//             } else {
//                 img.css('display', 'none');
//                 img.attr('src', '');
//             }
//             reader.onloadend = function (e) {
//                 console.log("here");
//                 base64url = reader.result;
//                 newbase64url = reader.result.slice(23);
//                 console.log("YOUOONNN//////////////////////////////////////////////////////////", base64url, "YOUOONNN//////////////////////////////////////////////////////////", newbase64url);
//                 //console.log(base64url);
         
//                 img.attr('src', reader.result);
//                 img.css('display', 'block');

//                 faceDetect(base64url);
//             }
//         }
//     }
    
//     document.getElementById('my-custom-design-upload').addEventListener('change', readFile, false);



    // $("#upload-button").on('click', function() {
    //     // validate type of file
    //     if(['image/jpeg', 'image/jpg', 'image/png', 'image/gif'].indexOf($("#file-to-upload").get(0).files[0].type) == -1) {
    //         alert('Error : Only JPEG, PNG & GIF allowed');
    //         return;
    //     }
    
    //     var $data = new FormData();
    //     $data.append('title', 'Sample Photo Title');
    //     $data.append('file', $("#file-to-upload").get(0).files[0]);
    
        // processData & contentType should be set to false
        // $.ajax({
        //     type: 'POST',
        //     url: 'upload.php',
        //     data: $data,
        //     success: function(response) {
                
        //     },
        //     error: function(response) {
                
        //     },
        //     processData: false,
        //     contentType: false
        // });

        
//     });

//     var form = document.getElementById('the-form');
//     form.onsubmit = function() {
//     var formData = new FormData(form);

//     formData.append('file', file);

//     var xhr = new XMLHttpRequest();
//     // Add any event handlers here...
//     xhr.open('POST', form.getAttribute('action'), true);
//     xhr.send(formData);

//     return false; // To avoid actual submission of the form
// }

});
    
    
    
clientid = "20b4fc8f3c7461a"
clientsec = "ffb0877c0f7341d33e976291b94f5cd361239eeb"
    
    
    
    // function compareFace(tokenarr) {

    //     //need to compare the two tokens
    //     if (tokenarr.length > 1) {
    //         var compareQueryURL = "https://api-us.faceplusplus.com/facepp/v3/compare?api_key=" + api_key + "&api_secret=" + api_secret + "&face_token1=" + tokenarr[0] + "&face_token2=" + tokenarr[1];
    //         $.ajax({
    //             url: compareQueryURL,
    //             async: true,
    //             method: "POST"
    //         }).done(function(response) {
    //             tokenarr.push(response.faces[0].face_token);
    //             if (tokenarr.length < 1) compareFace
    //         });      
    //         clearInterval(timer);
    //     };
    // };


    // $.ajax({
    //     /* The whisperingforest.org URL is not longer valid, I found a new one that is similar... */
    //     url:'http://quotes.stormconsultancy.co.uk/random.json',
    //     async: true,
    //     dataType: 'jsonp',
    //     success:function(data){
    //         $('.quoteList').append('<li>' + data.quote +'</li>');
    //         counter++;
    //         if (counter < 5) getData();
    //     }
    // });


    // function getData() { 
    //     var data; 
    //     $.get("example.php", function(response) { 
    //         data = response;
    //      }); 
    //      return data; 
    // } 
    
    // var data = getData(); console.log("The data is: " + data);

    // getData(function (data) {
    //     console.log("The data is: " + data); 
    // });


    // function getData(callback) {
    //     $.get("example.php", function(response) {
    //       callback(response);
    //     });
    //   }

    // compareFace(function (tokenarr) {

    // })

    // function facedetect(imagearr) {    

    //     //need to figure out inputs and outputs
    //     var api_key = getFaceAPIKey();
    //     var api_secret = getFaceAPISecret();

    //     //var tokenarr = [];

    //     for (i=0; i < imagearr.length; i++) {
    //         var detectQueryURL = "https://api-us.faceplusplus.com/facepp/v3/detect?api_key=" + api_key + "&api_secret=" + api_secret + "&image_url=" + imagearr[i];
    //         $.ajax({
    //             url: detectQueryURL,
    //             method: "POST"
    //         }).done(function(response) {
    //             tokenarr.push(response.faces[0].face_token);
            
    //         });
    //     };

    //     callback(tokenarr)

    //     return(tokenarr);
      
    // };


    // function facedetect() {  

    //     //need to figure out inputs and outputs
    //     var api_key = getFaceAPIKey();
    //     var api_secret = getFaceAPISecret();

    //     image = imagearr.pop()

    //     //var tokenarr = [];

    //     var detectQueryURL = "https://api-us.faceplusplus.com/facepp/v3/detect?api_key=" + api_key + "&api_secret=" + api_secret + "&image_url=" + imagearr[-1];
    //     $.ajax({
    //         async: true,
    //         url: detectQueryURL,
    //         method: "POST"
    //     }).done(function(response) {
    //         tokenarr.push(response.faces[0].face_token);
    //         imagearr.pop();
    //         if (tokenarr.length < 1) facedetect(imagearr);
    //     });
        

    //     return(tokenarr);
      
    //