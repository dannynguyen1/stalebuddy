$(document).ready(function() {
    $("#login_button").click(function() {
        if ($("#email").val() == "" || $("#password").val() == "") {
            alert("Please fill out a valid email and password.");
        } else {
            $.ajax({
                type: "POST",
                url: "/login",
                data: {
                    email: $("#email").val(),
                    password: $("#password").val()
                },
                success: function(data) {
                    window.location = "/dashboard";
                },
                error: function(data) {
                    alert("Invalid password. Please try again.");
                }
            });
        }
    });
})