// 04. PACE PRELOADER
//==================================================================================
Pace.on('done', function () {
	$('#preloader').hide();
});

Pace.on('hide', function () {

	// 04.1 Gallery - Masonry
	//------------------------------------------------------------------------------
	var $gallery = $('#masonry-gallery');

	if (device.tablet() || device.mobile()) {
		$gallery.masonry({
			columnWidth: ".grid-sizer",
			itemSelector: ".masonry-col",
			gutter: ".gutter-sizer",
			transitionDuration: 0,
		});
	}
	else
	{
		$gallery.masonry({
			columnWidth: ".grid-sizer",
			itemSelector: ".masonry-col",
			gutter: ".gutter-sizer",
			transitionDuration: "1s",
		});
	}


	// 04.2 Nav Header Position (Mobile)
	//------------------------------------------------------------------------------
	if (device.tablet() || device.mobile()) {
		if ($("#nav-bar").hasClass("sticky-nav")) {
			$("#nav-header").css("position","relative");
		}
	}

	// 04.3 Waypoint Sticky Navbar
	//------------------------------------------------------------------------------
	if ($("#nav-bar").hasClass("sticky-nav")){

		// 04.3.1 Top Bar
		if ($("#nav-bar").hasClass("top-bar")){

 			var nav_header_waypoint = $('#nav-header').waypoint(function(direction) {

				if (direction === 'down') {
					if( !device.tablet() && !device.mobile() ) {
						$("#nav-bar").addClass("stick-it animated fadeInDownBig");
					}
					else
					{
						$("#nav-bar").addClass("stick-it");
					}
				}
				else {
					$("#nav-bar").removeClass("stick-it animated fadeInDownBig");
				}

			}, {
					offset:'-100%'
			});
		}

		// 04.3.2 Bottom Bar
		else if  ($("#nav-bar").hasClass("bottom-bar")){

			var waypoints = $('#nav-header').waypoint(function(direction) {

				if (direction === 'down') {
					if( !device.tablet() && !device.mobile() ) {
						$("#nav-bar").addClass("stick-it animated fadeInDownBig");
					}
					else
					{
						$("#nav-bar").addClass("stick-it");
					}
				}
				else if (direction === 'up') {
					$("#nav-bar").removeClass("stick-it animated fadeInDownBig");
				}

			}, {
					offset:'-145px'
			});
		}

	}

	// 04.4 Waypoint Sticky Menu Icon (Sidebar Version)
	//------------------------------------------------------------------------------

	var sticky_menuicon_waypoint = $('#menu-icon').waypoint(function(direction) {
		if (direction === 'down') {
			$('#sticky-menuicon').show();
		}
		else {
			$('#sticky-menuicon').hide();
		}

	}, {
			offset:'-100%'
	})


	// 04.5 Waypoint Animate CSS
	//------------------------------------------------------------------------------
	if( !device.tablet() && !device.mobile() && !isIE9() ) {
		$('.animation').each(function(){
      		var _this = this;
      		var animation_waypoint = new Waypoint({
          		element: _this,
          		handler: function (direction) {
					$(this.element).css({ visibility: 'visible' });
					$(this.element).addClass('animated');
          			},
          			offset: '90%'
      			});
      	});

	}

	// 04.6 Stellar Parallax
	//------------------------------------------------------------------------------
 	if( !device.tablet() && !device.mobile() && !isIE9() && !isIE10() && !isSafari() ) {
		$(".image-divider").css("background-attachment","fixed");
	 	$(window).stellar({
		 	horizontalScrolling: false,
			responsive: true,
	 	});
 	}

}); // END of Pace on Hide
