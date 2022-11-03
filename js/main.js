svgToInline(".inline-svg");
$(window).on("load", function () {
	$("#loading").addClass("--loaded");
	if (window.matchMedia("(max-width: 767px)").matches) {
		// The viewport is less than 768 pixels wide
		header.addClass("--active");
	}
	closeSideNav();
});
const sliderWrapper = $(".slider__wrapper");
$(window).on("load", function () {
	//console.log(sliderWrapper);
	sliderWrapper.flickity({
		cellSelector: ".slider__item",
		cellAlign: "left",
		contain: true,
		wrapAround: true, //loop
		draggable: true,
		prevNextButtons: false,
		pageDots: false,
		autoPlay: false,
		pauseAutoPlayOnHover: false,
		lazyLoad: 1,
		selectedAttraction: 0.01, //Higher attraction makes the slider move faster
		friction: 0.2, //Higher friction makes the slider feel stickier and less bouncy
		setGallerySize: false, //Set size of cells by CSS
		on: {
			ready: function () {
				// let default_dots = $(".flickity-page-dots"),
				// 	my_dots = $(".slider__paging");
				// default_dots.addClass("slider__dots");
				// default_dots.appendTo(my_dots);
			},
			change: function (index) {
				// let number = $(".slider__number span");
				// number.text((index + 1).toString().padStart(2, 0));
			},
		},
	});
	console.log(sliderWrapper.find(".scroll-animation .inline-svg>:last-child"));
});

/* SHOW - HIDE HEADER WHEN SCROLLING */
const header = $("header.main-header"),
	toggleBtn = $("#toggle-btn");
// $(window).on("load", function () {
// 	header.addClass("--active");
// 	header.removeClass("--minimize");
// });
let lastScollPos = 0;
const toggleBtnY = toggleBtn.offset().top + toggleBtn.height();
$(document).on("scroll", function () {
	headerStyling($(this));
	closeSideNav();
});
function headerStyling(window) {
	let scrollTop = window.scrollTop();
	//console.log(scrollTop + " " + lastScollPos);
	if (scrollTop > lastScollPos) {
		// downscroll code
		if (scrollTop > 270) {
			header.removeClass("--active");
		}
	} else {
		// upscroll code
		if (scrollTop >= toggleBtn.offset().top + toggleBtn.height()) {
			header.addClass("--active");
		} else {
			header.removeClass("--active");
		}
	}
	if (scrollTop == 0) {
		header.addClass("--minimize");
	} else {
		header.removeClass("--minimize");
	}
	lastScollPos = scrollTop;
}

/* SHOW - HIDE SIDENAV WHEN CLICK BTN */
const sideNav = $("nav"),
	overlay = $("#overlay"),
	mobileBurger = $("header .memu-mobile .burger");
$(document).on("click", "#toggle-btn", function () {
	openSideNav();
});

$(document).on("click", "#toggle-btn-mobile", function () {
	openSideNav();
});
$(document).on("click", "#close-nav", function () {
	closeSideNav();
});
$(document).on("click", "#overlay", function () {
	closeSideNav();
});
$(document).on("keydown", function (event) {
	if (event.key === "Escape") {
		closeSideNav();
	}
});

function openSideNav() {
	sideNav.addClass("--active");
	overlay.addClass("--active");
	$("main, footer").addClass("nav-active");
}

function closeSideNav() {
	overlay.removeClass("--active");
	sideNav.removeClass("--active");
	$("main, footer").removeClass("nav-active");
}

// CATEGORY - PRODUCT LIST
const $category = $(".category__detail");
// bind event listener first
$category.on("ready.flickity", function () {
	console.log("Flickity ready");
});
// initialize Flickity
$category.each(function (index) {
	let $carousel = $(this).find(".custom-row"),
		$prevBtn = $(this).find(".control .btn__control.--prev"),
		$nextBtn = $(this).find(".control .btn__control.--next");
	$carousel.flickity({
		cellSelector: ".cell",
		cellAlign: "left",
		contain: true,
		wrapAround: true, //loop
		draggable: true,
		prevNextButtons: false,
		pageDots: false,
		autoPlay: false,
		pauseAutoPlayOnHover: false,
		lazyLoad: 1,
		selectedAttraction: 0.01, //Higher attraction makes the slider move faster
		friction: 0.2, //Higher friction makes the slider feel stickier and less bouncy
		setGallerySize: false, //Set size of cells by CSS
		// groupCells: 3,
		on: {
			ready: function () {
				// let default_dots = $(".flickity-page-dots"),
				// 	my_dots = $(".slider__paging");
				// default_dots.addClass("slider__dots");
				// default_dots.appendTo(my_dots);

				// BIND CONTROL
				// previous
				$prevBtn.on("click", function () {
					$carousel.flickity("previous");
				});
				// next
				$nextBtn.on("click", function () {
					$carousel.flickity("next");
				});
			},
			change: function (index) {
				// let number = $(".slider__number span");
				// number.text((index + 1).toString().padStart(2, 0));
			},
		},
	});
});

