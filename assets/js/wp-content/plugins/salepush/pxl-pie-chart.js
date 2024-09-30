(function ($) {
    var pxl_widget_piechart_handler = function ($scope, $) {
        elementorFrontend.waypoint($scope.find('.pxl-pie-chart .pxl-percentage'), function () {
            var track_color = $(this).data('track-color');
            var bar_color_start = $(this).data('barcolor-start');
            var bar_color_end = $(this).data('barcolor-end');
            var line_width = $(this).data('line-width');
            var line_cap = $(this).data('line-cap');
            var chart_size = $(this).data('size');
            var options = {
                animate: 2000,
                lineWidth: line_width,
                barColor: function (percent) {
                    var ctx = this.renderer.getCtx();
                    var canvas = this.renderer.getCanvas();
                    var gradient = ctx.createLinearGradient(0, 0, 0.3 * canvas.width, 0);
                    gradient.addColorStop(1, bar_color_start);
                    gradient.addColorStop(0, bar_color_end);
                    return gradient;
                },
                trackColor: track_color,
                scaleColor: false,
                lineCap: line_cap,
                rotate: 0,
                size: chart_size
            };
            $(this).easyPieChart(options);
        }, {
            offset: '95%',
            triggerOnce: true
        });
    };

    $(window).on('elementor/frontend/init', function () {
        elementorFrontend.hooks.addAction('frontend/element_ready/pxl_pie_chart.default', pxl_widget_piechart_handler);
    });
})(jQuery);