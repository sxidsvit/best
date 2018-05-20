$( document ).ready( function() {

// !!!!!!!!!!!!!!!! NEXT QUESTION !!!!!!!!!!!!!!!! //

// GET ELEMENT
var question = $( 'question' ),
    questionCounter = 1;
    console.log('questionCounter = ' + questionCounter);

// HIDE BLOCK
function hideBlock() {
  $( '.visible' ).fadeOut( 10 ).removeClass( 'visible' );
}

// SHOW BLOCK
function showBlock() {
  questionCounter ++;
  console.log('Сейчас questionCounter = ' + questionCounter );
  $('.question').fadeOut( 2000 ).removeClass('visible');

  if (area == 'Москва' && questionCounter == 2) {
    district = null; residential = null;
    $( '.question-2b').fadeIn( 2000 ).addClass( 'visible' );
  }
  if (area == 'область' && questionCounter == 2) {
    district = null; residential = null;
    $( '.question-2a').fadeIn( 2000 ).addClass( 'visible' );
  }
  if  (questionCounter > 2)
  $( '.question-' + questionCounter ).fadeIn( 900 ).addClass( 'visible' );
}

function stepBack(){
  questionCounter --;
   console.log('Сейчас questionCounter = ' + questionCounter );
  $('.question').fadeOut( 2000 ).removeClass('visible');

  if (area == 'Москва' && questionCounter == 2) {
    district = ''; residential = '';
    $( '.question-2b').addClass( 'visible' ).fadeIn( 1000 );
  }
  if (area == 'область' && questionCounter == 2) {
    district = ''; residential = '';
    $( '.question-2a').addClass( 'visible' ).fadeIn( 1000 );
  }
  if  (questionCounter > 2 || questionCounter == 1)
  $( '.question-' + questionCounter ).fadeIn( 900 ).addClass( 'visible' );
}

// !!!!!!!!!!!!!!!! ANIMATION !!!!!!!!!!!!!!!! //

// CHANGE INPUTS 

var yellow = '#f0cb38',
		border_color ='#f0f0f0', 
    border_color_darken = '#a4a4a4',
		label_bg_color ='transparent';
		
function changeState(clicked) {

  // -- unblock the buttons with class step-worfard
  clicked.parent().parent().parent().parent().parent().find( '.step-forward'  ).data("notactive", "false").removeClass( 'notactive' );

  // -- manipulation with  state of radio buttons

  var displayAttr = clicked.find('input:checkbox').prop( 'checked');
  // console.log('displayAttr до клика : ' + displayAttr);
  clicked.find( 'input:checkbox' ).toggle(displayAttr);

  if ( displayAttr === false ) {
     clicked.find( 'input:checkbox' ).prop( 'checked', true );
		 clicked.css('background-color', yellow);
		 clicked.css('border-color', yellow);
     displayAttr = true;
  } 
  else if ( displayAttr === true ) {
    clicked.find( 'input:checkbox' ).prop( 'checked', false);
		clicked.find(' input[type="checkbox"] ').attr( 'style', 'display:none' );
		clicked.css('background-color', label_bg_color);
		clicked.css('border-color',  border_color );
    displayAttr = false;
  }
  //console.log('displayAttr после клика : ' + displayAttr);
}

// COLLECTING QUIZZ RESULTS
var area, location, residential, district, infrastructure, rooms, decoration, budjet, purchase;

function resultsCollecting() {
  // -- collect all the marked inputs and put them into an array  --

  location = 'РАСПОЛОЖЕНИЕ ? - ' + area;
  // ----------------------------------------------------------------

  var boxes = $(' input[type="checkbox"].residential:checked '); 
  var count = 0;
  residential = "ГЕОГРАФИЧЕСКОЕ РАСПОЛОЖЕНИЕ ? - ";
  for (var i=0;  i<boxes.length; i++ )
    {
      if( $(boxes[i]).prop('checked')) {
        residential += $(boxes[i]).val() + '|';
        count ++;
      }
     }
  if (count == 0) {residential += ""}
  // ----------------------------------------------------------------

  var boxes = $(' input[type="checkbox"].district:checked '); 
  var count = 0;
  district = "РАЙОН МОСКВЫ ? - ";
  for (var i=0;  i<boxes.length; i++ )
    {
      if( $(boxes[i]).prop('checked')) {
        district += $(boxes[i]).val() + '|';
        count ++;
      }
     }
  if (count == 0) {district += ""}
  // ----------------------------------------------------------------

  var boxes = $(' input[type="checkbox"].infrastructure:checked '); 
  var count = 0;
  infrastructure = "ИНФРАСТРУКТУРА? - ";
  for (var i=0;  i<boxes.length; i++ )
    {
      if( $(boxes[i]).prop('checked')) {
        infrastructure += $(boxes[i]).val() + '|';
        count ++;
      }
     }
  if (count == 0) {infrastructure += ""}
  // ----------------------------------------------------------------

  var boxes = $(' input[type="checkbox"].rooms:checked '); 
  var count = 0;
  rooms = "КОЛИЧЕСТВО КОМНАТ? - ";
  for (var i=0;  i<boxes.length; i++ )
    {
      if( $(boxes[i]).prop('checked')) {
        rooms += $(boxes[i]).val() + '|';
        count ++;
      }
     }
  if (count == 0) {rooms += ""}
  // ----------------------------------------------------------------

  var boxes = $(' input[type="checkbox"].decoration:checked '); 
  var count = 0;
  decoration = "НАЛИЧИЕ ОТДЕЛКИ? - ";
  for (var i=0;  i<boxes.length; i++ )
    {
      if( $(boxes[i]).prop('checked')) {
        decoration += $(boxes[i]).val() + '|';
        count ++;
      }
     }
  if (count == 0) {decoration += ""}
  // ----------------------------------------------------------------

  var boxes = $(' input[type="checkbox"].budjet:checked '); 
  var count = 0;
  budjet = "БЮДЖЕТ НА ПОКУПКУ КВАРТИРЫ? - ";
  for (var i=0;  i<boxes.length; i++ )
    {
      if( $(boxes[i]).prop('checked')) {
        budjet += $(boxes[i]).val() + '|';
        count ++;
      }
     }
  if (count == 0) {budjet += ""}
  // ----------------------------------------------------------------

  var boxes = $(' input[type="checkbox"].purchase:checked '); 
  var count = 0;
  purchase = "СПОСОБ ПОКУПКИ? - ";
  for (var i=0;  i<boxes.length; i++ )
    {
      if( $(boxes[i]).prop('checked')) {
        purchase += $(boxes[i]).val() + '|';
        count ++;
      }
     }
  if (count == 0) {purchase += ""}
  // ----------------------------------------------------------------
  console.log( 'location : ' +  location);
  console.log( 'residential : ' + residential );
  console.log( 'district : ' + district );
  console.log( 'infrastructure : ' + infrastructure );
  console.log( 'rooms : ' + rooms );
  console.log( 'decoration : ' + decoration );
  console.log( 'budjet : ' + budjet );
  console.log( 'purchase : ' + purchase );
}

// Click ON THE LABEL ANSWER-TEXT

$('.location').click( function() {
  var clicked = $(this); 
  area = clicked.data('area');
  if (area == 'Москва') {
    $('.location').each( function() {
       $(this).css('background-color', label_bg_color);
       $(this).css('border-color', border_color_darken);
    });
    clicked.css('background-color', yellow);
    clicked.css('border-color', yellow);
    console.log('area : ' + area);
  }
  else { 
    $('.location').each( function() {
      $(this).css('background-color', label_bg_color);
      $(this).css('border-color', border_color_darken);
    });
    clicked.css('background-color', yellow);
    clicked.css('border-color', yellow);
    console.log('area - : ' + area); 
  }
  $('.question-1').find( '.step-forward'  ).data("notactive", "false").removeClass( 'notactive' );
  resultsCollecting();
})

$( 'label.answer-text' ).click( function() {
  var clicked = $(this);
  changeState(clicked);
  resultsCollecting();
  return false;
});

// Click on the button STEP-FORWARD 
$( '.step-forward' ).click( function() {
  var elem = $(this).data('notactive');
  console.log(elem);
  if ( elem == 'false' ) { 
      console.log(' Значение data(notactive) - false');
      setTimeout( function() {
      hideBlock();
      showBlock ();
    }, 300 );
    return false; 
  }
    if ( elem == 'true' ) {
    console.log(' Значение data(notactive) - true');
     return false; 
  }
});

// Click on the button STEP-BACK
$( '.step-back' ).click(function() {
    setTimeout( function() {
    hideBlock();
    stepBack();
   }, 300 );
  return false;
});

// SUBMIT FORM DATA

$( '#callback-form-2' ).submit( function(){
  if( !$( 'input[type="tel"].tel' ).val() ){
    alert( 'Пожалуйста, введите номер телефона.' );
    return false;
  } 
  else {
    var tel = 'Телефон: ' + $( 'input[type="tel"].tel' ).val();
    try {
      $.ajax({
        url: './mail.php',
        type: 'get',
        data: { 
                location: location,
                residential : residential,
                district : district,
                infrastructure : infrastructure,
                rooms :  rooms,
                decoration :  decoration,
                budjet :  budjet,
                purchase : purchase,
                tel: tel 
              },
        success: function( data ){
          console.log( 'Сообщение отправлено' );
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
});

}); // end $( document ).ready( function() {