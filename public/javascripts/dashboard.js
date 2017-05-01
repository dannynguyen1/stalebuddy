$(document).ready(function(e) {
    $("#add_button").click(function() {
        if ($("#product").val() == "" ||
            $("#expiration").val() == "" ||
            $("#price").val() == "") {
           $("#Error_message").show();
        } else if ($("#ItemForm").valid() === true){
           var date_holder = new Date($("#expiration").val());
           date_holder.setDate = (date_holder.getDate() + 1);
           
            $.ajax({
                type: "POST",
                url: "/addItem",
                data: {
                    product: $("#product").val(),
                    expiration: date_holder.toLocaleDateString(),
                    comments: $("#comments").val(),
                   /*Credit to Rounding Decimals: http://stackoverflow.com/a/6134070*/
                    price: parseFloat(Math.round(($("#price").val()) * 100) / 100).toFixed(2)
                },
                success: function(data) {
                   $("#Error_message").hide();
                    location.reload(true);
                },
                error: function(data) {
                     $("#Error_message").show();
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