$(window).on("load", function () {
	$(".project .project__types .project__type").each(function (index, value) {
		let delay = index * 60;
		$(this).css({
			"animation-delay": delay + "ms",
		});
	});
});

// PRODUCT-IMAGE-FLICKITY
const $productImages = $("main.product .image__wrapper");
// bind event listener first
$productImages.on("ready.flickity", function () {
	console.log("Flickity ready");
});
// initialize Flickity
$productImages.flickity({
	cellSelector: ".image__item",
	cellAlign: "left",
	contain: true,
	wrapAround: true, //loop
	draggable: true,
	prevNextButtons: false,
	pageDots: true,
	autoPlay: false,
	pauseAutoPlayOnHover: false,
	selectedAttraction: 0.01, //Higher attraction makes the slider move faster
	friction: 0.2, //Higher friction makes the slider feel stickier and less bouncy
	setGallerySize: false, //Set size of cells by CSS
	// groupCells: 3,
	on: {
		ready: function () {
			// let default_dots = $(".flickity-page-dots"),
			// 	my_dots = $(".slider__paging");
			// default_dots.addClass("slider__dots");
			// default_dots.appendTo(my_dots);
			// BIND CONTROL
			let $prevBtn = $(".control .btn__control.--prev"),
				$nextBtn = $(".control .btn__control.--next"),
				$zoomBtn = $("main.product .image__viewer .zoom-btn"),
				$exitFS = $("main.product .image__viewer .close-fullscreen");
			// previous
			$prevBtn.on("click", function () {
				$productImages.flickity("previous");
			});
			// next
			$nextBtn.on("click", function () {
				$productImages.flickity("next");
			});
			// fullscreen
			$zoomBtn.on("click", function () {
				$productImages.flickity("viewFullscreen");
			});
			//exit fullscreen
			$exitFS.on("click", function () {
				$productImages.flickity("exitFullscreen");
			});
		},
		change: function (index) {
			// let number = $(".slider__number span");
			// number.text((index + 1).toString().padStart(2, 0));
		},
	},
});

//FB SHARE
$(".fbsharelink").on("click", function () {
	alert("you are sharing this page " + window.location.href);
});

// PHOTOSWIPE
let openPhotoSwipe = function () {
	let pswpElement = document.querySelectorAll(".pswp")[0];

	// build items array
	let items = [
		{
			src: "img/ultility_1.jpg",
			w: 800,
			h: 600,
		},
		{
			src: "img/ultility_2.jpg",
			w: 800,
			h: 600,
		},
		{
			src: "img/ultility_3.jpg",
			w: 800,
			h: 600,
		},
		{
			src: "img/ultility_4.jpg",
			w: 800,
			h: 600,
		},
		{
			src: "img/ultility_5.jpg",
			w: 800,
			h: 600,
		},
		{
			src: "img/ultility_6.jpg",
			w: 800,
			h: 600,
		},
		{
			src: "img/ultility_7.jpg",
			w: 800,
			h: 600,
		},
		{
			src: "img/ultility_8.jpg",
			w: 800,
			h: 600,
		},
	];

	// define options (if needed)
	let options = {
		istory: true,
		focus: false,
		showAnimationDuration: 0,
		hideAnimationDuration: 0,
	};

	// Initializes and opens PhotoSwipe
	var gallery = new PhotoSwipe(
		pswpElement,
		PhotoSwipeUI_Default,
		items,
		options
	);
	gallery.init();
};

$(".open-pswp").on("click", openPhotoSwipe);

$("footer .back-to-top").on("click", function () {
	//1 second of animation time
	//html works for FFX but not Chrome
	//body works for Chrome but not FFX
	//This strange selector seems to work universally
	$("html, body").animate({ scrollTop: 0 }, 1000);
});
