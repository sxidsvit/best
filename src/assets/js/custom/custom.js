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

  // for quizz & lbox & sections
	$( 'input.icon').mask('+7 (999) 999-99-99');
 
})