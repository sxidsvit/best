$( document ).ready( function() {

// ! CHANGE QUESTION NUMBER

var num = 0,
    questionNumber = $( 'span.progress-number' );

function numberUp() {
  num ++;
  questionNumber.text( num ); 
}

function numberDown() {
  num --;
  questionNumber.text( num ); 
}

// !!!!!!!!!!!!!!!! NEXT QUESTION !!!!!!!!!!!!!!!! //

// GET ELEMENT
var question = $( 'question' ),
    questionCounter = 1;

// HIDE BLOCK
function hideBlock() {
  $( '.visible' ).fadeOut( 10 ).removeClass( 'visible' );
}

// SHOW BLOCK
function showBlock() {
  questionCounter ++;
  $( '.question-' + questionCounter ).fadeIn( 900 ).addClass( 'visible' );
}

// STEP BACK
function stepBack(){
  questionCounter --;
  $( '.question-' + questionCounter ).fadeIn( 900 ).addClass( 'visible' );
}

// !!!!!!!!!!!!!!!! ANIMATION !!!!!!!!!!!!!!!! //


// DISABLE THE BUTTON
function buttonOff() {
  $( 'button.next' ).attr( 'disabled', 'disabled' );
}

// CHANGE DECORATION PICTURES
function swapPicture() {
  if ( $( '.question-1' ).hasClass('visible') ) {
    $( '.bg-img' ).fadeOut( 800 ).css( 'display', 'none' );
    $( '#yellow' ).fadeIn( 800 ).css( 'display', 'inline-block' );
    $( '#blocks' ).fadeIn( 800 ).css( 'display', 'inline-block' );
  } else if ( $( '.question-2' ).hasClass('visible') ) {
    $( '.bg-img' ).fadeOut( 800 ).css( 'display', 'none' );
    $( '#horznt' ).fadeIn( 800 ).css( 'display', 'inline-block' );
    $( '#roulet' ).fadeIn( 800 ).css( 'display', 'inline-block' );
  } else if ( $( '.question-3' ).hasClass('visible') ) {
    $( '.bg-img' ).fadeOut( 800 ).css( 'display', 'none' ); 
    $( '#heater' ).fadeIn( 800 ).css( 'display', 'inline-block' );
  }
}

// CHANGE INPUTS 

var yellow = '#f0cb38',
		border_color ='#f0f0f0', 
		label_bg_color ='transparent';
		
function changeState(clicked) {

  // -- unblock the buttons with class step-worfard
  clicked.parent().parent().parent().parent().parent().find( '.step-forward'  ).removeClass( 'notactive' );

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
var location, residential, district, infrastructure, rooms, decoration, budjet, purchase;

function resultsCollecting() {
  // -- collect all the marked inputs and put them into an array  --

  var boxes = $(' input[type="checkbox"].residential:checked '); 
  var count = 0;
  residential = "КАКОЕ РАСПОЛОЖЕНИЕ ЖИЛОГО КОМПЛЕКСА РАССМАТРИВАЕТЕ? - ";
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
  district = "КАКОЕ РАСПОЛОЖЕНИЕ ЖИЛОГО КОМПЛЕКСА РАССМАТРИВАЕТЕ? - ";
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
  infrastructure = "КАКОЕ РАСПОЛОЖЕНИЕ ЖИЛОГО КОМПЛЕКСА РАССМАТРИВАЕТЕ? - ";
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

  console.log( 'residential : ' + residential );
  console.log( 'district : ' + district );
  console.log( 'infrastructure : ' + infrastructure );
  console.log( 'rooms : ' + rooms );
  console.log( 'decoration : ' + decoration );
}

// Click ON THE LABEL ANSWER-TEXT

$( 'label.answer-text' ).click( function() {
  var clicked = $(this);
  changeState(clicked);
  resultsCollecting();
  return false;
});


// Click on the button STEP-FORWARD 
$( 'button.step-forward' ).click( function() {
  setTimeout( function() {
    hideBlock();
    numberUp ();
    buttonOff();
    showBlock ();
    swapPicture();
  }, 300 );

  var lastQuestion = $(this).parent().hasClass('question-3');
  if ( lastQuestion ) {
    // console.log( ' Секция с третим вопросом ');
    $( '.questions-frame.simple' ).fadeOut( 10 );
    $( '.question-3' ).delay( 400 ).removeClass( 'visible' );
    $( '.progress' ).css( 'display', 'none' );
    $( '.questions-frame.final'  ).delay( 400 ).fadeIn ( 600 );
    $( '.bg-img' ).fadeOut( 600 ).css( 'display', 'none' );
    $( '#vasyan' ).fadeIn( 900 ).css( 'display', 'inline-block' );
    discountSpan.text( '10%' ).fadeIn( 600 );
  }
  return false;
});

// Click on the button STEP-BACK
$( 'button.step-back' ).click(function() {
  setTimeout( function() {
   numberDown();
   hideBlock();
   stepBack();
   swapPicture();
  }, 300 );

  return false;
});

// SUBMIT FORM DATA

$( '#form' ).submit( function(){
  if( !$( 'input.tel' ).val() ){
    alert( 'Пожалуйста, введите номер телефона.' );
    return false;
  } 
  else {
    var tel = 'Телефон: ' + $( 'input.tel' ).val();
    try {
      $.ajax({
        url: './mail.php',
        type: 'get',
        data: { 
                livingPlace: livingPlace,
                square: square,
                additional: additional,
                tel: tel 
              },
        success: function( data ){
          console.log( 'Сообщение отправлено' );
          alert( 'Поздравляем! Вы получили скидку!' );
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