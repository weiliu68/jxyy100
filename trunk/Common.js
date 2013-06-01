﻿var utility = {
    getWinSize: function () {
        var winWidth = parseInt(document.documentElement.clientWidth || document.body.clientWidth, 10);
        var winHeight = parseInt(document.documentElement.clientHeight || document.body.clientHeight, 10);
        return { x: 0, y: 0, width: winWidth, height: winHeight };
    }
};

var doResize = function () {
    var winSize = utility.getWinSize();
    var obj = document.getElementById('container');
    if( obj != null)
        obj.style.height = (winSize.height - 50) + "px";
}

var doCloseHis = function () {
    var oHis = $('#history-dropmenu');
    oHis.css("display","none");
}

function OnImgError(img) {
    img.src = "/Images/default_movie.jpg";
    img.onerror = null;
}

//Added by Arky 2012.11.19
function HisMenu() {
    var self = this;
    this.isLeaved = true;
    this.oMenu = $('#history-dropmenu');
    this.oList = $('#his_list');
    this.btnHis = $('#btnHis');    
    this.winSize = utility.getWinSize();

    //初始化历史列表
    this.init = function () {
        self.oMenu.css({ right: (self.winSize.width / 2 - 480 + 9) + "px", display: 'none' });

        self.btnHis.mouseleave(function () {
            self.isLeaved = true;
            setTimeout(self.leaveMenu, 2000);
        });
        self.oMenu.mouseleave(function () {
            self.isLeaved = true;
            setTimeout(self.leaveMenu, 2000);
        });
        self.oMenu.mouseenter(function () {
            self.isLeaved = false;
        });

        var oldCookie = gHisMenu.getCookie();

        if (oldCookie == null || oldCookie == '') oldCookie = '[]';
        var hisList = eval(oldCookie);
        var innertext = '';
        for (var i = 0; i < hisList.length; i++) {
            var inhtml = '<li><span class="h-info"><b class="cYellow">{0}</b></span><span class="h-num">' + (i + 1) + '</span><a href=\'javascript:OpenMovie("' + hisList[i].movieid + '","' + hisList[i].cid + '","' + hisList[i].sid + '","' + hisList[i].title + '","' + hisList[i].url + '")\' class="h-name">' + hisList[i].title + '</a></li>'
            if (hisList[i].sid != '1') {
                //inhtml = inhtml.replace('{0}', '第' + hisList[i].sid + '集');
                inhtml = inhtml.replace('{0}', '');
            } else {
                inhtml = inhtml.replace('{0}', '');
            }
            innertext += inhtml;
        }
        self.oList.html(innertext);

        if (hisList.length == 0) self.oList.html('<li><span class="h-info">暂无记录</span></li>');

    };
    //打开历史列表
    this.openHis = function () {
        self.isLeaved = false;
        self.oMenu.fadeIn('normal', 'linear');
    };
    //关闭历史列表
    this.closeHis = function () {
        self.oMenu.fadeOut('normal', 'linear');
        //alert(self.getCookie());
    };
    //清空列表
    this.clear = function () {
        self.delCookie();
    };
    //离开菜单
    this.leaveMenu = function () {
        if (self.isLeaved) {
            self.oMenu.fadeOut('normal', 'linear');
        }
    };


    //设置cookie
    this.setCookie = function (value) {
        var Days = 30; //保存 30 天
        var exp = new Date();
        exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
        document.cookie = "playhis=" + escape(value) + ";path=/;expires=" + exp.toGMTString();
    };
    //读取cookie
    this.getCookie = function () {
        var arr = document.cookie.match(new RegExp("(^| )playhis=([^;]*)(;|$)"));
        if (arr != null) return unescape(arr[2]); return null;
    };
    //删除cookie
    this.delCookie = function () {
        var exp = new Date();
        exp.setTime(exp.getTime() - 1);
        var cval = self.getCookie();
        if (cval != null) document.cookie = "playhis=" + cval + ";path=/;expires=" + exp.toGMTString();
        self.init();
    };
}

//历史列表
var gHisMenu = null;
$(document).ready(function () {
    gHisMenu = new HisMenu(); //历史列表菜单
    gHisMenu.init();
});

window.onload = function () {
    doResize();
}
window.onresize = function () { doResize(); }

