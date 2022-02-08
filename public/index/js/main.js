(function($) {
    
    /*Active and Inactive for Profile Page START*/

    $('.profile-menu .profile-menu-link').on('click', (function() {
        $('.profile-menu-link').removeClass("active");
        $(this).addClass("active");

        if ($(this).hasClass('active-list')) {
            $('.tab-pane').removeClass("active");
            $('.tab-pane').removeClass("show");
            $('#active-list').addClass("active");
            $('#active-list').addClass("show");
            window.location.hash = 'active-list';

        }
        if ($(this).hasClass('pending-list')) {
            $('.tab-pane').removeClass("active");
            $('.tab-pane').removeClass("show");
            $('#pending-list').addClass("active");
            $('#pending-list').addClass("show");
            window.location.hash = 'pending-list';

        }
        if ($(this).hasClass('expired-list')) {
            $('.tab-pane').removeClass("active");
            $('.tab-pane').removeClass("show");
            $('#expired-list').addClass("active");
            $('#expired-list').addClass("show");
            window.location.hash = 'expired-list';
        }

        if ($(this).hasClass('projects-list')) {
            $('.tab-pane').removeClass("active");
            $('.tab-pane').removeClass("show");
            $('#projects-list').addClass("active");
            $('#projects-list').addClass("show");
            window.location.hash = 'projects-list';
        }

        if ($(this).hasClass('favourite-list')) {
            $('.tab-pane').removeClass("active");
            $('.tab-pane').removeClass("show");
            $('#favourite-list').addClass("active");
            $('#favourite-list').addClass("show");
            window.location.hash = 'favourite-list';
        }

    }));
    /*Active and Inactive for Profile Page END*/

    /*Change Active and Refresh on Sidebar Click Profile START*/
    if (window.location.hash == '#active-list') {

        $(document).ready(function() {
            $('.profile-menu-link').removeClass("active");
            $('.active-list').addClass("active");
            $('.tab-pane').removeClass("active");
            $('.tab-pane').removeClass("show");
            $('#active-list').addClass("active");
            $('#active-list').addClass("show");
        });
    }

    $('.active-list-btn').click(function() {
        window.location.hash = 'active-list';
        window.location.reload();
    });

    if (window.location.hash == '#pending-list') {

        $(document).ready(function() {
            $('.profile-menu-link').removeClass("active");
            $('.pending-list').addClass("active");
            $('.tab-pane').removeClass("active");
            $('.tab-pane').removeClass("show");
            $('#pending-list').addClass("active");
            $('#pending-list').addClass("show");
        });
    }

    $('.pending-list-btn').click(function() {
        window.location.hash = 'pending-list';
        window.location.reload();
    });


    if (window.location.hash == '#expired-list') {

        $(document).ready(function() {
            $('.profile-menu-link').removeClass("active");
            $('.expired-list').addClass("active");
            $('.tab-pane').removeClass("active");
            $('.tab-pane').removeClass("show");
            $('#expired-list').addClass("active");
            $('#expired-list').addClass("show");
        });
    }

    $('.expired-list-btn').click(function() {
        window.location.hash = 'expired-list';
        window.location.reload();
    });


    if (window.location.hash == '#projects-list') {

        $(document).ready(function() {
            $('.profile-menu-link').removeClass("active");
            $('.projects-list').addClass("active");
            $('.tab-pane').removeClass("active");
            $('.tab-pane').removeClass("show");
            $('#projects-list').addClass("active");
            $('#projects-list').addClass("show");
        });
    }

    $('.projects-list-btn').click(function() {
        window.location.hash = 'projects-list';
        window.location.reload();
    });


    if (window.location.hash == '#favourite-list') {

        $(document).ready(function() {
            $('.profile-menu-link').removeClass("active");
            $('.favourite-list').addClass("active");
            $('.tab-pane').removeClass("active");
            $('.tab-pane').removeClass("show");
            $('#favourite-list').addClass("active");
            $('#favourite-list').addClass("show");
        });
    }

    $('.favourite-list-btn').click(function() {
        window.location.hash = 'favourite-list';
        window.location.reload();
    });
    /*Change Active and Refresh on Sidebar Click Profile END*/


    /*Login Page Refresh and Change active on Register Click START*/
    if (window.location.hash == '#register') {

        $(document).ready(function() {
            $('.login-link').removeClass('active');
            $('.login-pane').removeClass('show');
            $('.login-pane').removeClass('active');
            $('.register-link').addClass('active');
            $('.register-pane').addClass('show');
            $('.register-pane').addClass('active');
        });
    }

    $('.signup-a').click(function() {
        window.location.hash = 'register';
        window.location.reload();
    });
    /*Login Page Refresh and Change active on Register Click END*/

    // USE STRICT
    "use strict";

    // Scroll Bar
    try {
        var jscr1 = $('.js-scrollbar1');
        if (jscr1[0]) {
            const ps1 = new PerfectScrollbar('.js-scrollbar1');
        }

        var jscr2 = $('.js-scrollbar2');
        if (jscr2[0]) {
            const ps2 = new PerfectScrollbar('.js-scrollbar2');

        }

    } catch (error) {
        console.log(error);
    }

    // Dropdown 
    try {
        var menu = $('.js-item-menu');
        var sub_menu_is_showed = -1;

        for (var i = 0; i < menu.length; i++) {
            $(menu[i]).on('click', function(e) {
                e.preventDefault();
                $('.js-right-sidebar').removeClass("show-sidebar");
                if (jQuery.inArray(this, menu) == sub_menu_is_showed) {
                    $(this).toggleClass('show-dropdown');
                    sub_menu_is_showed = -1;
                } else {
                    for (var i = 0; i < menu.length; i++) {
                        $(menu[i]).removeClass("show-dropdown");
                    }
                    $(this).toggleClass('show-dropdown');
                    sub_menu_is_showed = jQuery.inArray(this, menu);
                }
            });
        }
        $(".js-item-menu, .js-dropdown").click(function(event) {
            event.stopPropagation();
        });

        $("body,html").on("click", function() {
            for (var i = 0; i < menu.length; i++) {
                menu[i].classList.remove("show-dropdown");
            }
            sub_menu_is_showed = -1;
        });

    } catch (error) {
        console.log(error);
    }
    //tooltip
    $(function() {
        $('[data-toggle="tooltip"]').tooltip()
    })


    var wW = $(window).width();
    // Right Sidebar
    var right_sidebar = $('.js-right-sidebar');
    var sidebar_btn = $('.js-sidebar-btn');

    sidebar_btn.on('click', function(e) {
        e.preventDefault();
        for (var i = 0; i < menu.length; i++) {
            menu[i].classList.remove("show-dropdown");
        }
        sub_menu_is_showed = -1;
        right_sidebar.toggleClass("show-sidebar");
    });

    $(".js-right-sidebar, .js-sidebar-btn").click(function(event) {
        event.stopPropagation();
    });

    $("body,html").on("click", function() {
        right_sidebar.removeClass("show-sidebar");

    });


    // Sublist Sidebar
    try {
        var arrow = $('.js-arrow');
        arrow.each(function() {
            var that = $(this);
            that.on('click', function(e) {
                e.preventDefault();
                that.find(".arrow").toggleClass("up");
                that.toggleClass("open");
                that.parent().find('.js-sub-list').slideToggle("250");
            });
        });

    } catch (error) {
        console.log(error);
    }




    /*----------------------------------------
            Premium Color Adding
    ------------------------------------------*/


    if ($(".trending-place-item").is(".premium")) {
        $(".premium").css("border-left", "4px solid #e52628");
        $(".premium").css("border-top-left", "0");
        $(".premium").css("border-bottom-left", "0");
    }
    if ($(".search-place-item").is(".premium")) {
        $(".premium").css("border-left", "4px solid #e52628");
    }
    if ($(".search-place-item").is(".featured")) {
        $(".featured").css("border", "4px solid #f8dd3c");
    }

    $('.trusted-user i').hover(function() {
        $('.trusted-popup').fadeToggle();

    });


    /*----------------------------------------
            Card Resizer to Match all heights
    ------------------------------------------*/


    $(window).resize(function() {
        function fixSwiper() {
            $('.trending-img').css({ minHeight: $('.trending-img img').height() });
        }
        fixSwiper();
    });

    /*----------------------------------------
            Water Mark
    ------------------------------------------*/

    $(function() {

        $('.wm').watermark({
            path: 'images/logo-black.png',
            outputWidth: 800,
            opacity: 0.5,
            gravity: 'c'
        });
    })




    /*----------------------------------------
              Tab Active Class Adder
    ------------------------------------------*/

    $(".listing-purpose .lp-inner").click(function() {
        $(".lp-inner").removeClass("active");
        $(this).addClass("active");

    });


    /*----------------------------------------
                        Preloader
    ------------------------------------------*/
    $('.js-preloader').preloadinator({
        minTime: 2000,
        scroll: false

    });
    /* ----------------------------------------
           datepicker
    ------------------------------------------- */
    $("#datepicker-from").datepicker({
        autoclose: true,
        todayHighlight: true
    });
    $("#datepicker-to").datepicker({
        autoclose: true,
        todayHighlight: true
    });

    /*----------------------------------------
          Scroll to top
  ----------------------------------------*/
    function BackToTop() {

        $('.scrolltotop').on('click', function() {
            $('html, body').animate({
                scrollTop: 0
            }, 800);
            return false;
        });

        $(document).scroll(function() {
            var y = $(this).scrollTop();
            if (y > 600) {
                $('.scrolltotop').fadeIn();
            } else {
                $('.scrolltotop').fadeOut();
            }
        });

    }
    BackToTop();

    /*-------------------------------------------------*/
    /*    scroll between sections
    /*-------------------------------------------------*/

    // Add scrollspy to <body>
    $('body').scrollspy({
        target: ".list_menu",
        offset: 50
    });

    // Add smooth scrolling on all links inside the navbar
    $("#list-menu a").on('click', function(event) {
        if (this.hash !== "") {
            event.preventDefault();

            var hash = this.hash;


            $('html, body').animate({
                scrollTop: $(hash).offset().top
            }, 800, function() {

                // Add hash (#) to URL when done scrolling (default click behavior)
                window.location.hash = hash;
            });
        } // End if
    });

    $('.list-details-tab li').on('click', (function() {
        $('li').removeClass("active");
        $(this).addClass("active");
    }));


    /* ----------------------------------------
          Hide Show Header on Scroll
    ------------------------------------------ */
    function HideShowHeader() {

        var didScroll;
        var lastScrollTop = 0;
        var delta = 50;
        var navbarHeight = 75;
        var navbarHideAfter = navbarHeight

        $(window).scroll(function(event) {
            didScroll = true;
        });

        if ($('.scroll-hide').length > 0) {

            setInterval(function() {
                if (didScroll) {
                    hasScrolled();
                    didScroll = false;
                }
            }, 100);
        }
        return false;

        function hasScrolled() {
            var st = $(this).scrollTop();

            if (Math.abs(lastScrollTop - st) <= delta)
                return;

            if (st > lastScrollTop && st > navbarHideAfter) {
                if ($('.scroll-hide').length > 0) {
                    $('header').addClass('hide');
                }
            } else {
                if ($('.scroll-hide').length > 0) {
                    if (st + $(window).height() < $(document).height()) {
                        $('header').removeClass('hide');
                        $('.header.transparent').addClass('scroll');
                    }
                }

                if ($(window).scrollTop() < 300) {
                    $('.header.transparent').removeClass('scroll');
                }
            }

            lastScrollTop = st;
        }
    }
    HideShowHeader();

    /*------------------------------------------
          sticky single listing menu
    -------------------------------------------*/
    $(window).on('load resize', function() {
        var containerWidth = $(".container").width();
        $('.fixed_nav').css('width', containerWidth);
    });
    $(window).scroll(function() {
        if ($(window).scrollTop() >= 700) {
            $('.list_menu').addClass('fixed-header');
        } else {
            $('.list_menu').removeClass('fixed-header');
        }
    });
    /* ----------------------------------------
           CounteUp
    ------------------------------------------*/
    $('.counter-value').countUp({
        'time': 2500,
        'delay': 10
    });
    /*-------------------------------------------
            Count Down Timer
    ---------------------------------------------*/
    $('[data-countdown]').each(function() {
        var $this = $(this),
            finalDate = $(this).data('countdown');
        $this.countdown(finalDate, function(event) {
            $this.html(event.strftime('<span class="cdown day"><span class="time-count">%-D</span> <p>Days</p></span> <span class="cdown hour"><span class="time-count">%-H</span> <p>Hours</p></span> <span class="cdown minutes"><span class="time-count">%M</span> <p>mins</p></span> <span class="cdown second"><span class="time-count">%S</span> <p>secs</p></span>'));
        });
    });

    /*--------------------------------------------
                       Video Player
     --------------------------------------------*/
    $(".player").mb_YTPlayer({
        containment: '#video-wrapper',
        mute: true,
        autoplay: true,
        showControls: false,
        quality: 'hd720'
    });



    jQuery(document).ready(function($) {
        "use strict";

        /*------------------------------------
                Color Switcher
        --------------------------------------*/

        // Show and hide color-switcher
        $(".color-switcher .switcher-button").on('click', function() {
            $(".color-switcher").toggleClass("show-color-switcher", "hide-color-switcher", 300);
        });

        // Color Skins
        $('a.color').on('click', function() {
            var title = $(this).attr('title');
            $('#style-colors').attr('href', 'css/switcher/skin-' + title + '.css');
            return false;
        });
        /* -------------------------------------
              Footer Accordion
        -------------------------------------- */
        $(".nav-folderized h2").on('click', (function() {
            $(this).parent(".nav").toggleClass("open");
            $('html, body').animate({
                scrollTop: $(this).offset().top - 170
            }, 1500);
        }));
        /* -------------------------------------
                Header tab
        -------------------------------------- */
        var listButton = $('.hero__list-item a');

        listButton.on('click', function(event) {
            event.preventDefault();

            listButton.removeClass('active-list');
            $(this).addClass('active-list');

            var $this = $(this);

            if ($this.hasClass('buy')) {
                $this.parents('.hero')
                    .find('h1')
                    .fadeOut(500).promise().done(function() {
                        $this.parents('.hero')
                            .find('.buy-tab')
                            .fadeIn(500);
                    });
            } else if ($this.hasClass('rent')) {
                $this.parents('.hero')
                    .find('h1')
                    .fadeOut(500).promise().done(function() {
                        $this.parents('.hero')
                            .find('.rent-tab')
                            .fadeIn(500);
                    });
            } else if ($this.hasClass('wanted')) {
                $this.parents('.hero')
                    .find('h1')
                    .fadeOut(500).promise().done(function() {
                        $this.parents('.hero')
                            .find('.wanted-tab')
                            .fadeIn(500);
                    });
            } else if ($this.hasClass('projects')) {
                $this.parents('.hero')
                    .find('h1')
                    .fadeOut(500).promise().done(function() {
                        $this.parents('.hero')
                            .find('.projects-tab')
                            .fadeIn(500);
                    });
            }

        });

        /* -------------------------------------
                Responsive menu
        -------------------------------------- */
        var siteMenuClone = function() {

            $('.js-clone-nav').each(function() {
                var $this = $(this);
                $this.clone().attr('class', 'site-nav-wrap').appendTo('.site-mobile-menu-body');
            });

            setTimeout(function() {

                var counter = 0;
                $('.site-mobile-menu .has-children').each(function() {
                    var $this = $(this);

                    $this.prepend('<span class="arrow-collapse collapsed">');

                    $this.find('.arrow-collapse').attr({
                        'data-toggle': 'collapse',
                        'data-target': '#collapseItem' + counter,
                    });

                    $this.find('> ul').attr({
                        'class': 'collapse',
                        'id': 'collapseItem' + counter,
                    });

                    counter++;

                });

            }, 1000);

            $('body').on('click', '.js-menu-toggle', function(e) {
                var $this = $(this);
                e.preventDefault();

                if ($('body').hasClass('offcanvas-menu')) {
                    $('body').removeClass('offcanvas-menu');
                    $this.removeClass('active');
                } else {
                    $('body').addClass('offcanvas-menu');
                    $this.addClass('active');
                }
            })

        };
        siteMenuClone();

        /*-------------------------------------------------
                    rating stars in reviews 
        /*-------------------------------------------------*/

        var rateLine = $('.contact-form__rate-bx'),
            rateActual = $('.rate-actual');

        rateLine.find('i').on('hover', function() {
            var indexStar = $(this).index();
            for (var j = 0; j <= 9; j++) {
                rateLine.find('i:lt(' + indexStar + 1 + ')').addClass('active');
                rateLine.find('i:gt(' + indexStar + ')').removeClass('active');
            }
        });

        rateLine.find('i').on('click', function() {
            var indexStar = $(this).index();
            for (var j = 0; j <= 9; j++) {
                rateLine.find('i:lt(' + indexStar + 1 + ')').addClass('selected');
                rateLine.find('i:gt(' + indexStar + ')').removeClass('selected');
            }
            rateActual.text(indexStar + 1);
        });

        rateLine.on('mouseout', function() {
            rateLine.find('i').removeClass('active');
        });

        /* -------------------------------------
                price range slider
        -------------------------------------- */

        $("#slider-range").slider({
            range: true,
            min: 0,
            max: 200,
            values: [0, 70],
            slide: function(event, ui) {
                $("#amount").val(ui.values[0] + "-" + ui.values[1] + " km");
            }
        });
        $(" #amount").val($("#slider-range").slider("values", 0) +
            " - " + $("#slider-range").slider("values", 1) + " km");
        /* -------------------------------------
                 Category menu Activation
        -------------------------------------- */
        $('.filter-sub-menu li.has-sub > a').on('click', function() {
            $(this).removeAttr('href');
            var element = $(this).parent('li');
            if (element.hasClass('open')) {
                element.removeClass('open');
                element.find('li').removeClass('open');
                element.find('ul').slideUp();
            } else {
                element.addClass('open');
                element.children('ul').slideDown();
                element.siblings('li').children('ul').slideUp();
                element.siblings('li').removeClass('open');
                element.siblings('li').find('li').removeClass('open');
                element.siblings('li').find('ul').slideUp();
            }
        });

        /* -------------------------------------
                   Slider
        -------------------------------------- */
        //Hero-slider
        var swiper_1 = new Swiper('.hero-slider', {
            slidesPerView: 1,
            spaceBetween: 0,
            loop: true,
            speed: 1000,
            autoplay: {
                delay: 4000,
                disableOnInteraction: false,
            },
            navigation: {
                nextEl: '.hero-next',
                prevEl: '.hero-prev',
            },
            // Responsive breakpoints
            breakpoints: {

                767: {
                    slidesPerView: 1,
                    spaceBetween: 30
                },
            }
        });
        //Trending place slider
        var swiper_2 = new Swiper('.trending-place-wrap', {
            slidesPerView: 5,
            spaceBetween: 30,
            slidesPerGroup: 3,
            setWrapperSize: true,
            speed: 1500,
            loop: true,
            pagination: {
                el: '.trending-pagination',
                clickable: true,
            },
            // Responsive breakpoints
            breakpoints: {

                767: {
                    slidesPerView: 1,
                    slidesPerGroup: 1,
                    spaceBetween: 10
                },
                1024: {
                    slidesPerView: 2,
                    spaceBetween: 30
                },
                2050: {
                    slidesPerView: 3,
                    spaceBetween: 30
                }
            }
        });

        //Similar Listing Slider
        var swiper_3 = new Swiper('.similar-list-wrap', {
            slidesPerView: 2,
            spaceBetween: 30,
            loop: true,
            speed: 1000,
            navigation: {
                nextEl: '.similar-next',
                prevEl: '.similar-prev',
            },
            // Responsive breakpoints
            breakpoints: {

                767: {
                    slidesPerView: 1,
                    spaceBetween: 30
                },
            }
        });
        //Popular place slider one
        var swiper = new Swiper('.popular-place-wrap', {
            slidesPerView: 4,
            spaceBetween: 20,
            loop: true,
            speed: 1000,
            navigation: {
                nextEl: '.popular-next',
                prevEl: '.popular-prev',
            },
            // Responsive breakpoints
            breakpoints: {

                767: {
                    slidesPerView: 1,
                },
                991: {
                    slidesPerView: 2,
                    spaceBetween: 30
                },
                1200: {
                    slidesPerView: 3,
                    spaceBetween: 30
                }
            }
        });
        //similar slider one
        var swiper = new Swiper('.similar-project-wrap', {
            slidesPerView: 4,
            spaceBetween: 20,
            loop: true,
            speed: 1000,
            pagination: {
                el: '.similar-project-pagination',
                clickable: true,
            },
            // Responsive breakpoints
            breakpoints: {

                767: {
                    slidesPerView: 1,
                },
                991: {
                    slidesPerView: 2,
                    spaceBetween: 30
                },
                1200: {
                    slidesPerView: 3,
                    spaceBetween: 30
                }
            }
        });
        //Popular place slider Two
        var swiper_4 = new Swiper('.popular-place-wrap.v2', {
            slidesPerView: 3,
            spaceBetween: 30,
            loop: true,
            speed: 1000,
            navigation: {
                nextEl: '.popular-next.style2',
                prevEl: '.popular-prev.style2',
            },
            // Responsive breakpoints
            breakpoints: {

                767: {
                    slidesPerView: 1,
                },
                991: {
                    slidesPerView: 2,
                    spaceBetween: 30
                }
            }
        });
        //Coupon Slider
        var swiper_5 = new Swiper('.coupon-wrap', {
            slidesPerView: 2,
            spaceBetween: 20,
            loop: false,
            speed: 1000,
            navigation: {
                nextEl: '.coupon-next',
                prevEl: '.coupon-prev',
            },
            // Responsive breakpoints
            breakpoints: {
                991: {
                    slidesPerView: 1,
                },
                1200: {
                    slidesPerView: 2,
                }
            }
        });
        //Partner slider
        var swiper_6 = new Swiper('.partner-wrap', {
            slidesPerView: 5,
            spaceBetween: 30,
            loop: true,
            speed: 1000,
            navigation: {
                nextEl: '.partner-next',
                prevEl: '.partner-prev',
            },
            // Responsive breakpoints
            breakpoints: {

                575: {
                    slidesPerView: 2,
                    spaceBetween: 30
                },
                767: {
                    slidesPerView: 3,
                    spaceBetween: 30
                },
                991: {
                    slidesPerView: 4,
                    spaceBetween: 30
                }
            }
        });
        //Testimonial slider
        var swiper_7 = new Swiper('.testimonial-wrapper', {
            slidesPerView: 3,
            loop: true,
            speed: 1000,
            autoplay: {
                delay: 3000,
                disableOnInteraction: false,
            },
            centeredSlides: true,
            pagination: {
                el: '.client-pagination',
                clickable: true,
            },
            // Responsive breakpoints
            breakpoints: {

                991: {
                    slidesPerView: 1,
                }
            }
        });

        //Team Slider
        var swiper_8 = new Swiper('.team-wrapper', {
            slidesPerView: 4,
            loop: true,
            speed: 1000,
            spaceBetween: 30,
            navigation: {
                nextEl: '.team-next',
                prevEl: '.team-prev',
            },
            // Responsive breakpoints
            breakpoints: {
                480: {
                    slidesPerView: 1,
                },
                991: {
                    slidesPerView: 2,
                    spaceBetween: 30
                },
                1024: {
                    slidesPerView: 3,
                    spaceBetween: 30
                }
            }
        });
        //Listing details carousel
        var swiper_9 = new Swiper('.listing-details-slider', {
            slidesPerView: 2,
            spaceBetween: 0,
            loop: true,
            speed: 1000,
            navigation: {
                nextEl: '.listing-details-next',
                prevEl: '.listing-details-prev',
            },
            autoplay: {
                delay: 3000,
                disableOnInteraction: false,
            },
            breakpoints: {

                767: {
                    slidesPerView: 1,
                    spaceBetween: 15,
                }
            }
        });

        /*---------------------------------
                Date Picker
        ------------------------------------*/
        if ($("./*counter*/-widget").length > 0) {
            var countCurrent = $(".counter-widget").attr("data-countDate");
            $(".countdown").downCount({
                date: countCurrent,
                offset: 0
            });
        }

    });

    /*---------------------------------
               Nice select
    -----------------------------------*/
    $('select').niceSelect();

    /*-------------------------------------
              Quantity Slider
     -------------------------------------*/
    var quantitiy = 0;
    $('.quantity-right-plus').on("click", function(e) {
        e.preventDefault();
        var quantity = parseInt($(this).parent().siblings("input.input-number").val(), 10);
        $(this).parent().siblings("input.input-number").val(quantity + 1);
    });
    $('.quantity-left-minus').on("click", function(e) {
        e.preventDefault();
        var quantity = parseInt($(this).parent().siblings("input.input-number").val(), 10);
        if (quantity > 0) {
            $(this).parent().siblings("input.input-number").val(quantity - 1);
        }
    });

}(jQuery));
 /*----------------------------------------
           chart
    ------------------------------------------*/
    var options = {
        chart: {
          type: "area",
          height: 300,
          foreColor: "#999",
          scroller: {
            enabled: true,
            track: {
              height: 7,
              background: '#e0e0e0'
            },         
            thumb: {
              height: 10,
              background: '#94E3FF'
            },
            scrollButtons: {
              enabled: false,
              size: 9,
              borderWidth: 2,
              borderColor: '#008FFB',
              fillColor: '#008FFB'
            },
            padding: {
              left: 30,
              right: 20
            }
          },
          toolbar: {
            show: false,
            offsetX: 0,
            offsetY: 0,
                tools: {
                download: false,
                selection: false,
                zoom: false,
                zoomin: false,
                zoomout: false,
                pan: false,
                reset: false,
                
                }
            
          }, 
        
          stacked: true,
          dropShadow: {
            enabled: false,
            enabledSeries: [0],
            top: -2,
            left: 2,
            blur: 5,
            opacity: 0.06
          }
        },
        colors: ['#E61E28', '#A2A2A2','#EBEDEF'],
        stroke: {
          curve: "smooth",
          width: 3
        },
        dataLabels: {
          enabled: false
        },
        series: [{
          name: 'Impactable Spend',
          data: generateDayWiseTimeSeries(0, 18)
        }, {
          name: 'Managed Spend',
          data: generateDayWiseTimeSeries(1, 18)
        },{
            name: ' Spend',
            data: generateDayWiseTimeSeries(2, 18)
          }],
        markers: {
          size: 0,
          strokeColor: "#fff",
          strokeWidth: 3,
          strokeOpacity: 1,
          fillOpacity: 1,
          hover: {
            size: 6
          }
        },
        xaxis: {
          type: "datetime",
          axisBorder: {
            show: false
          },
          axisTicks: {
            show: false
          },
          tooltip: {
            enabled: false
          }
        },
        yaxis: {
          labels: {
            offsetX: 24,
            offsetY: -5,
            formatter: function (value) {
              return '$' + value.toFixed(0);
            }
          },
          tooltip: {
            enabled: false,
            theme: 'light'
          }
        },
        grid: {
          padding: {
            left: -5,
            right: 5
          }
        },
        tooltip: {
          x: {
            format: "MMMM dd yyyy"
          },
        },
        legend: {
          position: 'bottom',
          horizontalAlign: 'center',
    
        },
        fill: {
          type: "solid",
          fillOpacity: 0.7
        }
      };
    
      var chart = new ApexCharts(document.querySelector("#timeline-chart"), options);
    
      chart.render();
    
      function generateDayWiseTimeSeries(s, count) {
        var values = [[
          4,3,10,9,9,19,25,9,12,7,19,5,13,9,17,2,7,5
        ], [
          2,3,8,7,22,16,23,7,11,5,12,5,10,4,15,2,6,2
        ], [
            4,2,6,5,2,36,23,27,3,31,12,11,13,4,5,11,2,21
          ]];
        var i = 0;
        var series = [];
        var x = new Date("11 July 2020").getTime();
        while (i < count) {
          series.push([x, values[s][i]]);
          x += 86400000;
          i++;
        }
        return series;
      }