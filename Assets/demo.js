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
    var drivernumber; 
    var cone = 1;

    function readDemoFile(e) {
        var base64url;
        drivernumber = $("#drivernumber").val().trim();;
        cone = drivernumber % 3;

        console.log(cone);
     
        if(window.FileReader) {
          var file  = e.target.files[0];
          var reader = new FileReader();
          if (file && file.type.match('image.*')) {
            reader.readAsDataURL(file);

          } else {

          }
          reader.onloadend = function (e) {
            $("#newimage").attr("src", reader.result);
            base64url = reader.result.slice(22);
            
            
            database.ref("cones/" + cone).update({
                image64: base64url
            }).then(faceDetect(base64url));
            };
        };  
    };

        function getFaceAPIKey() {
        var api_key = "Y7JHwFafWVDhHq_cLOCO-4jOOeu1m2iN";
        return api_key;
    };

    function getFaceAPISecret() {
        var api_secret = "7cwfnSX5J18-iIvegIVcU10jwdR-vNbq";
        return api_secret;
    };

    function faceDetect(image, name) {
        var api_key = getFaceAPIKey();
        var api_secret = getFaceAPISecret();

        //image = imagearr.pop()
        
        var detectQueryURL = "https://api-us.faceplusplus.com/facepp/v3/detect";
        
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
            var newtoken = response.faces[0].face_token;

            database.ref("families").once("value").then(function(familiesSnapshot) {
                familiesSnapshot.forEach(function(familySnapshot) {
                    familyid = familySnapshot.key;
                    family = familySnapshot.val();
                    pickup = family.pickup;
        
                    var keys = Object.keys(pickup);
                    console.log("keys", keys);
    
                    keys.forEach(function (key) {
                    
                        pickfirstname = pickup[key].firstname;
    
                        picklastname = pickup[key].lastname;
                        picktoken = pickup[key].token;
                        console.log("last", picklastname);
    
                        console.log(newtoken, picktoken);
                        compareFace([newtoken, picktoken], familyid, key);
                        
                    });
                });
            })
        });
    };


            // database.ref("cones/" + cone).update({
            //     token: response.faces[0].face_token

            // }).then(
            //     database.ref("cones").once("value"("child_added", function(snapshot) {
            //     })
            // )
            
            
            
     

    function compareFace(tokenarr, familyid, key) {
        //tokenarr = ['3ac5827eda6cffc5817265899a77ade0', 'feffd52e42ef5de30d0a424b2a9776fb']
        //need to compare the two tokens
        if (tokenarr.length > 1) {
            var compareQueryURL = "https://api-us.faceplusplus.com/facepp/v3/compare";
            $.ajax({
                url: compareQueryURL,
                method: "POST",
                data: {
                    api_key: "Y7JHwFafWVDhHq_cLOCO-4jOOeu1m2iN",
                    api_secret: "7cwfnSX5J18-iIvegIVcU10jwdR-vNbq",
                    face_token1: tokenarr[0],
                    face_token2: tokenarr[1]
                }
            }).done(function(response) {
                
                if (response.confidence > 75) {
                    console.log("id", familyid, "name", key);

                    var matchfirstname;
                    var matchlastname;
                    var matchmake;
                    var matchmodel;
                    var matchplate;
                    var matchimage64;

                    database.ref("families/" + familyid).once("value").then(function(snapshot) {
                        family = snapshot.val();
                        console.log("FAMILY", familyid);
                        console.log("KEY", key);

                        console.log("FAMILY SNAP", family.pickup);

                        matchfirstname = family.pickup[key].firstname;
                        matchlastname = family.pickup[key].lastname;
                        matchmake = family.pickup[key].make;
                        matchmodel = family.pickup[key].model;
                        matchplate = family.pickup[key].plate;
                        matchimage64 = family.pickup[key].image64;
                        matchchildren = family.children;
                        
                        database.ref("cones/1").update({
                            family: familyid,
                            firstname: matchfirstname,
                            lastname: matchlastname,
                            make: matchmake,
                            model: matchmodel,
                            plate: matchplate,
                            image64: matchimage64,
                            children: matchchildren
                        });

                    });


                    // database.ref("families/" + familyid + "/pickup/" + key).once("value").then(function(snapshot) {
                    //     match = snapshot.val();

                    //     matchfirstname = match.firstname;
                    //     matchlastname = match.lastname;
                    //     matchmake = match.make;
                    //     matchmodel = match.model;
                    //     matchplate = match.plate;
                    //     matchimage64 = match.image64;

                    //     database.ref("cones/1").update({
                    //         family: familyid,
                    //         firstname: matchfirstname,
                    //         lastname: matchlastname,
                    //         make: matchmake,
                    //         model: matchmodel,
                    //         plate: matchplate,
                    //         image64: matchimage64
                    //     });
                    // });
                    
                }
          
            });      
        };
    };

   function getTheKids() {

   }
            

    $(document).on("click", "#uploadbutton", function(){
    
        $("#fileclick").trigger('click');                 
            return false;
    });
    
    $(document).on("change", "#fileclick", readDemoFile);

    // database.ref("cones").on("child_added", function(snapshot) {
    //     var newdriver = snapshot.val();
    //     var newtoken = newdriver.token

    //     console.log("The newdriver", newdriver);
    //     console.log("The newtoken", newtoken);
    
    //     database.ref("families").once("value").then(function(familiesSnapshot) {
    //         familiesSnapshot.forEach(function(familySnapshot) {
    //             familyid = familySnapshot.key;
    //             family = familySnapshot.val();
    //             pickup = family.pickup;
    
    //             var keys = Object.keys(pickup);
    //             console.log("keys", keys);

    //             keys.forEach(function (key) {
                
    //                 pickfirstname = pickup[key].firstname;

    //                 picklastname = pickup[key].lastname;
    //                 picktoken = pickup[key].token;
    //                 console.log("last", picklastname);

    //                 console.log(newtoken, picktoken);
    //                 compareFace([newtoken, picktoken], familyid, key);
                    // compareFace([newtoken, picktoken]).then(function(result) {
                    //     console.log(result);
                    //});

    //             });
    //         });
    //     });
    // });

});