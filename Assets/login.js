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

    sessionStorage.clear();

    $(document).on("click", "#loginbutton", function(event){
        event.preventDefault();

        var username = $("#username").val().trim();
        var password = $("#password").val().trim();

        var successflag = false;

        database.ref("families").once("value").then(function(familiesSnapshot) {
            familiesSnapshot.forEach(function(familySnapshot) {
                var familyid = familySnapshot.key
                var data = familySnapshot.val();


                if (username === data.login.username) {
                    if (password === data.login.password) {
                        sessionStorage.setItem("familyid", familyid);
                        window.location = "file:///Users/pawhalen/Documents/Full%20Stack%20Flex/Carpool-Guardian/profile.html"
                        //window.location = https://thatchcorduroy.github.io/Carpool-Guardian/profile.html
                        successflag = true;
                    }


                    // sessionStorage.setItem("familyid", familyid);
                    // window.location = "file:///Users/pawhalen/Documents/Full%20Stack%20Flex/Carpool-Guardian/profile.html"
                    // //window.location = https://thatchcorduroy.github.io/Carpool-Guardian/profile.html
                    // console.log("Incorrect Username");
                
                }
            });
            
        }).then(function() {

            if (successflag === false) {
                console.log("Incorrect Username or Password")
                errordiv = $("<div>")
                errordiv.text("Incorrect Username or Password")
                errordiv.attr("style", "color:red");
                $("#login").append(errordiv)
            }
        });
    });

    $(document).on("click", "#signupbutton", function() {
        $("#signupbutton").hide();

        $("#loginlabel").attr("id", "signinlabel");
        var signinlabel = $("#signinlabel");
        signinlabel.attr("for", "signinbutton");

        var familyid = $("<input>");
        familyid.addClass("form-control");
        familyid.attr("type", "text");
        familyid.attr("id", "familyid");
        familyid.attr("placeholder", "Family ID");
        signinlabel.append(familyid);

        var signinbutton = $("#loginbutton").attr("id", "signinbutton");
        signinbutton.attr("value", "Sign In");
    });

    $(document).on("click", "#signinbutton", function() {
        username = $("#username").val().trim();
        password = $("#password").val().trim();
        familyid = $("#familyid").val().trim();

        database.ref("families/" + familyid + "/login").update({
            username: username,
            password: password
        })

        sessionStorage.setItem("familyid", familyid);
        window.location = "file:///Users/pawhalen/Documents/Full%20Stack%20Flex/Carpool-Guardian/profile.html"
        //window.location = https://thatchcorduroy.github.io/Carpool-Guardian/profile.html

    });
});