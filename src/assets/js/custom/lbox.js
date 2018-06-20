var dataBtnText, md;

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

// Вместо quizz на md и ниже экранах
	$('#quizz-md').click(function(e) {
		if (  window.innerWidth <= md ) {
			e.preventDefault();
			dataBtnText = $(this).data('btn_text');
			var element = 'white-lbox';
			formСustomization(element, dataBtnText);
		}
	});

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

 // Проверка чекнутости инпута у кнопки отправки
  
 function checking(e) {
 	e.each(function(){
    var $form = $(this);
    //$form.find('button[type="submit"]').prop('disabled', true);
    if( $form.find('input[type="checkbox"]').is(':checked') ) {
      $form.find('button[type="submit"]').prop('disabled', false);
    } else {
      $form.find('button[type="submit"]').prop('disabled', true);
    }
    $form.find('input[type="checkbox"]').click(function(){
      if( $(this).is(':checked') ) {
        $(this).parents().find('button[type="submit"]').prop('disabled', false);
      } else {
        $(this).parent().find('button[type="submit"]').prop('disabled', true);
      }
    });
  });
 };

checking ($('#callback-form'));
checking ($('#callback-form-lbox'));
checking ($('#callback-form-lbox2'));

// Отправка формы 


function clickSubmit(elem) {
	// var th = elem;
	// console.log('th : ' + th[0]);
	var lboxForm = elem.parent();
	lboxForm.prepend('<input type = "hidden"  name = "Zapros from Best"></input>');
 	lboxForm.children('[name = "Zapros from Best"]').attr('value', dataBtnText); 

	var inputTel = lboxForm.parent().parent().find('input[type="tel"]');
	var tel = inputTel.val();
	console.log('tel : ',tel); console.log('inputTel : ',inputTel); 

  if( !tel ) {
    inputTel.addClass('error');
    alert( 'Пожалуйста, введите номер телефона.' );
    return false;
  } 
  else {
    var tel = 'Телефон: ' + tel;
    inputTel.removeClass('error');
    inputTel.addClass('done');
    try {
      $.ajax({
        url: 'http://ad.lekua.in.ua/mails/mail-best.php',
        type: 'get',
        data: { 
        				site: 'Zapros from Best',
                about: dataBtnText,
                tel: tel 
              },
        success: function( data ){
        	inputTel.removeClass('done');
    			inputTel.addClass('vis');
    			elem.trigger('reset');
          console.log( 'Сообщение отправлено. tel: ' + tel);
          alert( 'Поздравляем! Ваша заявка отправлен! Наш менеджер сейчас свяжется с вами' );
          location.replace( 'index.html' );
        }
      });
    }
    catch (e) {
     console.log(e);
    }
  }  // endelse
  return false;
} ; //end clickSubmit


$('.lbox button').click( function(e) { 
  e.preventDefault();
	var elem = $(this);
	console.log('e : ' + elem);
	clickSubmit(elem);
});

$('.s-forma button').click( function(e) { 
  e.preventDefault();
	var elem = $(this);
	console.log('e : ' + elem);
	clickSubmit(elem); 
});

// end click(function(e)