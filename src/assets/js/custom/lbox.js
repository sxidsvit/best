// Настройка формы лайтбокса	
function formСustomization(element, dataBtnText) {
	var lbox = $('.lbox'); 
	console.log('dataBtnText: ' + dataBtnText);

	lbox.css({'display': 'flex'}).fadeTo(1000, 0.99);
	$('.lbox .close-button').fadeTo(1000, 1);
	if (element == 'white-lbox') {
		$('.lbox-forma-wrapper').fadeTo(1000, 1);
		$('.lbox-forma-wrapper .cta-btn__text').text(dataBtnText);
	}
	if (element == 'black-lbox') {
		$('.lbox2-forma-wrapper').fadeTo(1000, 1);
	}
}

// Кнопка для отображения БЕЛОЙ ФОРМЫ в лайтбоксе

$('.btn-white-lbox').click(function(e) {
	e.preventDefault();
	var dataBtnText = $(this).data('btn_text');
	var element = 'white-lbox';
	formСustomization(element, dataBtnText);
});

// Кнопка для отображения ЧЕРНОЙ ФОРМЫ в лайтбоксе
$('.btn-black-lbox').click(function(e) {
	e.preventDefault();
	var dataBtnText = $(this).data('btn_text');
	var element = 'black-lbox';
	formСustomization(element, dataBtnText);
});

// Закратия лайтбокса
$('.lbox .close-button').click(function(e) {
	e.preventDefault();
	$(this).parent().parent().fadeOut(1000, "swing");
	$('.lbox').fadeOut(1000, "swing");

});



