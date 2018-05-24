var dataBtnText;

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
	dataBtnText = $(this).data('btn_text');
	var element = 'white-lbox';
	formСustomization(element, dataBtnText);
});

// Кнопка для отображения ЧЕРНОЙ ФОРМЫ в лайтбоксе
$('.btn-black-lbox').click(function(e) {
	e.preventDefault();
	dataBtnText = $(this).data('btn_text');
	var element = 'black-lbox';
	formСustomization(element, dataBtnText);
	});

// Закратия лайтбокса
$('.lbox .close-button').click(function(e) {
	e.preventDefault();
	$(this).parent().parent().fadeOut(1000, "swing");
	$('.lbox').fadeOut(1000, "swing");

});

// Отправка формы 

$('.lbox button').click(function(e) {
	e.preventDefault();
	var lboxForm = $(this).parent();
	lboxForm.prepend('<input type = "hidden"  name = "Zapros from Best"></input>');
 	lboxForm.children('[name = "Zapros from Best"]').attr('value', dataBtnText); 

// $( '#callback-form-2' ).submit( function(){
	var tel = lboxForm.parent().parent().find('input[type="tel"]').val();
	console.log(tel);

  if( !tel ) {
    alert( 'Пожалуйста, введите номер телефона.' );
    return false;
  } 
  else {
    var tel = 'Телефон: ' + tel;
    try {
      $.ajax({
        url: './mail.php',
        type: 'get',
        data: { 
        				site: 'Zapros from Best',
                about: dataBtnText,
                tel: tel 
              },
        success: function( data ){
          console.log( 'Сообщение отправлено. tel: ' + tel);
          alert( 'Поздравляем! Ваша заявка отправлен! Наш менеджер сейчас свяжется с вами' );
          location.replace( 'index.html' );
        }
      });
    }
    catch (e) {
     console.log(e);
    }
  }
  return false;

//}); // end '#callback-form-2'

});