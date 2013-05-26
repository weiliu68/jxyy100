$(function () {
    var Score = getCookie(videoInfo.id);

    var isScore = false;
    if (Score) {
        isScore = true;
    } else {
        Score = 0;
    }
    var _aIndex = $("div.startBox a:[score='" + Score + "']").attr("index") * 1 + 1;
    $("div.startBox a:lt(" + _aIndex + ")").addClass("myScore-on");
    $(".myScore2").text(Score + "分");
    $(".myScore").mouseover(function () {
        if (!isScore) {
            $(this).removeClass("myScore");
            $(this).addClass("myScore-on");
            var _scoreIndex = $(this).attr("index");
            var _score = $(this).attr("score");
            $("div.startBox a:lt(" + _scoreIndex + ")").removeClass("myScore");
            $("div.startBox a:lt(" + _scoreIndex + ")").addClass("myScore-on");
            $(".myScore2").text(_score + "分");
        }
    });
    $(".myScore").mouseout(function () {
        if (!isScore) {
            $(this).removeClass("myScore-on");
            $(this).addClass("myScore");
            var _scoreIndex = $(this).attr("index");

            $("div.startBox a:lt(" + _scoreIndex + ")").removeClass("myScore-on");
            $("div.startBox a:lt(" + _scoreIndex + ")").addClass("myScore");
            $(".myScore2").text(0 + "分");
        }
    });
    $(".myScore").click(function () {
        if (isScore)
            return;
        isScore = true;
        var _scoreIndex = $(this).attr("index");
        var _score = $(this).attr("score");
        $("div.startBox a:lt(" + _scoreIndex + ")").removeClass("myScore");
        $("div.startBox a:lt(" + _scoreIndex + ")").addClass("myScore-on");
        $(".myScore2").text(_score + "分");
        //var _mid = $("#movie_id").val();
        setCookie(videoInfo.id, _score);
        $.get("/Home/SetScore", { mid: videoInfo.id, type: videoInfo.videoType, score: _score }, function (result) { $("strong.grade-score").html(result.Score + '<span class="title12">分</span>') });
    });
    $("#container").scroll(function () {
        //CheckCanShowRecommend();
    });
    $(".vlist-group li").click(function () {
        var _index = $(this).attr("index");
        var _ctrl = $(this).attr("ctrl");
        $(".vlist-group li[ctrl='" + _ctrl + "']").removeClass("cur");
        $(this).addClass("cur");
        $("." + _ctrl).hide();
        var _bectrl = $("div." + _ctrl + "[index='" + _index + "']");
        _bectrl.show()

        var vfold = $("#header").height() + $("#container").height();
        var vt = _bectrl.offset().top + 40;

        //alert(vt + " _ " + vfold + " _ " + ((vt - vfold) + 25));

        if (vt > vfold) {
            $("#container").animate({ scrollTop: ($("#container").scrollTop() + (vt - vfold) + 40) }, 200);
        }
    });

    $("#change").click(function () {
        getRecommend();
    });

    function setCookie(NameOfCookie, value) {
        var today = new Date();
        var ExpireDate = new Date(2099, 1, 1); ;
        document.cookie = NameOfCookie + "=" + escape(value) + ("; expires=" + ExpireDate.toGMTString());
    }
    function getCookie(NameOfCookie) {
        if (document.cookie.length > 0) {
            var begin = document.cookie.indexOf(NameOfCookie + "=");
            if (begin != -1) {
                begin += NameOfCookie.length + 1;
                end = document.cookie.indexOf(";", begin);
                if (end == -1) end = document.cookie.length;
                return unescape(document.cookie.substring(begin, end));
            }
        }
        return null;
    }
})
function trim(str) {
    return str.replace(/(^\s*)|(\s*$)/g, '');
}

var getRecommend = function () {
    var native_random = Math.random;
    //var category = $("#category").val();
    $.getJSON("/Home/Change/", { r: native_random, type: videoInfo.videoType }, function (result) {
        var _html = [];

        for (var r = 0; r < result.length; r++) {
            var cate = trim(result[r].category);
            var titleTemp = trim(result[r].title);
            if (cate == "movie")
                cate = "poster";
            _html.push((r + 1) % 7 == 0 ? '<li class="last">' : '<li>');
            _html.push(' <a title="' + titleTemp + '" class="avatar" href="/Vod?mid=' + result[r].id + videoInfo.videoType + '">');
            _html.push('<b class="mask-play"></b>');
            _html.push('<img alt="' + titleTemp + '" src="http://hb.wuji.com/' + videoInfo.videoType + '/' + result[r].tag + '/' + result[r].id + '.jpg" onerror="OnImgError(this)"/>');
            _html.push('<span class="tip">' + result[r].publicyear + '</span> </a><h4 class="name">');
            _html.push('<a title="' + titleTemp + '" href="/Vod?mid=' + result[r].id + videoInfo.videoType + '">');
            _html.push(titleTemp + '</a></h4><p class="info">' + result[r].category + '</p></li>');
        }

        $("#recommend").empty();
        $("#recommend").append(_html.join(''));
    });
}
var recommendChecked = false;
var CheckCanShowRecommend = function () {
    if (recommendChecked)
        return;
    var fold = $("#container").scrollTop() + $("#container").height();
    var f = $("#recommend").offset().top + 200;
    if (fold > f) { getRecommend(); recommendChecked = true; }
}
var getMovieScoreAndHits = function () {
    //var mid = $("#movie_id").val();
    var native_random = Math.random;
    $.getJSON("/Vod/GetScoreAndHits", {r:native_random, mid: videoInfo.id, type: videoInfo.videoType }, function (result) {
        $("strong.grade-score").html(result.score + '<span class="title12">分</span>');
        $("#movie_hits_lbl").html(result.hits);
    });
}
function onInitSrcShow() {
    var src = location.hash;
    if (src.indexOf("#src=") != 0)
        return;
    src = src.replace("#src=", ""); 
    $(".ctrl-supply li").removeClass("cur");
    $(".ctrl-supply li[index='" + src + "']").addClass("cur");
    $(".btns-play").hide();
    $("div.btns-play[index='" + src + "']").show();
}
var onInit = function () { getMovieScoreAndHits(); getRecommend(); onInitSrcShow(); InitVideoListSrcInfo('s'); }