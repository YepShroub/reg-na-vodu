$(document).ready(function() {
    $('#regform').submit(function(e) {
        e.preventDefault();
        var nick = $('#nick').val();
        var je_plavec = $("input[name='je_plavec']:checked").val();
        var kanoe_kamarad = $('#kanoe_kamarad').val()

        if(nick.length < 2 || nick.length > 20){
            $('#nick').css("background-color", "#ff9999");
            return false;
        }

        $.get("/api/nickname/" + nick, function(data, status){
            if(data["prihlasen"]){
                return false;
            }
        });

        if(je_plavec == 0){
            alert("Musis umet plavat.");
            return false;
        }

        if(kanoe_kamarad.length != 0 && (kanoe_kamarad.length < 2 || kanoe_kamarad.length > 20)){
            $('#kanoe_kamarad').css("background-color", "#ff9999");
            return false;
        }

        $.post('/registrovat', {nick: nick, je_plavec: je_plavec, kanoe_kamarad: kanoe_kamarad},
            function(data, status){
                alert(data);
                return true;
            }
        );
    });

    $("#nick").change(function(){
        nick = $("#nick").val();
        $.get("/api/nickname/" + nick, function(data, status){
            if(nick.length < 2 || nick.length > 20){
                $("#nick").css("background-color", "");
                return
            }
            if(data["prihlasen"]){
                $("#nick").css("background-color", "#ff9999");
            }
            else{
                $("#nick").css("background-color", "#33ff57");
            }
        });
    });
});