$(function () {

    $('.go2top').hide();
    $(".ctrl-supply li").click(function () {
        $(".ctrl-supply li").removeClass("cur");
        $(this).addClass("cur");
        var _index = $(this).attr("index");
        $(".btns-play").hide();
        $("div.btns-play[index='" + _index + "']").show();
    });
    $('.go2top').click(function () {
        $("#container").animate({ scrollTop: 0 }, 200);
        return false;
    });
    $("#container").scroll(function () {
        var _scrollTop = $("#container").scrollTop();
        if (_scrollTop > 50)
            $('.go2top').show();
        else
            $('.go2top').hide();
    });
    $(".btn-search").click(function () {
        var _search = $("#search input.input-search").val();
        if ($.trim(_search) != "")
            $("#search").submit();
        else
            return false;
    });
})

function ChangeWJListType(t) {
    $.post("/List/ChangeListType", { t: t }, function (data) {
        location.href = location.href;
    });
}

function ConvertSrcInfoToString(o) {
    return o.name + "\r\n广告：" + o.ad + "，速度：" + o.speed + "，清晰度：" + o.definition + "，片源质量：" + o.quality;
}

function InitVideoListSrcInfo(o) {
    var srcInfo = {};

    srcInfo["youku"] = { name: "优酷", ad: "时长时短", speed: "较快", definition: "较清晰", quality: "一般" };
    srcInfo["tudou"] = { name: "土豆", ad: "时长时短", speed: "较快", definition: "较清晰", quality: "一般" };
    srcInfo["letv"] = { name: "乐视", ad: "短", speed: "较快", definition: "高", quality: "很好" };
    srcInfo["qq"] = { name: "腾讯视频", ad: "长", speed: "较快", definition: "较清晰", quality: "较好" };
    srcInfo["iqiyi"] = { name: "爱奇艺", ad: "时长时短", speed: "一般", definition: "较清晰", quality: "较好" };
    srcInfo["pps"] = { name: "PPS", ad: "较长", speed: "较快", definition: "较清晰", quality: "一般" };
    srcInfo["pptv"] = { name: "PPTV", ad: "较长", speed: "较快", definition: "较清晰", quality: "较好" };
    srcInfo["56"] = { name: "56视频", ad: "较短", speed: "较快", definition: "一般", quality: "一般" };
    srcInfo["sohu"] = { name: "搜狐视频", ad: "较短", speed: "较快", definition: "较清晰", quality: "较好" };

    for(key in srcInfo)
    {
        $("." + o + "-" + key).attr("title", ConvertSrcInfoToString(srcInfo[key]));
    }
}

function PlayVideo(src, sequence, year) {
    if (year == null) {
        year = '';
    }
    OpenMovie(videoInfo.id + '' + year + '' + videoInfo.videoType + '_' + src + "_" + sequence, videoInfo.video_sources, sequence, videoInfo.video_title, '', src);
}

function OpenMovie(movieid, cid, sid, title, url, src) {
    if (gHisMenu != null) {
        var o = new Object();
        o.movieid = movieid;
        o.cid = cid;
        o.sid = sid;
        o.title = title;
        o.url = url;

        var oldCookie = gHisMenu.getCookie();
        if (oldCookie == null || oldCookie == '') oldCookie = '[]';

        var hisList = eval(oldCookie);
        hisList.unshift(o);

        var saveStr = '';
        var movieid = '';
        var listCount = 0;
        for (var i = 0; i < hisList.length; i++) {
            if (listCount == 6) break;  //满6条则跳出
            if (i == 0) {
                saveStr = '[';
                movieid = hisList[i].movieid;
            } else {
                if (movieid == hisList[i].movieid) continue;
                saveStr += ',';
            }
            var tmp = '{movieid:"' + hisList[i].movieid + '",cid:"' + hisList[i].cid + '",sid:"' + hisList[i].sid + '",title:"' + hisList[i].title + '",url:"' + hisList[i].url + '"}';
            saveStr += tmp;
            listCount++;
        }
        saveStr += ']';
        gHisMenu.setCookie(saveStr);
        gHisMenu.init();
    }
    try {
        //external.zyExternal.getMainVersion();
        //play
    	$.each(videoItem, function() {
            clientCall("playlist",this);
        });
    	
//		var play={
//				"id":videoInfo.id,
//				"partid":sid,
//				"srcid":src
//			};
		var play='{'+
				'"id":'+videoInfo.id+','+
				'"partid":"'+sid+'",'+
				'"srcid":"'+src+'"}';
		clientCall("play",play);
    } catch (e) { downplayer(); };
};

function clientCall(t,d){
	window.open("jx://protocal?type=cmd&action="+ t +"&item="+encodeURIComponent(JSON.stringify(d)));
}

function downplayer() {
    if (confirm('本视频需要安装极迅影音，点击确定下载')) {
        var _url = 'http://www.jixun100.com/setup.exe';
        window.location = _url;
    }
}
var loadImage = function () { $("img.lazy").lazyload({ effect: "fadeIn" }); }