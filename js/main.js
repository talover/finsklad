$(document).ready(function(){
	$('input, select').styler();
	tabs();

	// .city-selection

	$('.city-selection > a').click(function(e){
		e.preventDefault();
		$('.dropdown-city-selection').slideDown();
	});


	$(document).on('click', function(e) {
		if (!$(e.target).closest('.dropdown-city-selection,.city-selection > a').length) {
			$('.dropdown-city-selection').slideUp();
		}
	});

	$('.city-selection ul li a').click(function(e){
		e.preventDefault();
		$('.dropdown-city-selection').slideUp();
	});

	//size-filter

	$('.size-filter > a').click(function(e){
		e.preventDefault();
		$('.dropdown-size').slideDown();
	});


	$(document).on('click', function(e) {
		if (!$(e.target).closest('.dropdown-size,.size-filter > a').length) {
			$('.dropdown-size').slideUp();
		}
	});
	// quantity

	$('.quantity a.up').click(function(e){
		e.preventDefault();
		var input = $(this).parents('.quantity').find('input[type="text"]');
		var num = input.val();

		input.val(parseInt(num) + 1);
	});

	$('.quantity a.down').click(function(e){
		e.preventDefault();
		var input = $(this).parents('.quantity').find('input[type="text"]');
		var num = input.val();

		if(num > 1) {
			input.val(parseInt(num) - 1);
		}else {
			input.val(1);
		}
	});

	// sliders

	var owl = $(".product-slider");
    var sync1 = $("#sync1");
    var sync2 = $("#sync2");
    var main_slider = $(".categories-slider");
    var managers_slider = $(".managers-slider");

	owl.owlCarousel({
		itemsCustom : [
			[0, 2],
			[450, 3],
			[600, 4],
			[700, 5],
			[1000, 7],
			[1200, 8],
			[1400, 10],
			[1600, 12]
		],
		navigation : false
	});

    managers_slider.owlCarousel({
        itemsCustom : [
            [0, 2],
            [450, 2],
            [600, 3],
            [700, 4],
            [1000, 5],
            [1200, 5],
            [1400, 5],
            [1600, 5]
        ],
        navigation : false,
        autoPlay : 10000,
    });

    main_slider.owlCarousel({
        items : 4, //10 items above 1000px browser width
        navigation : true,
        slideSpeed : 500,
        paginationSpeed : 1000,
        autoPlay : 10000,
    });

    sync1.owlCarousel({
        singleItem : true,
        slideSpeed : 1000,
        navigation: false,
        pagination:false,
        afterAction : syncPosition,
        responsiveRefreshRate : 200,
    });

    sync2.owlCarousel({
        items : 7,
        itemsDesktop      : [1199,7],
        itemsDesktopSmall     : [979,7],
        itemsTablet       : [768,7],
        itemsMobile       : [479,7],
        pagination:false,
        responsiveRefreshRate : 100,
        navigation: true,
        afterInit : function(el){
            el.find(".owl-item").eq(0).addClass("synced");
        }
    });

    function syncPosition(el){
        var current = this.currentItem;
        $("#sync2")
        .find(".owl-item")
        .removeClass("synced")
        .eq(current)
        .addClass("synced")
        if($("#sync2").data("owlCarousel") !== undefined){
            center(current)
        }
    }

    $("#sync2").on("click", ".owl-item", function(e){
        e.preventDefault();
        var number = $(this).data("owlItem");
        sync1.trigger("owl.goTo",number);
    });

    function center(number){
        var sync2visible = sync2.data("owlCarousel").owl.visibleItems;
        var num = number;
        var found = false;

        for(var i in sync2visible){
            if(num === sync2visible[i]){
                var found = true;
            }
        }

        if(found===false){
            if(num>sync2visible[sync2visible.length-1]){
                sync2.trigger("owl.goTo", num - sync2visible.length+2)
            }else{
            if(num - 1 === -1){
                num = 0;
            }
            sync2.trigger("owl.goTo", num);
            }
        } else if(num === sync2visible[sync2visible.length-1]){
            sync2.trigger("owl.goTo", sync2visible[1])
        } else if(num === sync2visible[0]){
            sync2.trigger("owl.goTo", num-1)
        }
    }

	// payment-system

	$('.payment-system-list a , .delivery-list a').click(function(e){
		e.preventDefault();

		$(this).parents('li').addClass('active').siblings().removeClass('active');
	});

	// catalog-list

	$('.catalog-list > li').mouseenter(function(e){
		e.preventDefault();
		$(this).find('.product-info-wrap').show(400);


        var slider =  $(this).find('.slider-product-info').bxSlider({
            mode: 'vertical',
            slideWidth: 65,
            minSlides: 4,
            slideMargin: 5,
            moveSlides: 1,
        });
	});

	$('.catalog-list > li').mouseleave(function(){
		$(this).find('.product-info-wrap').hide(300);
	});

    $('.slider-product-info').on('mouseenter','.slide a', function(){
       var slide_tab = $(this).data('product');

        $(this).parents('.slide').siblings().find('a').removeClass('active');
        $(this).addClass('active');
        $(this).parents('.product-info-wrap').find('.product-info').removeClass('active');
        $(slide_tab).addClass('active'); 
    });

    $('.product-info .img-block').hover(function(){
        var pic = $(this).find('img').data('pic');

        $(this).find('img').attr('src',pic );

    },function(){
        var pic_old = $(this).find('img').data('picOld');

        $(this).find('img').attr('src',pic_old );
    });

    // .product-specifications

    $('.product-specifications li').click(function(){
        $(this).find('.dropdown-tooltip').slideDown();
        $(this).siblings().find('.dropdown-tooltip').slideUp();
    });

    $(document).on('click', function(e) {
        if (!$(e.target).closest('.product-specifications li > .dropdown-tooltip, .product-specifications li').length) {
            $('.dropdown-tooltip').slideUp();
        }
    });

    // size popup

    $('.size-btn a').click(function(e){
        e.preventDefault();

        $('.size-info').slideDown();
    });

    $(document).on('click', function(e) {
        if (!$(e.target).closest('.size-info, .size-btn a').length) {
            $('.size-info').slideUp();
        }
    });

	// popup

	$(".quick-view , .busket-btn").fancybox({
		padding : 0, 
		wrapCSS: "popup-wrap",
	});

    // #right-banner
        $('#right-banner .close').click(function(e){
            e.preventDefault();
            $('#right-banner').fadeOut();
        }); 

    //

    $('.product-color-list a , .product-size-list a').click(function(e){
        e.preventDefault();
        $(this).parents('li').siblings().removeClass('active');
        $(this).parents('li').addClass('active');

    });


    // favorites 


    $('.favorites-btn').click(function(e){
        e.preventDefault();
        $('.favorites').slideDown();
    });


    $(document).on('click', function(e) {
        if (!$(e.target).closest('.favorites, .favorites-btn').length) {
            $('.favorites').slideUp();
        }
    });
});

/* tabs */

function tabs(){
	$('.tabs-list').on('click', 'a', function(e){
		e.preventDefault();
		var tab = $(this).attr('href');

		$(this).parents('li').addClass('active').siblings().removeClass('active');
		$(this).parents('.tabs-wrap').find('.tab').removeClass('active');
		$(tab).addClass('active');
	})
}