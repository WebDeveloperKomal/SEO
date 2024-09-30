(function ($) {
    /**
     * @param $scope The Widget wrapper element as a jQuery element
     * @param $ The jQuery alias
     */

    var Pxl_Global_Animation_Handler = function ($scope, $) {
        elementorFrontend.waypoint($scope.find('.pxl-animate'), function () {
            var $animate_el = $(this),
                data = $animate_el.data('settings');
            if (typeof data['animation'] != 'undefined') {
                setTimeout(function () {
                    $animate_el.removeClass('pxl-invisible').addClass('animated ' + data['animation']);
                }, data['animation_delay']);
            }
        });

        elementorFrontend.waypoint($scope.find('.pxl-scroll'), function () {
            $(this).addClass('pxl-animated');
        });
        elementorFrontend.waypoint($scope.find('.pxl-image-wg.move-from-left'), function () {
            $(this).addClass('pxl-animated');
        });
        elementorFrontend.waypoint($scope.find('.pxl-image-wg.move-from-left2'), function () {
            $(this).addClass('pxl-animated');
        });
        elementorFrontend.waypoint($scope.find('.pxl-image-wg.move-from-top1'), function () {
            $(this).addClass('pxl-animated');
        });
        elementorFrontend.waypoint($scope.find('.pxl-image-wg.move-from-bottom1'), function () {
            $(this).addClass('pxl-animated');
        });
        elementorFrontend.waypoint($scope.find('.pxl-image-wg.move-from-right'), function () {
            $(this).addClass('pxl-animated');
        });
    };
    function pxlMouseDirection() {
        $('.pxl-grid-direction .item-direction').each(function () {
            $(this).on('mouseenter', function (ev) {
                addClass(ev, this, 'mouse-in in');
            });
            $(this).on('mouseleave', function (ev) {
                addClass(ev, this, 'mouse-out out');
            });
        });

    }
    function getDirection(ev, obj) {
        var w = $(obj).width(),
            h = $(obj).height(),
            x = (ev.pageX - $(obj).offset().left - (w / 2)) * (w > h ? (h / w) : 1),
            y = (ev.pageY - $(obj).offset().top - (h / 2)) * (h > w ? (w / h) : 1),
            d = Math.round(Math.atan2(y, x) / 1.57079633 + 5) % 4;
        return d;
    }
    function addClass(ev, obj, state) {
        var direction = getDirection(ev, obj),
            class_suffix = null;
        $(obj).removeAttr('class');
        switch (direction) {
            case 0: class_suffix = '-top'; break;
            case 1: class_suffix = '-right'; break;
            case 2: class_suffix = '-bottom'; break;
            case 3: class_suffix = '-left'; break;
        }
        $(obj).addClass(state + class_suffix);
    }
    $.fn.ctDeriction = function () {
    }
    $('.pxl-grid-direction .item-direction').ctDeriction();

    function pxlParticles() {
        /* Section Particles */
        setTimeout(function () {
            $(".pxl-row-particles").each(function () {
                particlesJS($(this).attr('id'), {
                    "particles": {
                        "number": {
                            "value": $(this).data('number'),
                        },
                        "color": {
                            "value": $(this).data('color')
                        },
                        "shape": {
                            "type": "circle",
                        },
                        "size": {
                            "value": $(this).data('size'),
                            "random": $(this).data('size-random'),
                        },
                        "line_linked": {
                            "enable": false,
                        },
                        "move": {
                            "enable": true,
                            "speed": 2,
                            "direction": $(this).data('move-direction'),
                            "random": true,
                            "out_mode": "out",
                        }
                    },
                    "retina_detect": true
                });
            });
        }, 400);
    }
    function pxl_split_text($scope) {
        var st = $scope.find(".pxl-split-text");
        if (st.length == 0) return;
        gsap.registerPlugin(SplitText);
        st.each(function (index, el) {
            el.split = new SplitText(el, {
                type: "lines,words,chars",
                linesClass: "split-line"
            });
            gsap.set(el, { perspective: 400 });

            if ($(el).hasClass('split-in-fade')) {
                gsap.set(el.split.chars, {
                    opacity: 0,
                    ease: "Back.easeOut",
                });
            }
            if ($(el).hasClass('split-in-right')) {
                gsap.set(el.split.chars, {
                    opacity: 0,
                    x: "50",
                    ease: "Back.easeOut",
                });
            }
            if ($(el).hasClass('split-in-left')) {
                gsap.set(el.split.chars, {
                    opacity: 0,
                    x: "-50",
                    ease: "circ.out",
                });
            }
            if ($(el).hasClass('split-in-up')) {
                gsap.set(el.split.chars, {
                    opacity: 0,
                    y: "80",
                    ease: "circ.out",
                });
            }
            if ($(el).hasClass('split-in-down')) {
                gsap.set(el.split.chars, {
                    opacity: 0,
                    y: "-80",
                    ease: "circ.out",
                });
            }
            if ($(el).hasClass('split-in-rotate')) {
                gsap.set(el.split.chars, {
                    opacity: 0,
                    rotateX: "50deg",
                    ease: "circ.out",
                });
            }
            if ($(el).hasClass('split-in-scale')) {
                gsap.set(el.split.chars, {
                    opacity: 0,
                    scale: "0.5",
                    ease: "circ.out",
                });
            }
            el.anim = gsap.to(el.split.chars, {
                scrollTrigger: {
                    trigger: el,
                    toggleActions: "play reverse play reverse",
                    start: "top 80%",
                },
                x: "0",
                y: "0",
                rotateX: "0",
                scale: 1,
                opacity: 1,
                duration: 0.8,
                stagger: 0.02,
            });
        });
    }
    function pxl_custom_effect() {
        if ($(document).find('.pxl-overlap-in-left').length > 0) {
            $('.pxl-overlap-in-left').each(function (index, el) {
                var $this = $(this);
                gsap.set($this[0], {
                    xPercent: -100,
                    duration: 2,
                    ease: "none",
                    stagger: 0.3,
                });
                var pxl_anim = gsap.to($this[0], {
                    scrollTrigger: {
                        trigger: $this[0],
                        toggleActions: "restart pause resume reverse",
                        start: "top 70%",
                    },
                    xPercent: 0,
                });
            });

        }
        if ($(document).find('.pxl-overlap-in-right').length > 0) {
            $('.pxl-overlap-in-right').each(function (index, el) {
                var $this = $(this);
                gsap.set($this[0], {
                    xPercent: 100,
                    duration: 2,
                    ease: "Linear.easeNone",
                    stagger: 0.3,
                });
                var pxl_anim = gsap.to($this[0], {
                    scrollTrigger: {
                        trigger: $this[0],
                        toggleActions: "restart pause resume reverse",
                        start: "top 70%",
                    },
                    xPercent: 0,
                });
            });
        }

    }
    function pxl_parallax_bg() {
        $(document).find('.pxl-parallax-background').parallaxBackground({
            event: 'mouse_move',
            animation_type: 'shift',
            animate_duration: 2
        });
        $(document).find('.pxl-pll-basic').parallaxBackground();
        $(document).find('.pxl-pll-rotate').parallaxBackground({
            animation_type: 'rotate',
            zoom: 50,
            rotate_perspective: 500
        });
        $(document).find('.pxl-pll-mouse-move').parallaxBackground({
            event: 'mouse_move',
            animation_type: 'shift',
            animate_duration: 2
        });
        $(document).find('.pxl-pll-mouse-move-rotate').parallaxBackground({
            event: 'mouse_move',
            animation_type: 'rotate',
            animate_duration: 1,
            zoom: 70,
            rotate_perspective: 1000
        });
    }

    // Make sure you run this code under Elementor.
    $(window).on('elementor/frontend/init', function () {
        elementorFrontend.hooks.addAction('frontend/element_ready/global', Pxl_Global_Animation_Handler);
        pxlMouseDirection();
        pxlParticles();
        pxl_parallax_bg();
        pxl_custom_effect();
        elementorFrontend.hooks.addAction('frontend/element_ready/pxl_heading.default', function ($scope) {
            pxl_split_text($scope);
        });
    });
})(jQuery);