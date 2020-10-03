var lastUpdate = {
  counter: -1
};

$(document).ready(function() {
  var longPress = {};
  var resultArea = $(".screen");
  $(".phone-body").find(".btn")
    .mouseup(function(event) {
      var button_pressed = $(event.currentTarget).data("value");
      if (longPress.is) {
        resultArea.val(resultArea.val() + button_pressed);
        longPress = {};
      } else {        
        resultArea.val(t9(resultArea.val(), button_pressed));
      }
      clearTimeout(longPress.timer);
    })
    .mousedown(function(event) {
      longPress.timer = setTimeout(function() {
        longPress.is = true;
      }, 500);
    });
})

function t9(text, button_pressed) {
  var toEmbedText = '';
  var currentTime = Date.now();
  var toEmbedText = getEmbedText(button_pressed);
  var shouldChange = function() {
    return lastUpdate.now && currentTime - lastUpdate.now < 500 && lastUpdate.button_pressed === button_pressed && !isNonAlpha(button_pressed);
  }
  if (shouldChange()) {
    text = text.slice(0, -1);
    if ((lastUpdate.counter && lastUpdate.counter > 3) || !toEmbedText[lastUpdate.counter]) {
      lastUpdate.counter = -1;
    }
    lastUpdate.counter++;
  } else {
    lastUpdate.counter = 0;
  }

  lastUpdate.now = currentTime;
  lastUpdate.button_pressed = button_pressed;

  return (text + (toEmbedText[lastUpdate.counter] || toEmbedText[0]));
}

// Sets based on pressed button 
// instead of directly fetching from dom
function getEmbedText(button_pressed) {
  var toEmbedText;
  switch (button_pressed) {
    case 1:
      toEmbedText = '.,!';
      break;
    case 2:
      toEmbedText = 'abc';
      break;
    case 3:
      toEmbedText = 'def';
      break;
    case 4:
      toEmbedText = 'ghi';
      break;
    case 5:
      toEmbedText = 'jkl';
      break;
    case 6:
      toEmbedText = 'mno';
      break;
    case 7:
      toEmbedText = 'pqrs';
      break;
    case 8:
      toEmbedText = 'tuv';
      break;
    case 9:
      toEmbedText = 'wxyz';
      break;
    case '*':
      toEmbedText = '*';
      break;
    case 0:
      toEmbedText = '0';
      break;
    case '#':
      toEmbedText = '#';
      break;
  }
  return toEmbedText;
}

function isNonAlpha(button_pressed) {
  return button_pressed === '*' || button_pressed === 0 || button_pressed === '#';
}