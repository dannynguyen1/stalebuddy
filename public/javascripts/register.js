$(document).ready(function() {
    $("#submit").click(function() {
        if ($("#email").val() == ""
            || $("#password").val() == ""
            || $("#name").val() == ""
            || $("#phone_number").val() == ""){
            alert("Please fill out all form items.");
        }else {
            $.ajax({
                type: "POST",
                url: "/register",
                data: {
                    name: $("#name").val(),
                    phone: $("#phone_number").val(),
                    email: $("#email").val(),
                    password: $("#password").val()
                },
                success: function(data) {
                    window.location = "/dashboard";
                },
                error: function(data) {
                    alert("Invalid data. Please try again.");
                }
            });
        }
    });
})