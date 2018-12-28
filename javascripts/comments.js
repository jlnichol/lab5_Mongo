$(/*global $*/
    document).ready(function() {
    $("#postComment").click(function() {
        var myobj = { Name: $("#name").val(), Comment: $("#comment").val() };
        var jobj = JSON.stringify(myobj);
        $("#json").text(jobj);
        var url = "comment";
        $.ajax({
            url: url,
            type: "POST",
            data: jobj,
            contentType: "application/json; charset=utf-8",
            success: function(data, textStatus) {
                $("#done").html(textStatus);
            }
        })
    });
    
  $("#getComments").click(function() {
      var URL = "comment?q=";
     // if($("#querier").val()) {
          URL += $("#querier").val();
     // }
     console.log("the url is ", URL);
      var everything = "<ul>"
      $.getJSON(URL, function(data) {
          for(var comment in data) {
              var com = data[comment];
            everything += "<li> Name: " + com.Name + " -- Comment: " + com.Comment + "</li>"; 
          }
          everything += "</ul>";
        $("#comments").html(everything);
      })
  })
  
  $("#deleteComments").click(function() {
      $.ajax({
          url: "comment",
          type: "DELETE",
          success: function(data, textStatus) {
                $("#done").html(textStatus);
            }
        })
  })
});
