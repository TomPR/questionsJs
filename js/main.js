
$(document).ready(function(){
  $("#addImage").click(function(){
    //alert("fuck");
    bootbox.prompt("Please enter the image url", function(result) {
      if (result != null){
          images += "<img src=" + result + "><br>";
      }
    });
  });

  $('img').error(function(){
        $(this).attr('src', 'img/dead.png');
  });


});
