$(document).ready(function() {
    
    $( "#submit" ).click(function() {
        var isFormValid = true;

        $(".required").each(function(){
            if ($.trim($(this).val()).length == 0){
                $(this).addClass("highlight");
                isFormValid = false;
            }
            else{
                $(this).removeClass("highlight");
            }
        });

        if (!isFormValid) {
            alert("Invalid username and/or password.");
        } else {
            Cookies.set('AdminUser','true',{ expires: 0.01});
            window.location.href='quiz.html';
        }
         
    });
});