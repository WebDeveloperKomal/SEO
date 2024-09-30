(function ($) {
    var PXLTabsHandler = function ($scope, $) {
        var first_toggle_bg = $scope.find(".pxl-tabs .tabs-title .toggle-slide");
        var first_active = $scope.find(".pxl-tabs .tabs-title .tab-title.active");
        var f_ative_w = first_active.width();
        var f_ative_offset = first_active.get(0).offsetLeft;
        first_toggle_bg.width(f_ative_w);
        first_toggle_bg.css({ left: f_ative_offset });
        $scope.find(".pxl-tabs .tabs-title .tab-title").on("click", function (e) {
            e.preventDefault();
            var target = $(this).data("target");
            var toggle_bg = $(this).parent().find('.toggle-slide');
            var ative_w = $(this).width();
            var ative_offset = $(this).get(0).offsetLeft;
            $(this).addClass('active').siblings().removeClass('active');
            $(target).addClass('active').siblings().removeClass('active');
            toggle_bg.width(ative_w);
            toggle_bg.css({ left: ative_offset });
            $(target).siblings().find('.pxl-animate').each(function () {
                var data = $(this).data('settings');
                $(this).removeClass('animated ' + data['animation']).addClass('pxl-invisible');
            });
            $(target).find('.pxl-animate').each(function () {
                var data = $(this).data('settings');
                var cur_anm = $(this);
                setTimeout(function () {
                    $(cur_anm).removeClass('pxl-invisible').addClass('animated ' + data['animation']);
                }, data['animation_delay']);

            });
        });
    };
    var PXLCircleTabsHandler = function ($scope, $) {
        var tabs_icon = $scope.find(".pxl-circle-tabs .tabs-icon");
        var circle_size = parseInt(tabs_icon.data("circle-size"));
        var item_count = parseInt(tabs_icon.data("count"));
        var item_size = parseInt(tabs_icon.data("item-size"));
        CircleTabsInit(tabs_icon, item_count, circle_size, item_size);
        $(window).on("load resize", function (e) {
            var win = $(this); //this = window
            if (win.width() <= 1199) {
                circle_size = 360;
            }
            if (win.width() <= 500) {
                circle_size = 250;
                item_size = 50;
            }
            CircleTabsInit(tabs_icon, item_count, circle_size, item_size);
        });

        $scope.find(".pxl-circle-tabs .tabs-icon .tab-icon").on("mousemove", function (e) {
            e.preventDefault();
            var target = $(this).data("target");
            $(this).addClass('active').siblings().removeClass('active');
            $(target).addClass('active').siblings().removeClass('active');
            $(target).siblings().find('.pxl-animate').each(function () {
                var data = $(this).data('settings');
                $(this).removeClass('animated ' + data['animation']).addClass('pxl-invisible');
            });
            $(target).find('.pxl-animate').each(function () {
                var data = $(this).data('settings');
                var cur_anm = $(this);
                setTimeout(function () {
                    $(cur_anm).removeClass('pxl-invisible').addClass('animated ' + data['animation']);
                }, data['animation_delay']);

            });
        });
    };
    function CircleTabsInit(obj, item_count, circle_size, item_size) {
        var angle = 360 / item_count;
        var rot = -angle;
        obj.css({
            width: circle_size,
            height: circle_size
        });
        obj.find(".tab-icon").each(function (e) {
            $(this).css({
                width: item_size,
                height: item_size,
                margin: -0.5 * item_size,
                'transform': 'rotate(' + rot + 'deg) translate(' + circle_size / 2 + 'px) rotate(' + -1 * rot + 'deg)'
            });
            rot = rot + angle;
        });
    }
    // Make sure you run this code under Elementor.
    $(window).on('elementor/frontend/init', function () {
        elementorFrontend.hooks.addAction('frontend/element_ready/pxl_tabs.default', PXLTabsHandler);
        elementorFrontend.hooks.addAction('frontend/element_ready/pxl_circle_tabs.default', PXLCircleTabsHandler);
    });
})(jQuery);