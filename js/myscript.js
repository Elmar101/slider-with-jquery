$(document).ready( function(){
    loadDoc("slider.json", openJson);
    let sldr,txt;
    let t;
    let imgs = [];
    let cardTxt = [];
    let urls = [];
    let cardText = document.getElementById("card-text");
    let inc=0;
    let dir=1;
   
    function loadDoc(url, cFunction) {
      let xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
          cFunction(this);
        }
      };
      xhttp.open("GET", url, true);
      xhttp.send();
    }

    function openJson(xml) {
      sldr = JSON.parse(xml.responseText).slider;
      for( i=0; i< sldr.length; i++){
        txt = sldr[i];
        imgs[i] = txt.image;
        cardTxt[i] = txt.text;
        urls[i] = txt.url;
      }
      createList();
      start();
      click();
    }
  
    function createList(){
      for( i=1; i <=imgs.length; i++ ){
          $("#thumbs").append('<div>'+i+'</div>');
      }
    }

    function click(){
      $("#thumbs>div").click(function(){
        inc = $(this).index()-1;
        start();
      });
    }

    function show(){
        if( inc >= imgs.length ) inc = 0;
        if( inc < 0 ) inc = imgs.length-1;
        $("#slide").animate(0,function(){
          $("#slide").css({
							right: dir * 100 + "%",
							backgroundImage: "url('img/" + imgs[inc] + "')"
        })
        content()
        })
				.animate({right: 0}, "slow", function(){
          $("#slider").css("backgroundImage","url('img/" + imgs[inc] + "')");
        })  
    }

    function content() {
        let kod = "";
        kod += '<h1>' + cardTxt[inc].h1 + '</h1>';
        console.log(inc)
        kod += '<p>' + cardTxt[inc].p + '</p>';
        cardText.innerHTML = kod;
    }

    $("#slider").click(function(e){
      if(e.pageY - $(this).offset().top<$("#slider").outerHeight()-$("#ribbon").outerHeight() ||
      e.pageX - $(this).offset().left<($("#slider").outerWidth()-$("#ribbon").outerWidth()-32)
      ){
        window.location = urls[inc];
      } 
    });

    $(".right").click(function(){ inc++; start(); })
    
    $(".left").click(function(){ inc--; start(); })
    
    function start(){
        stop();
        show();
        t = setInterval( ()=>{ inc ++; show(); },3000)
    }

    function stop(){ clearInterval(t) }
})