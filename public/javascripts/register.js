$(document).ready(function() {
    $("#submit").click(function() {
        if ($("#email").val() == ""
            || $("#password").val() == ""
            || $("#confirm_email").val() != ("#email").val()
            || $("#confirm_password").val() != ("#password").val()){
            alert("Please fill out a valid email and password.");
        }else {
            $.ajax({
                type: "POST",
                url: "/register",
                data: {
                    email: $("#email").val(),
                    password: $("#password").val(),
                },
                success: function(data) {
                    window.location = "/account";
                },
                error: function(data) {
                    alert("Invalid data. Please try again.");
                }
            });
        }
    });
})