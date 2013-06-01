$(function () {
    $("#div_favicons li:gt(6)").hide();

    $("ul.ctrl-fav li").click(function () {
        $("ul.ctrl-fav li").removeClass("cur");
        $(this).addClass("cur");
        var _index = $(this).attr("index");
        var _prevIndex = $(this).prev("li").attr("index");
        if (_prevIndex) {
            $("#div_favicons li").hide();
            $("#div_favicons li:lt(" + _index + ")").show();
            $("#div_favicons li:lt(" + _prevIndex + ")").hide();
        } else {
            $("#div_favicons li").hide();
            $("#div_favicons li:lt(" + _index + ")").show();
        }
    });
    //前一页
    $(".ctrl-prev").click(function () {
        var cur = $("ul.ctrl-fav li.cur");
        var _index = cur.attr("index");
        var _prevIndex = cur.prev("li").attr("index");
        if (_prevIndex) {
            $("ul.ctrl-fav li").removeClass("cur");
            cur.prev("li").addClass("cur");
            $("#div_favicons li").hide();
            // $("#div_favicons li:lt(" + _index + ")").hide();
            $("#div_favicons li:lt(" + _prevIndex + ")").show();
            var _prev2 = cur.prev("li").prev("li").attr("index");
            if (_prev2) {
                $("#div_favicons li:lt(" + _prev2 + ")").hide();
            }
        }
    });
    //下一页
    $(".ctrl-next").click(function () {
        var cur = $("ul.ctrl-fav li.cur");

        var _index = cur.attr("index");
        var _nextIndex = cur.next("li").attr("index");
        if (_nextIndex) {
            $("ul.ctrl-fav li").removeClass("cur");
            cur.next("li").addClass("cur");
            $("#div_favicons li").hide();
            $("#div_favicons li:lt(" + _nextIndex + ")").show();
            $("#div_favicons li:lt(" + _index + ")").hide();
        }
    });

    var _slideIndex = 1, rollTime = 5000, isRoll = true;
    var _slideLength = $(".output li").length;
    $(".output li").hide();
    $(".output li[index='1']").show();
    $(".btn-prev").click(function () {
        if (_slideIndex <= 1) {
            _slideIndex = _slideLength;
        } else {
            _slideIndex--;
            if (_slideIndex < 1)
                _slideIndex = _slideLength;
        }
        $(".output li").hide();
        $(".output li[index='" + _slideIndex + "']").show();
    });

    $(".btn-next").click(function () {
        roll();
    });
    function roll() {
        if (_slideIndex >= _slideLength) {
            _slideIndex = 1;
        } else {
            _slideIndex++;
            if (_slideIndex > _slideLength)
                _slideIndex = 1;
        }
        $(".output li").hide();
        $(".output li[index='" + _slideIndex + "']").show();
    }

    $("div.feature").mouseover(function () {
        isRoll = false;
    });

    $("div.feature").mouseout(function () {
        isRoll = true;
    });

    function roll2() {
        if (isRoll)
            roll();
        setTimeout(roll2, rollTime);
    }
    setTimeout(roll2, rollTime);
});