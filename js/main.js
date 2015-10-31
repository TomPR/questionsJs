$(document).on("click", ".alert", function(e) {
            bootbox.alert("Hello world!", function() {
                console.log("Alert Callback");
            });
        });

$(document).ready(function(){
  $("#addImage").click(function(){
    //alert("fuck");
    bootbox.prompt("Please enter the image url", function(result) {
      if (result != null)
        images += "<img src=" + result + "><br>";;
    });
  });
});
