<script> 
        $("#pass").keypress(function(event) {
            if (event.keyCode === 13) {
                $("#GFG_Button").click();
            }
        });
   
        $("#GFG_Button").click(function() {
            alert("Button clicked");
        });