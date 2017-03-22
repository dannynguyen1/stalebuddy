$(document).ready(function() {
    $("#add_button").click(function() {
        if ($("#product").val() == "" ||
            $("#expiration").val() == "" ||
            $("#comments").val() == "") {
            alert("Please fill out all form items.");
        } else {
            $.ajax({
                type: "POST",
                url: "/addItem",
                data: {
                    product: $("#product").val(),
                    expiration: $("#expiration").val(),
                    comments: $("#comments").val()
                },
                success: function(data) {
                    $(".alert").removeClass("hidden");
                    $("#product").val("");
                    $("#expiration").val("");
                    $("#comments").val("");
                },
                error: function(data) {
                    alert("Invalid data. Please try again.");
                }
            });
        }
    });

    $("#scanItem").click(function() {
        //  Camera stuff
        Quagga.init({
            locate: true,
            inputStream: {
                name: "Live",
                type: "LiveStream",
                target: document.querySelector('#camera')
            },
            decoder: {
                readers: ["upc_reader"]
            },
            patchSize: "medium",
            debug: {
                showCanvas: true,
                showPatches: true,
                showFoundPatches: true,
                showSkeleton: true,
                showLabels: true,
                showPatchLabels: true,
                showRemainingPatchLabels: true,
                boxFromPatches: {
                    showTransformed: true,
                    showTransformedBox: true,
                    showBB: true
                }
            }
        }, function(err) {
            if (err) {
                console.log(err);
                return
            }
            Quagga.onDetected(function(data) {
                Quagga.stop();
                $("#camera").children().remove();

                $.ajax({
                    type: "POST",
                    url: "/lookupItem",
                    data: {
                        upc: data.codeResult.code
                    },
                    success: function(data) {
                        $(".alert").removeClass("hidden");
                        $(".alert").text(data.product.productName + " was added!");
                        $(".juiceImage").show("slow");
                        $(".juiceImage img").prop("src", data.product.primaryImageUrl);
                    },
                    error: function(data) {
                        alert("Invalid data. Please try again.");
                    }
                });
            })

            console.log("Initialization finished. Ready to start");
            Quagga.start();
        });
    })
})