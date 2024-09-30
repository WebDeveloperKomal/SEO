; (function ($) {
    "use strict";
    var scroll_top;
    var window_height;
    var window_width;
    var scroll_status = '';
    var lastScrollTop = 0;
    $(document).ready(function () {
        setTimeout(function () {
            $('.tilt-hover').each(function () {
                $(this).tilt({
                    easing: "cubic-bezier(.03,.98,.52,.99)",
                    perspective: 1200,
                    speed: 600,
                })
            });
        }, 500);
        //* Main Theme Functions
        salepush_header_sticky();
        salepush_open_menu_toggle();
        salepush_panel_mobile_menu();
        salepush_cart_toggle();
        salepush_panel_anchor_toggle();
        salepush_sidebar_tabs_toggle();
        salepush_document_click();
        salepush_scroll_to_top();
        salepush_footer_fixed();
        salepush_magnific_popup();

        //* For Element
        salepush_element_parallax();
        salepush_fancyBoxAccordion();
        salepush_svgDrawing();

        //* For Shop
        salepush_shop_view_layout();
        salepush_wc_single_product_gallery();
        salepush_quantity_plus_minus();
        salepush_quantity_plus_minus_action();
        salepush_table_cart_content();
        salepush_table_move_column('.woocommerce-cart-form__contents', '.woocommerce-cart-form__cart-item', 0, 5, '', '.product-subtotal', '');
    });
    $(window).on('load', function () {
        setTimeout(function () {
            $('#pxl-loadding.default').addClass('preloaded');
        }, 800);
        $("#pxl-loadding.content-image").fadeOut("slow");
        setTimeout(function () {
            $('#pxl-loadding').remove();
        }, 3000);
    });
    $(window).on('scroll', function () {
        scroll_top = $(window).scrollTop();
        window_height = $(window).height();
        window_width = $(window).width();
        if (scroll_top < lastScrollTop) {
            scroll_status = 'up';
        } else {
            scroll_status = 'down';
        }
        lastScrollTop = scroll_top;
        salepush_header_sticky();
        salepush_scroll_to_top();
    });
    jQuery(document).on('updated_wc_div', function () {
        salepush_quantity_plus_minus();
        salepush_table_cart_content();
        salepush_table_move_column('.woocommerce-cart-form__contents', '.woocommerce-cart-form__cart-item', 0, 5, '', '.product-subtotal', '');
    });

    function salepush_header_sticky() {
        'use strict';
        if ($(document).find('.pxl-header-sticky').length > 0 && window_width >= 1200) {
            var header_height = $('.pxl-header-desktop').outerHeight();

            var offset_top_animation = header_height + 150;

            if (scroll_top > offset_top_animation) {
                $(document).find('.pxl-header-sticky').addClass('h-fixed');
            } else {
                $(document).find('.pxl-header-sticky').removeClass('h-fixed');
            }
        }
        if ($(document).find('.pxl-header-main-sticky').length > 0 && window_width >= 1200) {
            var header_height = $('.pxl-header-desktop').outerHeight();

            if (scroll_top > header_height) {
                $(document).find('.pxl-header-main-sticky').addClass('h-fixed');
            } else {
                $(document).find('.pxl-header-main-sticky').removeClass('h-fixed');
            }
        }
        if ($(document).find('.pxl-header-mobile-sticky').length > 0 && window_width < 1200) {
            var offset_top = $('.pxl-header-mobile-sticky').outerHeight();
            var body_padding = offset_top + 'px';
            if (scroll_top > offset_top) {
                $(document).find('.pxl-header-mobile-sticky').addClass('mh-fixed');
                $('body').css('padding-top', body_padding);
            } else {
                $(document).find('.pxl-header-mobile-sticky').removeClass('mh-fixed');
                $('body').css('padding-top', "");
            }
        }
        if ($(document).find('.pxl-header-mobile-main-sticky').length > 0 && window_width < 1200) {
            var offset_top = $('.pxl-header-mobile-main-sticky').outerHeight();
            var body_padding = offset_top + 'px';
            if (scroll_top > offset_top + 100) {
                $(document).find('.pxl-header-mobile-main-sticky').addClass('mh-fixed');
                $('body').css('padding-top', body_padding);
            } else {
                $(document).find('.pxl-header-mobile-main-sticky').removeClass('mh-fixed');
                $('body').css('padding-top', "");
            }
        }

    }
    function salepush_open_menu_toggle() {
        'use strict';
        //* Add toggle button to parent Menu
        $('.sub-menu .current-menu-item').parents('.menu-item-has-children').addClass('current-menu-ancestor');
        $('.is-arrow .pxl-primary-menu > li.menu-item-has-children').append('<span class="main-menu-toggle"></span>');
        $('.pxl-mobile-menu li.menu-item-has-children').append('<span class="main-menu-toggle"></span>');
        $('.main-menu-toggle').on('click', function () {
            $(this).toggleClass('open');
            $(this).parent().find('> .sub-menu').toggleClass('submenu-open');
            $(this).parent().find('> .sub-menu').slideToggle();
        });

        //* Menu Dropdown
        var $menu = $('.pxl-main-navigation');
        $menu.find('.pxl-primary-menu li').each(function () {
            var $submenu = $(this).find('> ul.sub-menu');
            if ($submenu.length == 1) {
                $(this).hover(function () {
                    if ($submenu.offset().left + $submenu.width() > $(window).width()) {
                        $submenu.addClass('back');
                    } else if ($submenu.offset().left < 0) {
                        $submenu.addClass('back');
                    }
                }, function () {
                    $submenu.removeClass('back');
                });
            }
        });
    }
    function salepush_panel_mobile_menu() {
        'use strict';
        $(document).on('click', '.btn-nav-mobile', function (e) {
            e.preventDefault();
            e.stopPropagation();
            var target = $(this).attr('data-target');
            $(this).toggleClass('cliked');
            $(target).toggleClass('open');
            $('body').toggleClass('side-panel-open');
        });
    }
    function salepush_panel_anchor_toggle() {
        'use strict';
        $(document).on('click', '.pxl-anchor.side-panel', function (e) {
            e.preventDefault();
            e.stopPropagation();
            var target = $(this).attr('data-target');
            $(this).toggleClass('cliked');
            $(target).toggleClass('open');
            $('body').toggleClass('side-panel-open');
            setTimeout(function () {
                $('.pxl-search-form input[name="s"]').focus();
            }, 1000);
        });
    }
    function salepush_sidebar_tabs_toggle() {
        'use strict';
        $(".anchor-inner-item").first().addClass('active');
        $(document).on('click', '.pxl-sidebar-tabs .anchor-link-item', function (e) {
            e.preventDefault();
            e.stopPropagation();
            var target = $(this).attr('data-target');
            $(target).addClass('active').siblings().removeClass('active');
        });
    }
    function salepush_cart_toggle() {
        'use strict';
        $(document).on('click', '.pxl-cart.side-panel', function (e) {
            e.preventDefault();
            e.stopPropagation();
            var target = $(this).attr('data-target');
            $(this).toggleClass('cliked');
            $(target).toggleClass('open');
            $('body').toggleClass('side-panel-open');
            setTimeout(function () {
                $('.pxl-search-form input[name="s"]').focus();
            }, 1000);
        });
    }

    function salepush_document_click() {
        $(document).on('click', function (e) {
            var target = $(e.target);
            var check = '.btn-nav-mobile';

            if (!(target.is(check)) && target.closest('.pxl-hidden-template').length <= 0 && $('body').hasClass('side-panel-open')) {
                $('.btn-nav-mobile').removeClass('cliked');
                $('.pxl-hidden-template').removeClass('open');
                $('body').removeClass('side-panel-open');
            }
        });
        $(document).on('click', '.pxl-close', function (e) {
            e.preventDefault();
            e.stopPropagation();
            $(this).closest('.pxl-hidden-template').toggleClass('open');
            $('.btn-nav-mobile').removeClass('cliked');
            $('body').toggleClass('side-panel-open');
        });
    }

    //* Scroll To Top
    function salepush_scroll_to_top() {
        if (scroll_top < window_height) {
            $('.pxl-scroll-top').addClass('off').removeClass('on');
        }
        if (scroll_top > window_height) {
            $('.pxl-scroll-top').addClass('on').removeClass('off');
        }
        $('.pxl-scroll-top').click(function (e) {
            e.preventDefault();
            e.stopPropagation();
            $('html, body').stop().animate({ scrollTop: 0 }, 800);
        });
    }

    //* Footer Fixed
    function salepush_footer_fixed() {
        setTimeout(function () {
            var h_footer = $('.pxl-footer-fixed .footer-type-el').outerHeight() - 1;
            $('.pxl-footer-fixed #pxl-main').css('margin-bottom', h_footer + 'px');
        }, 600);
    }

    //* Video Popup
    function salepush_magnific_popup() {
        $('a.video-play-button').magnificPopup({
            type: 'iframe',
            mainClass: 'mfp-fade',
            removalDelay: 160,
            preloader: false,
            fixedContentPos: false
        });
        /* Images Light Box - Gallery:True */
        $('.images-light-box').each(function () {
            $(this).magnificPopup({
                delegate: 'a.light-box',
                type: 'image',
                gallery: {
                    enabled: true
                },
                mainClass: 'mfp-fade',
            });
        });
    }
    // Element Parallax
    function salepush_element_parallax() {
        let delSections = document.querySelectorAll(".pxl-element-parallax");
        delSections.forEach(section => {
            var el_data = section.getAttribute('data-parallax');
            var el_data_obj = JSON.parse(el_data);
            let imageAnim = gsap.to(section.querySelector("img"), {
                x: el_data_obj.x,
                y: el_data_obj.y,
                ease: "none",
                paused: true
            });
            let progressTo = gsap.quickTo(imageAnim, "progress", { ease: "ease-out", duration: parseFloat(section.dataset.scrub) || 0.2 });

            gsap.to(section.querySelector(".elementor-widget-container"), {
                x: "0",
                y: "0",
                ease: "none",
                scrollTrigger: {
                    scrub: true,
                    trigger: section,
                    onUpdate: self => progressTo(self.progress)
                }
            });
        });
    }
    // FancyBox Accordion
    function salepush_fancyBoxAccordion() {
        var widgetList = jQuery('.pxl-fancy-box-accordion');
        if (!widgetList.length) {
            return;
        }
        widgetList.each(function () {
            var itemClass = '.box-item';
            jQuery(this)
                .find(itemClass + ':first-child')
                .addClass('active');
            jQuery(this)
                .find(itemClass)
                .on('mouseover', function () {
                    jQuery(this).addClass('active').siblings().removeClass('active');
                });
        });
    }

    // Svg Drawing
    function salepush_svgDrawing() {
        $(".svg-drawing").each(function () {
            var $selector = jQuery(this);
            $(window).scroll(function () {
                var hT = $selector.offset().top,
                    wH = $(window).height(),
                    wS = $(this).scrollTop();
                if (wS > (hT - wH)) {
                    $selector.addClass('dr-start');
                }
            });

        });
    }

    function salepush_shop_view_layout() {

        $(document).on('click', '.pxl-view-layout .view-icon a', function (e) {
            e.preventDefault();
            if (!$(this).parent('li').hasClass('active')) {
                $('.pxl-view-layout .view-icon').removeClass('active');
                $(this).parent('li').addClass('active');
                $(this).parents('.pxl-content-area').find('.products').removeAttr('class').addClass($(this).attr('data-cls'));
            }
        });
    }

    function salepush_wc_single_product_gallery() {
        'use strict';
        if (typeof $.flexslider != 'undefined') {
            $('.wc-gallery-sync').each(function () {
                var itemW = parseInt($(this).attr('data-thumb-w')),
                    itemH = parseInt($(this).attr('data-thumb-h')),
                    itemN = parseInt($(this).attr('data-thumb-n')),
                    itemMargin = parseInt($(this).attr('data-thumb-margin')),
                    window_w = $(window).outerWidth(),
                    itemSpace = itemH - itemW + itemMargin;
                var gallery_layout = window_w > 575 ? 'vertical' : 'horizontal';

                if ($(this).hasClass('thumbnail-vertical')) {
                    $(this).flexslider({
                        selector: '.wc-gallery-sync-slides > .wc-gallery-sync-slide',
                        animation: 'slide',
                        controlNav: false,
                        directionNav: true,
                        prevText: '<span class="flex-prev-icon"></span>',
                        nextText: '<span class="flex-next-icon"></span>',
                        asNavFor: '.woocommerce-product-gallery',
                        direction: gallery_layout,
                        slideshow: false,
                        animationLoop: false,
                        itemWidth: itemW, // add thumb image height
                        itemMargin: itemSpace, // need it to fix transform item
                        move: 1,
                        start: function (slider) {
                            var asNavFor = slider.vars.asNavFor,
                                height = $(asNavFor).height(),
                                height_thumb = $(asNavFor).find('.flex-viewport').height();
                            if (window_w > 575) {
                                slider.css({ 'max-height': height_thumb, 'overflow': 'hidden' });
                                slider.find('> .flex-viewport > *').css({ 'height': height, 'width': '' });
                            }
                        }
                    });
                }
                if ($(this).hasClass('thumbnail-horizontal')) {
                    $(this).flexslider({
                        selector: '.wc-gallery-sync-slides > .wc-gallery-sync-slide',
                        animation: 'slide',
                        controlNav: false,
                        directionNav: true,
                        prevText: '<span class="flex-prev-icon"></span>',
                        nextText: '<span class="flex-next-icon"></span>',
                        asNavFor: '.woocommerce-product-gallery',
                        slideshow: false,
                        animationLoop: false, // Breaks photoswipe pagination if true.
                        itemWidth: itemW,
                        itemMargin: itemMargin,
                        start: function (slider) {

                        }
                    });
                };
            });
        }
    }

    function salepush_quantity_plus_minus() {
        "use strict";
        $(".quantity input").wrap("<div class='pxl-quantity'></div>");
        $('<span class="quantity-button quantity-down"></span>').insertBefore('.quantity input');
        $('<span class="quantity-button quantity-up"></span>').insertAfter('.quantity input');
        // contact form 7 input number
        $('<span class="pxl-input-number-spin"><span class="pxl-input-number-spin-inner pxl-input-number-spin-up"></span><span class="pxl-input-number-spin-inner pxl-input-number-spin-down"></span></span>').insertAfter('.wpcf7-form-control-wrap input[type="number"]');
    }
    function salepush_ajax_quantity_plus_minus() {
        "use strict";
        $('<span class="quantity-button quantity-down"></span>').insertBefore('.quantity input');
        $('<span class="quantity-button quantity-up"></span>').insertAfter('.quantity input');
    }
    function salepush_quantity_plus_minus_action() {
        "use strict";
        $(document).on('click', '.quantity .quantity-button', function () {
            var $this = $(this),
                spinner = $this.closest('.quantity'),
                input = spinner.find('input[type="number"]'),
                step = input.attr('step'),
                min = input.attr('min'),
                max = input.attr('max'), value = parseInt(input.val());
            if (!value) value = 0;
            if (!step) step = 1;
            step = parseInt(step);
            if (!min) min = 0;
            var type = $this.hasClass('quantity-up') ? 'up' : 'down';
            switch (type) {
                case 'up':
                    if (!(max && value >= max))
                        input.val(value + step).change();
                    break;
                case 'down':
                    if (value > min)
                        input.val(value - step).change();
                    break;
            }
            if (max && (parseInt(input.val()) > max))
                input.val(max).change();
            if (parseInt(input.val()) < min)
                input.val(min).change();
        });
        $(document).on('click', '.pxl-input-number-spin-inner', function () {
            var $this = $(this),
                spinner = $this.parents('.wpcf7-form-control-wrap'),
                input = spinner.find('input[type="number"]'),
                step = input.attr('step'),
                min = input.attr('min'),
                max = input.attr('max'), value = parseInt(input.val());
            if (!value) value = 0;
            if (!step) step = 1;
            step = parseInt(step);
            if (!min) min = 0;
            var type = $this.hasClass('pxl-input-number-spin-up') ? 'up' : 'down';
            switch (type) {
                case 'up':
                    if (!(max && value >= max))
                        input.val(value + step).change();
                    break;
                case 'down':
                    if (value > min)
                        input.val(value - step).change();
                    break;
            }
            if (max && (parseInt(input.val()) > max))
                input.val(max).change();
            if (parseInt(input.val()) < min)
                input.val(min).change();
        });
    }
    function salepush_table_cart_content() {
        "use strict";
        var table = jQuery('.woocommerce-cart-form__contents'),
            table_head = table.find('thead');
        table_head.find('.product-remove').remove();
        table_head.find('.product-thumbnail').remove();
        table_head.find('.product-name').attr('colspan', 2);
        table_head.find('tr').append('<th class="product-remove">&nbsp;</th>');
    }

    function salepush_table_move_column(table, selected, from, to, remove, colspan, colspan_value) {
        "use strict";
        var rows = jQuery(selected, table);
        var cols;
        rows.each(function () {
            cols = jQuery(this).children('th, td');
            cols.eq(from).detach().insertAfter(cols.eq(to));
        });
        var rows_remove = jQuery(remove, table);
        rows_remove.each(function () {
            jQuery(this).remove(remove);
        });
        var colspan = jQuery(colspan, table);
        colspan.each(function () {
            jQuery(this).attr('colspan', colspan_value);
        });
    }
})(jQuery);