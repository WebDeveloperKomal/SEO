(function ($) {
    var PXLMovingPathHandler = function ($scope, $) {
        $scope.find(".pxl-moving-path").each(function () {
            var $this = $(this);
            var target_wrap = $this.find(".target-wrap");
            var moving_duration = $(this).data('duration');
            gsap.to(target_wrap, {
                motionPath: {
                    path: ".pxl-moving-path svg path",
                    align: ".pxl-moving-path svg path",
                    alignOrigin: [0.5, 0.5],
                    autoRotate: true
                },
                yoyo: true,
                repeat: -1,
                repeatDelay: 1,
                duration: moving_duration,
                ease: "linear"
            });
        });
    };

    $(window).on('elementor/frontend/init', function () {
        elementorFrontend.hooks.addAction('frontend/element_ready/pxl_moving_path.default', PXLMovingPathHandler);
    });
})(jQuery);