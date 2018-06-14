$(document).ready(function() {

$('.preloader').delay(500).fadeOut('slow'); 

$('.review-photo__overlay').magnificPopup({
	type:'image',
// Delay in milliseconds before popup is removed
removalDelay: 300,
// Class that is added to popup wrapper and background
// make it unique to apply your CSS animations just to this exact popup
mainClass: 'mfp-fade'
});

// Lazy load 
 $('.lazy').Lazy();

// Slick slider for reviews
function slickSlider() {
var viewportWidth = $(window).width();
console.log ('ViewportWidth : ' + viewportWidth);
if ( viewportWidth <= 576) { 
	console.log ('Я здесь. ViewportWidth : ' + viewportWidth);
	$( '.slider').slick({
	    slidesToShow: 1,
	    slidesToScroll: 1,
	    arrows: false,
	    touchMove: true,
	    dots: true
	}); 
} // endif
} // end slickSlider

slickSlider() ;


 window.onresize = function() {
 	var viewportWidth = $(window).width();
 	console.log ('ViewportWidth : ' + viewportWidth);
 	if ( viewportWidth <= 576) slickSlider() ;
 };


  // for quizz & lbox & sections
	$( 'input.icon').mask('+7 (999) 999-99-99');
 
})