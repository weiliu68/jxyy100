var isIframeVideo = false;
var offsetTop = 0;

function playAction() {
    var url = location.href;
    var param = url.substring(url.indexOf("?") + 1, url.length);
    var native_random = Math.random;

    var errorString = "<br /><br /><h4>&nbsp;&nbsp;您打开页面出现异常。如果您是直接点击播放列表播放且您的播放列表是2013年3月1日前使用的，请您删除旧播放列表再重试。</h4>";

    if (param == "") {
        document.getElementById('player').innerHTML = errorString;
    }
    else if (param.indexOf("http://") > -1 && param.indexOf("swf") > -1) {
        //document.getElementById('player').innerHTML = '<embed src="' + param + '" flashvars="" allowFullScreen="true" quality="high" width="100%" height="100%" align="middle" allowScriptAccess="never" type="application/x-shockwave-flash"></embed>';
        document.getElementById('player').innerHTML = '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,29,0" width="100%" height="100%"><param name="movie" value="' + param + '"><param name="quality" value="high"><param name="allowFullScreen" value="true" /><param name="wmode" value="transparent" /><embed src="' + param + '"  wmode="transparent" quality="high" flashvars="" allowFullScreen="true" pluginspage="http://www.macromedia.com/go/getflashplayer" type="application/x-shockwave-flash" width="100%" height="100%"></embed></object>';
    }
    else {
        if (param.indexOf("vodinfo") > -1 || !isNaN(param)) {
            $.ajax({
                type: "GET",
                url: "http://newwj.wuji.com/Play?param=" + param + "&callback=?",
                cache: false,
                error: function () { alert("未能播放，请重试或者尝试其它播放源"); },
                dataType: "jsonp",
                jsonp: 'callback',
                success: function (data) {

                    if (data == null || data == "") {
                        document.getElementById('player').innerHTML = errorString;
                        return;
                    }
                    if (data.playurl == "")
                        document.getElementById('player').innerHTML = errorString;
                    else {

                        if (data.flashvars.indexOf("su_") == 0) {
                            InitVideoIframe(data.flashvars, data.playurl);
                            return;
                        }

                        //document.getElementById('player').innerHTML = '<embed src="' + data.playurl + '" flashvars="' + data.flashvars + '" allowFullScreen="true" quality="high" width="100%" height="100%" align="middle" allowScriptAccess="never" type="application/x-shockwave-flash"></embed>';
                        document.getElementById('player').innerHTML = '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,29,0" width="100%" height="100%"><param name="movie" value="' + data.playurl + '"><param name="quality" value="high"><param name="wmode" value="transparent" /><param name="flashvars" value="' + data.flashvars + '" /><param name="allowFullScreen" value="true" /><embed src="' + data.playurl + '" flashvars="' + data.flashvars + '" wmode="transparent" quality="high" allowFullScreen="true" pluginspage="http://www.macromedia.com/go/getflashplayer" type="application/x-shockwave-flash" width="100%" height="100%"></embed></object>';

                    }
                }
            });
        }
        else {
            document.getElementById('player').innerHTML = errorString;
        }
    }
}

var utility = {
    getWinSize: function () {
        var winWidth = parseInt(document.documentElement.clientWidth || document.body.clientWidth, 10);
        var winHeight = parseInt(document.documentElement.clientHeight || document.body.clientHeight, 10);
        return { x: 0, y: 0, width: winWidth, height: winHeight };
    }
};

function InitVideoIframe(param, sourceUrl) {
    isIframeVideo = true;
    InitContainerParam(param);
    $("#player").css("display", "none");
    $("#container").removeAttr("class");
    $("#videoIframe").attr("src", sourceUrl);
    $("body").attr("style", "overflow:hidden;");
    doResize();
}

function InitContainerParam(param) {

    var cWidth = 0;

    if (param == "su_letv3") {
        offsetTop = 125;
        cWidth = 600;
    }
    else {
        offsetTop = 70;
        cWidth = 540;
    }

    $("#container").height(cWidth);
    $("#videoIframe").height(cWidth);
}

function doResize() {

    if (!isIframeVideo) {
        return;
    }

    var winWidth = utility.getWinSize().width;
    var winHeight = utility.getWinSize().height;

    $("#bgBlack").width(winWidth);

    var divWidth = $("#container").width();
    var divHeight = $("#container").height();

    var fpW = winWidth / divWidth;
    var fpH = (winHeight + offsetTop) / divHeight;

    var fp = fpW;

    if (fpW > fpH)
        fp = fpH;

    $("#container").css("zoom", fp);
    var cMT = -1 * offsetTop * fp;
    $("#container").css("margin-top", cMT);

    var f_divWidth = divWidth * fp;
    var f_divHeight = divHeight * fp;

    var bodypl = (winWidth - f_divWidth) / 2
    var bodypt = (winHeight - (f_divHeight)) / 2;

    if (bodypl > 0) {
        $("body").css("padding-left", bodypl + "px"); 
        $("body").css("padding-top", "0px");
        $("#bgBlack").height(0);
    } else {
        $("body").css("padding-left", "0px"); 
        $("body").css("padding-top", ((winHeight - cMT - f_divHeight) / 2) + "px");
        $("#bgBlack").height((winHeight - cMT - f_divHeight) / 2);
    }
}

window.onload = function () {
    doResize();
}
window.onresize = function () { doResize(); }