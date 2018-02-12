$(document).ready(function() {
    var timer = 500;
    var destination;
    var conecount = 3
    var drivernumber; 
    var targetConeStr;
    var matchFlag = false;

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
    
    //var cone = 1;

    function readDemoFile(e) {

        database.ref("drivers").once("value").then(function(snapshot) {
            ///Kind of doing this backwards - should fix
            if (snapshot.exists) {
                drivernumber = snapshot.numChildren() + 1;
            } else {
                drivernumber = 1;
            }

   
        

            database.ref("cones").once("value").then(function(snapshot) {
                if (snapshot.exists()) {

                    var data = snapshot.val();   
                    var keys = Object.keys(data);
                    var base64url;

                    //figure out the target cone
                    if (keys.includes("3")) {
                        if (drivernumber%conecount === 0) {
                            targetConeStr = "3";        
                        } else {
                            targetConeStr = (drivernumber%conecount).toString();
                        }
                        //also - if the target cone is empty currently - go ahead and move the driver to the cone
                        if (!keys.includes(targetConeStr)) {
                            destination = ("cones/" + targetConeStr)
                        } else {
                            destination = ("drivers/" + drivernumber)
                        }

                    } else if (keys.includes ("2")) {
                        targetConeStr = "3";
                        destination = ("cones/3")
                        //cone = 3;    
                    } else if (keys.includes ("1")) {
                        targetConeStr = "2";
                        destination = ("cones/2")
                        //cone = 2;
                    }
                } else {
                    targetConeStr = "1";
                    destination = ("cones/1")
                    //cone = 1;
                }

                if(window.FileReader) {
                    var file  = e.target.files[0];
                    var reader = new FileReader();
                    if (file && file.type.match('image.*')) {
                        reader.readAsDataURL(file);

                    } else {

                    }
                    reader.onloadend = function (e) {
                        $("#newimage").attr("src", reader.result);
                        //the readAsDataURL function puts extra information in the string - slice it off
                        base64url = reader.result.slice(22);
                        
                        //place the base64 image into the db and the desired destination and run faceDetect
                        database.ref(destination).update({
                            image64: base64url
                        }).then(faceDetect(base64url));
                        };
                };


            });
        });
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

            //now that we have the token, for each family...
            database.ref("families").once("value").then(function(familiesSnapshot) {

                familiesSnapshot.forEach(function(familySnapshot) {
                    //finding that I need to add a timer to delay the API - I think face++ is rate limiting
                    setTimeout(function () {
                        familyid = familySnapshot.key;
                        family = familySnapshot.val();
                        pickup = family.pickup;
            
                        var keys = Object.keys(pickup);
                       
                        //and each pickup person in that family...
                        keys.forEach(function (key) {
                        
                            pickfirstname = pickup[key].firstname;
        
                            picklastname = pickup[key].lastname;
                            picktoken = pickup[key].token;
                            //run the comparison
                            compareFace([newtoken, picktoken], familyid, key);
                            
                        });
                    }, timer += timer)
                });
            }).then(function () {
                database.ref(destination).update({
                    approved: "false",
                    targetCone: targetConeStr
                })
            })
        });
    };

    function compareFace(tokenarr, familyid, name) {

        //need to compare the two tokens
        if (tokenarr.length > 1) {
            var compareQueryURL = "https://api-us.faceplusplus.com/facepp/v3/compare";
            console.log("What we're comparing", tokenarr, familyid, name);
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
                //the response contains a confidence level
                var confidence = response.confidence;
                
                //if the confidence level is over 75% we assume a match and tie the stored pickup data to this driver
                if (response.confidence > 75) {
                    console.log("I have a match on", tokenarr, familyid, name, confidence);
                    matchFlag = true;

                    var matchfirstname;
                    var matchlastname;
                    var matchmake;
                    var matchmodel;
                    var matchplate;
                    var matchimage64;

                    //I don't think I'm using drivers here - need to check this
                    database.ref("drivers").once("value").then(function(snapshot) {
                        //get the information about the pickup person
                        database.ref("families/" + familyid).once("value").then(function(snapshot) {
                            family = snapshot.val();
                            matchfirstname = family.pickup[name].firstname;
                            matchlastname = family.pickup[name].lastname;
                            matchmake = family.pickup[name].make;
                            matchmodel = family.pickup[name].model;
                            matchplate = family.pickup[name].plate;
                            matchimage64 = family.pickup[name].image64;
                            matchchildren = family.children;
                            
                            //and attach it to the driver
                            database.ref(destination).update({
                                family: familyid,
                                firstname: matchfirstname,
                                lastname: matchlastname,
                                make: matchmake,
                                model: matchmodel,
                                plate: matchplate,
                                image64: matchimage64,
                                children: matchchildren,
                                confidence: confidence,
                                targetCone: targetConeStr,
                                approved: "true"
                            
                            });

                        });
                    });                    
                }
          
            });      
        };
    };   

    $(document).on("click", "#uploadbutton", function(){
     
        $("#fileclick").trigger('click');                 
            return false;
    });
    
    $(document).on("change", "#fileclick", readDemoFile);

});