$(document).ready(function() {

$('.preloader').delay(1500).fadeOut('slow'); 

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
var viewportWidth = window.innerWidth;
console.log ('ViewportWidth (window.innerWidth): ' + viewportWidth);
if ( viewportWidth <= 576) { 
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
 	var viewportWidth = window.innerWidth;
 	console.log ('ViewportWidth (window.innerWidth): ' + viewportWidth);
 	if ( viewportWidth <= 576) slickSlider() ;
 };

  $('.scrollquizz').click(function(event){
    event.preventDefault();
    var id = $(this).attr('href'),
    top = $(id).offset().top;
    $('body,html').animate({scrollTop: top}, 1000);
  });

  // for quizz & lbox & sections
	$( 'input.icon').mask('+7 (999) 999-99-99');
 
})