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

    var coneStr;
    var coneNum;
    var conecount = 3;

    function renderPage() {
        database.ref("cones/"+ coneStr).once("value").then(function(snapshot) {

            if (snapshot.exists()) {
                var driver = snapshot.val();
     
                if (driver.approved === "true") {
                    var studentArray = []
                    $("#approvedpanel").attr("style", "background-color:none")
                
                    capturedUser = $("#capturePicture");
                    capturedUser.empty();
                    driverimage = $("<img>");
                    driverimage.attr("src", "data:image/png;base64," + driver.image64);
                    capturedUser.append(driverimage);

                    capturedStudent = $("#studentPicture");
                    capturedStudent.empty();

                    for (var key in driver.children) {
                        var studentImage = driver.children[key].image64;
                        studentArray.push(studentImage);
                    }

                    for (i = 0; i < studentArray.length; i++) {
                        var divOne = $("<div class='test'>");
                        var imageStudent = $("<img>");
                        imageStudent.attr("src", "data:image/png;base64," + studentArray[i]);
                        divOne.append(imageStudent);
                        $("#studentPicture").append(divOne);
                    }
                } else {
                    $("#approvedpanel").attr("style", "background-color:red")
                    capturedUser = $("#capturePicture");
                    capturedUser.empty();
                    driverimage = $("<img>");
                    driverimage.attr("src", "data:image/png;base64," + driver.image64);
                    capturedUser.append(driverimage);
                    
                }
            }
        });
    }

    function displayStudent(studentArray) {
            for (i = 0; i < studentArray.length; i++) {
                var divOne = $("<div class='test'>");
                var imageStudent = $("<img>");
                imageStudent.attr("src", "data:image/png;base64," + studentArray[i]);
                divOne.append(imageStudent);
                $("#studentPicture").append(divOne);

            }
        }

    function advanceDrivers() {
        
        database.ref("cones/" + coneStr).remove().then(function () {
            database.ref("drivers").once("value").then(function(snapshot) {
                if (snapshot.exists()) {
                    var data = snapshot.val();
                    var keys = Object.keys(data);

                    for (var i = 0; i<keys.length; i++) {

                        var drivernum = parseInt(keys[i]);
                        var targetconeStr = data[drivernum].target;
                        
                        //if this driver was matched
                        if (data[drivernum].approved === "true") {
                            //if this driver is destined for this teachers cone directly
                            if (drivernum === coneNum) {
                                database.ref("cones/" + coneStr).update({
                                    children: data[drivernum].children,
                                    confidence: data[drivernum].confidence,
                                    family: data[drivernum].family,
                                    firstname: data[drivernum].firstname,
                                    image64: data[drivernum].image64,
                                    lastname: data[drivernum].lastname,
                                    make: data[drivernum].make,
                                    model: data[drivernum].model,
                                    plate: data[drivernum].plate,
                                    targetCone: data[drivernum].targetCone,
                                    approved: data[drivernum].approved
                                }).then(database.ref("drivers/" + drivernum).remove());
                            //else if this driver is destined for this teachers cone in the future
                            } else if (targetconeStr === coneStr) {
                                database.ref("drivers/" + (drivernum - conecount)).update({
                                    children: data[drivernum].children,
                                    confidence: data[drivernum].confidence,
                                    family: data[drivernum].family,
                                    firstname: data[drivernum].firstname,
                                    image64: data[drivernum].image64,
                                    lastname: data[drivernum].lastname,
                                    make: data[drivernum].make,
                                    model: data[drivernum].model,
                                    plate: data[drivernum].plate,
                                    targetCone: data[drivernum].targetCone,
                                    approved: data[drivernum].approved
                                }).then(database.ref("drivers/" + drivernum).remove());
                            }
                        } else {
                            //if this driver is destined for this teachers cone directly
                            if (drivernum === coneNum) {
                                database.ref("cones/" + coneStr).update({       
                                    image64: data[drivernum].image64,
                                    targetCone: data[drivernum].targetCone,
                                    approved: data[drivernum].approved
                                }).then(database.ref("drivers/" + drivernum).remove());
                            //else if this driver is destined for this teachers cone in the future
                            } else if (targetconeStr === coneStr) {
                                database.ref("drivers/" + (drivernum - conecount)).update({   
                                    image64: data[drivernum].image64,
                                    targetCone: data[drivernum].targetCone,
                                    approved: data[drivernum].approved
                                }).then(database.ref("drivers/" + drivernum).remove());
                            }
                        }
                    }
                } 
            })
        }).then(renderPage());
    };

    $(document).on("change", "select", function () {
        coneStr = $(this).val();
        coneNum = parseInt(coneStr)
        renderPage();
    })

    $(document).on("click", "#nextCarBtn", function(event) {
        $("#approvedpanel").attr("style", "background-color:none")
        $("#capturePicture").empty();
        $("#studentPicture").empty();
        advanceDrivers();
    });

    database.ref("cones/").on("value", function(snapshot) {
     
        if (snapshot.exists()) {
            data = snapshot.val();
            conekeys = Object.keys(data);

            if (conekeys) {
                for (i=0; i<conekeys.length; i++) {
                    if (conekeys[i] === coneStr) {
                        renderPage();
                    }
                }
            }
        }
    });
});











