
(function ($) {
    $.fn.lazyload = function (options) {
        var settings = {
            threshold: 0,
            failurelimit: 0,
            event: "scroll",
            effect: "show", //Ĭ��Ч��Ϊshow
            container: $("#container")
        };
        if (options) {
            $.extend(settings, options);
        }
        var elements = this;

        if ("scroll" == settings.event) {
            $(settings.container).bind("scroll", function (event) {
                var counter = 0;
                elements.each(function () {
                    if ($.abovethetop(this, settings) ||
                        $.leftofbegin(this, settings)
                        ) {
                        self.loaded = false;
                    }
                    else if (!$.belowthefold(this, settings) &&
                        !$.rightoffold(this, settings)) {
                        self.loaded = false;
                        $(this).trigger("appear");
                    }
                    else {
                        self.loaded = true;
                        if (counter++ > settings.failurelimit) {
                            return false;
                        }
                    }
                });
                var temp = $.grep(elements, function (element) {
                    return !element.loaded;
                });
                elements = $(temp);
            });
        }
        this.each(function () {
            var self = this;
            if (settings.placeholder) {
                $(self).attr("src", settings.placeholder);
            }
            $(self).one("appear", function () {
                if (!this.loaded) {
                    $("<img />")
                        .bind("load", function () {
                            $(self)
                                .hide()
                                .attr("src", $(self).attr("original"))
                                [settings.effect](settings.effectspeed);
                            self.loaded = true;
                        })
                        .attr("src", $(self).attr("original"));
                };
            });
            if ("scroll" != settings.event) {
                $(self).bind(settings.event, function (event) {
                    if (!self.loaded) {
                        $(self).trigger("appear");
                    }
                });
            }
        });
        $(settings.container).trigger(settings.event);
        return this;
    };
    $.belowthefold = function (element, settings) {
        if (settings.container === undefined || settings.container === $("#container")) {
            var fold = $("#container").height() + $("#container").scrollTop();
        } else {
            var fold = $(settings.container).offset().top + $(settings.container).height();
        }
        return fold <= $(element).offset().top - settings.threshold;
    };
    $.rightoffold = function (element, settings) {
        if (settings.container === undefined || settings.container === $("#container")) {
            var fold = $("#container").width() + $(container).scrollLeft();
        } else {
            var fold = $(settings.container).offset().left + $(settings.container).width();
        }
        return fold <= $(element).offset().left - settings.threshold;
    };
    $.abovethetop = function (element, settings) {
        if (settings.container === undefined || settings.container === $("#container")) {
            var fold = $("#container").scrollTop();
        } else {
            var fold = $(settings.container).offset().top;
        }
        return fold >= $(element).offset().top + settings.threshold + $(element).height();
    };
    $.leftofbegin = function (element, settings) {
        if (settings.container === undefined || settings.container === $("#container")) {
            var fold = $("#container").scrollLeft();
        } else {
            var fold = $(settings.container).offset().left;
        }
        return fold >= $(element).offset().left + settings.threshold + $(element).width();
    };
    $.extend($.expr[':'], {
        "below-the-fold": "$.belowthefold(a, {threshold : 0, container: window})",
        "above-the-fold": "!$.belowthefold(a, {threshold : 0, container: window})",
        "right-of-fold": "$.rightoffold(a, {threshold : 0, container: window})",
        "left-of-fold": "!$.rightoffold(a, {threshold : 0, container: window})"
    });
})(jQuery);