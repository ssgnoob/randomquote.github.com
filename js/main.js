$(window).resize(function(){
    $(".main").height($(window).height());
    //改变div的宽度
    $(".main").width($(window).width());
});
$(function () {
    $('[data-toggle="popover"]').popover();
    $(".main").height($(window).height());
    //改变div的宽度
    $(".main").width($(window).width());
    $("#get").on("click",function(){
        /*var url='http://api.avatardata.cn/MingRenMingYan/Random?key=0370348427594511883fd1966d2f3bdf';
         loadXMLDoc(url);*/
        var height=$(window).height()*0.3;
        $(".modal-content").css("top",height);
        $('#icon').addClass('fa fa-circle-o-notch fa-spin');
        getinfo();
    });
    $("#clear").on("click",function(){
        $(".star").remove();
    });
    $(".menu_btn").on("click",function () {
        if($(".menu_btn").css("transform")=="matrix3d(1, 0, 0, 0, 0, -1, 1.22465e-16, 0, 0, -1.22465e-16, -1, 0, 0, 0, 0, 1)"){
            $(".menu_item").fadeOut(function () {

            });
            $(".menu_btn").css("transform","rotateX(0deg)");

        }
        else{
            $(".menu_item").fadeIn(function () {

            });
            $(".menu_btn").css("transform","rotateX(180deg)");

        }
    })
});
function getinfo(){
    $.ajax({
        headers: {
            "X-Mashape-Key": "OivH71yd3tmshl9YKzFH7BTzBVRQp1RaKLajsnafgL2aPsfP9V",
            Accept: "application/json",
            "Content-Type": "application/x-www-form-urlencoded"
        },
        url: 'https://andruxnet-random-famous-quotes.p.mashape.com/cat=',
        success:function (data) {
            $('#get').popover('destroy')
            $('#icon').removeClass('fa fa-circle-o-notch fa-spin');
            $(".modal-body").html(data.quote);
            $(".modal-body").append(" <div class='modal-body-footer'></div>");
            $(".modal-body-footer").html("---"+data.author);
            $('#twitter_btn').attr('href', 'https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=' + encodeURIComponent('"' + data.quote + '" ' + data.author));
            $("#myModal").modal("show");
            var x=Math.random()*40+30;
            var y=Math.random()*10+50;
            var size=Math.random()*3+2;
            var temp="<div class='star' style='top:"+y+"%; left: "+x+"%;transform: scale("+size+");'><div class='quote_info' hidden=true>"+data.quote+"</div><div class='author_info' hidden=true>"+data.author+"</div></div>"
            $(".content").append(temp);
            $(".star").hover(function(){
                $(".star").css("background",'rgba(255,255,255,0.8)');
                $(".star").css("animation-play-state","paused");
                $(this).css("background","#fff");
                $(this).css("animation-play-state","running");
            });
            $(".star").mouseout(function(){
                $(".star").css("background",'#fff');
                $(".star").css("animation-play-state","running");
            })
            $(".star").click(function(){
                var quote=$(this).children(".quote_info").html();
                var author=$(this).children(".author_info").html();
                $(".modal-body").html(quote);
                $(".modal-body").append(" <div class='modal-body-footer'></div>");
                $(".modal-body-footer").html("---"+author);
                $('#twitter_btn').attr('href', 'https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=' + encodeURIComponent('"' + quote + '" ' + author));
                $("#myModal").modal("show");
            })
        },
        error:function (data) {
            alert(JSON.stringify(data));
        }
    })
}


/*var xmlhttp;
 function loadXMLDoc(url)
 {

 xmlhttp=null;
 if (window.XMLHttpRequest)
 {// code for all new browsers
 xmlhttp=new XMLHttpRequest();
 }
 else if (window.ActiveXObject)
 {// code for IE5 and IE6
 xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
 }
 if (xmlhttp!=null)
 {
 xmlhttp.onreadystatechange=state_Change;
 xmlhttp.open("post",url,true);
 xmlhttp.send(null);
 }
 else
 {
 alert("Your browser does not support XMLHTTP.");
 }
 }

 function state_Change()
 {
 if (xmlhttp.readyState==4)
 {// 4 = "loaded"
 if (xmlhttp.status==200)
 {// 200 = OK
 alert(1);
 }
 else
 {
 alert("Problem retrieving XML data");
 }
 }
 }*/

