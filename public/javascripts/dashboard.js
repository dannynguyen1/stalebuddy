$(document).ready(function(e) {
    $("#add_button").click(function() {
        if ($("#product").val() == "" ||
            $("#expiration").val() == "" ||
            $("#price").val() == "") {
            alert("Please fill out all form items.");
        } else {
            $.ajax({
                type: "POST",
                url: "/addItem",
                data: {
                    product: $("#product").val(),
                    expiration: $("#expiration").val(),
                    comments: $("#comments").val(),
                    price: $("#price").val()
                },
                success: function(data) {
                    location.reload(true);
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
                        $("#product").val(data.product.productName);
                        $("#comments").val(data.product.longDescription);
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