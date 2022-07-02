function getUrlParams(dParam) {
    var dPageURL = window.location.search.substring(1),
        dURLVariables = dPageURL.split('&'),
        dParameterName,
        i;

    for (i = 0; i < dURLVariables.length; i++) {
        dParameterName = dURLVariables[i].split('=');

        if (dParameterName[0] === dParam) {
            return dParameterName[1] === undefined ? true : decodeURIComponent(dParameterName[1]);
        }
    }
}

var Edumin = function(){

	// Metis Menu
	var handleMetisMenu = function() {
		if(jQuery('#menu').length > 0 ){
			$("#menu").metisMenu();
		}
		jQuery('.metismenu > .mm-active ').each(function(){
			if(!jQuery(this).children('ul').length > 0)
			{
				jQuery(this).addClass('active-no-child');
			}
		});
	}
	
	// All Checked
	var handleAllChecked = function() {
		$("#checkAll").change(function() {
			$("td input:checkbox").prop('checked', $(this).prop("checked"));
		});
	}
	
	// Navigation
	var handleNavigation = function() {
		$(".nav-control").on('click', function() {

			$('#main-wrapper').toggleClass("menu-toggle");

			$(".hamburger").toggleClass("is-active");
		});
	}
	
	// Current Active
	var handleCurrentActive = function() {
		for (var nk = window.location,
			o = $("ul#menu a").filter(function() {
				
				return this.href == nk;
				
			})
			.addClass("mm-active")
			.parent()
			.addClass("mm-active");;) 
		{
			
			if (!o.is("li")) break;
			
			o = o.parent()
				.addClass("mm-show")
				.parent()
				.addClass("mm-active");
		}
	}
	
	// Mini Sidebar
	var handleMiniSidebar = function() {
		$("ul#menu>li").on('click', function() {
			const sidebarStyle = $('body').attr('data-sidebar-style');
			if (sidebarStyle === 'mini') {
				console.log($(this).find('ul'))
				$(this).find('ul').stop()
			}
		})
	}
	
	// Min Height
	var handleMinHeight = function() {
		var win_h = window.outerHeight;
		var win_h = window.outerHeight;
		if (win_h > 0 ? win_h : screen.height) {
			$(".content-body").css("min-height", (win_h + 60) + "px");
		};
	}
	
	// Data Action
	var handleDataAction = function() {
		$('a[data-action="collapse"]').on("click", function(i) {
			i.preventDefault(),
				$(this).closest(".card").find('[data-action="collapse"] i').toggleClass("mdi-arrow-down mdi-arrow-up"),
				$(this).closest(".card").children(".card-body").collapse("toggle");
		});

		$('a[data-action="expand"]').on("click", function(i) {
			i.preventDefault(),
				$(this).closest(".card").find('[data-action="expand"] i').toggleClass("icon-size-actual icon-size-fullscreen"),
				$(this).closest(".card").toggleClass("card-fullscreen");
		});

		$('[data-action="close"]').on("click", function() {
			$(this).closest(".card").removeClass().slideUp("fast");
		});

		$('[data-action="reload"]').on("click", function() {
			var e = $(this);
			e.parents(".card").addClass("card-load"),
				e.parents(".card").append('<div class="card-loader"><i class=" ti-reload rotate-refresh"></div>'),
				setTimeout(function() {
					e.parents(".card").children(".card-loader").remove(),
						e.parents(".card").removeClass("card-load")
				}, 2000)
		});
	}
	
	// Header Hight
	var handleHeaderHight = function() {
		const headerHight = $('.header').innerHeight();
		$(window).scroll(function() {
			if ($('body').attr('data-layout') === "horizontal" && $('body').attr('data-header-position') === "static" && $('body').attr('data-sidebar-position') === "fixed")
				$(this.window).scrollTop() >= headerHight ? $('.deznav').addClass('fixed') : $('.deznav').removeClass('fixed')
		});
	}

	// dlab Scroll
	var handleDlabScroll = function() {
		jQuery('.dz-scroll').each(function(){
			var scroolWidgetId = jQuery(this).attr('id');
			const ps = new PerfectScrollbar('#'+scroolWidgetId, {
			  wheelSpeed: 2,
			  wheelPropagation: true,
			  minScrollbarLength: 20
			});
            ps.isRtl = false;
		})
	}
	
	// btn Number
	var handleBtnNumber = function() {
		$('.btn-number').on('click', function(e) {
			e.preventDefault();

			fieldName = $(this).attr('data-field');
			type = $(this).attr('data-type');
			var input = $("input[name='" + fieldName + "']");
			var currentVal = parseInt(input.val());
			if (!isNaN(currentVal)) {
				if (type == 'minus')
					input.val(currentVal - 1);
				else if (type == 'plus')
					input.val(currentVal + 1);
			} else {
				input.val(0);
			}
		});
	}
	
	// Perfect Scrollbar
	var handlePerfectScrollbar = function() {
		if(jQuery('.dlabnav-scroll').length > 0)
		{
			const qs = new PerfectScrollbar('.dlabnav-scroll');
			
			qs.isRtl = false;
		}
	}
	
	// Show Pass
	var handleshowPass = function(){
		jQuery('.show-pass').on('click',function(){
			jQuery(this).toggleClass('active');
			if(jQuery('#dlabPassword').attr('type') == 'password'){
				jQuery('#dlabPassword').attr('type','text');
			}else if(jQuery('#dlabPassword').attr('type') == 'text'){
				jQuery('#dlabPassword').attr('type','password');
			}
		});
	}
	
	
	/* Function ============ */
	return {
		init:function(){
			handleMetisMenu();
			handleAllChecked();
			handleNavigation();
			handleCurrentActive();
			handleMiniSidebar();
			handleMinHeight();
			handleDataAction();
			handleHeaderHight();
			handleDlabScroll();
			handlePerfectScrollbar();
			handleBtnNumber();
			handleshowPass();
		},

		load:function(){
			
		},
		
		resize:function(){
			
		},
	}
	
}();


/* Document.ready Start */	
jQuery(document).ready(function() {
	
	$('[data-toggle="popover"]').popover();
	
	Edumin.init();
	
});
/* Document.ready END */

/* Window Load START */
jQuery(window).on('load',function () {
	'use strict'; 
	
	$('#preloader').fadeOut(500);
    $('#main-wrapper').addClass('show');
	$('select').selectpicker();
	
	Edumin.load();
	
});
/*  Window Load END */
/* Window Resize START */
jQuery(window).on('resize',function () {
	'use strict'; 
	Edumin.resize();
});
/*  Window Resize END */