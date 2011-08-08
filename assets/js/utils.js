now.speak = function(data){
    console.log(data);
    if(data == "OPEN"){
      say("Click the center square to access google.");

    }else{
      say(data);
    }

}
now.show_image = function(url){
    if(url != "http://www.google.com"){
      var randomnumber=Math.floor(Math.random()*10);
      if(url != "None"){
        $('#box-'+randomnumber).html('<img class="temporary-image" src="'+url+'" alt="" width="300" height="200" />');//.delay(5000).html("");
        $('.temporary-image').delay(5000).fadeOut('fast',function(){});
      }
    }else{
      //Insert link
      $('#box-5').html('<a href="http://google.com"><div style="width:299px;height:199px;"></div></a>');
    
    }
}

function say(string_to_say){
    var words = string_to_say.split(" ");
    words = words.length;
    //LIMIT 100 CHARACTERS
    //var apikey= "TNsFxrxp8QIlXI4Y0XBIAv4jojqQdckGLOWWyDiYVpHs*";
    var apikey = "1374C3E2EB87F9B5B7928AFB2B5D46D3205710D7";
    //$('#audio').html('<audio src="http://api.microsofttranslator.com/V2/Http.svc/Speak?language=en&appid='+apikey+'&text='+string_to_say+'" autoplay="True" preload="auto" autobuffer></audio>');
    $('#audio').html('<audio src="http://api.microsofttranslator.com/V2/Http.svc/Speak?language=en&appid='+apikey+'&text='+string_to_say+'" autoplay="True" preload="auto" autobuffer></audio>');
    //$('#audio').html('<audio src="http://translate.google.com/translate_tts?ie=UTF-8&q='+string_to_say+'&tl=en&prev=input" autoplay="True" preload="auto" autobuffer ></audio>');
    //$('#audio').html('<audio src="http://ambushnetworks.com/rapsynth/audio?text='+string_to_say+'" autoplay="True" preload="auto" autobuffer></audio>');
    console.log("it should have said it...");
    var i = 0;
    while(i<words){
        pulseRandom();
        i++;
    }
}

function play(audio_url){
    $('#errors').html('<audio src="'+audio_url+'" autoplay="True" preload="auto" autobuffer></audio>');
}

function pulseRandom(){
    var randomnumber=Math.floor(Math.random()*11)
    pulse(randomnumber);
}

function pulse(which){
    switch(which){
        case 1:
            $('#box-1').effect("highlight", {color: '#17232E'}, 3000);
            break;
        case 2:
            $('#box-2').effect("highlight", {color: '#021221'}, 3000);
            break;
        case 3:
            $('#box-3').effect("highlight", {color: '#010305'}, 3000);
            break;
        case 4:
            $('#box-4').effect("highlight", {color: '#17232E'}, 3000);
            break;
        case 5:
            $('#box-5').effect("highlight", {color: '#005F6B'}, 3000);
            break;
        case 6:
            $('#box-6').effect("highlight", {color: '#17232E'}, 3000);
            break;
        case 7:
            $('#box-7').effect("highlight", {color: '#00B4CC'}, 3000);
            break;
        case 8:
            $('#box-8').effect("highlight", {color: '#343838'}, 3000);
            break;
        case 9:
            $('#box-9').effect("highlight", {color: '#008C9E'}, 3000);
            break;
        default:
                $('#box-1').delay(1000).effect("highlight", {color: '#17232E'}, 3000);
                $('#box-2').delay(1000).effect("highlight", {color: '#021221'}, 3000);
                $('#box-3').delay(1000).effect("highlight", {color: '#010305'}, 3000);
                $('#box-4').delay(1000).effect("highlight", {color: '#17232E'}, 3000);
                $('#box-5').delay(1000).effect("highlight", {color: '#005F6B'}, 3000);
                $('#box-6').delay(1000).effect("highlight", {color: '#17232E'}, 3000);
                $('#box-7').delay(1000).effect("highlight", {color: '#00B4CC'}, 3000);
                $('#box-8').delay(1000).effect("highlight", {color: '#343838'}, 3000);
                $('#box-9').delay(1000).effect("highlight", {color: '#008C9E'}, 3000);
    }

}
