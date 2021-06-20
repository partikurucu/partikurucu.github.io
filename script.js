// Code goes here

// Code goes here

var initials = ['Cumhuriyet', 'Cumhuriyetçi', 'Sosyal Demokrat', 'Özgürlükçü', 'Sosyal', 'Halkçı', 'Gelecek', 'Milliyetçi', 'Muhafazakar', 'Komünist', 'Yenilik', 'Güzellik', 'Gelenekçi', 'Güzellikçi', 'İyi', 'Ak', 'Siyah', 'Kırmızı', 'Mavi', 'Kızıl', 'İşçi', 'Refah', 'Yoldaş', 'Mutlu', 'Türk', 'Tüm', 'Bağımsızlık', 'Dünya', 'Liberal', 'Demokrat', 'Manevi', 'Milli', 'Büyük', 'Yeniden', 'Halkın'];
var nucleii = [' Ve Demokratik', ' Bir', ' Kalkınma', ' Liberter', ' Yükseliş', ' Diriliş', ' Gelişim', ' İlerici', ' Ekonomi', ' Vatansever', ' İttihat', ' Yurt', ' Vatan', ' Proleter', ' İşçi', '  Yürek', ' Birlik', ' Vatan', ' Toplum', ' Hürriyet', '' ];
var finals = [' Partisi', ' Fırkası', ' Partisi' ];

function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function phoneme(forceInitial) {
  var config = random(3, 3);
  var target = '';
  if (forceInitial)
    config = config | 1;
  var initial = random(1, initials.length - 1);
  var nucleus = random(1, nucleii.length - 1);
  var final = random(1, finals.length - 1);
  if ((config & 1) == 1)
    target += initials[initial];
  target += nucleii[nucleus];
  if ((config & 1) == 1) {
    target += finals[final];
  }
  return {
    result: config,
    text: target,
  };
}

function correctCase(text) {
  return text.substring(0, 1).toUpperCase() + text.substring(1);
}

function regionName() {
  var count = random(1, 1);
  var force = false;
  var word = '';
  for (var j = 0; j < count || word.length < 1; j++) {
    var result = phoneme(force);
    force = ((result.result & 1) === 0);
    word += result.text;
  }
  word = correctCase(word);
  if (word.length < 5 && random(0, 3) === 0) {
    var secondWord = correctCase(phoneme(false).text);
    word = word + ' ' + secondWord;
  }
  return word;
}


function generateRegion() {
  var quantityString = document.forms.form.quantity.value;
  var numberRegex = new RegExp('^[0-9]+$');
  quantity = 1;
  if (numberRegex.test(quantityString))
    quantity = parseInt(quantityString);
  var output = '';
  for (var i = 0; i < quantity; i++)
    output += regionName() + '<br>';
  document.getElementById('output').innerHTML = output;
}

function generatePeople() {
  var quantityString = document.forms.form.quantity.value;
  var numberRegex = new RegExp('^[0-9]+$');
  quantity = 1;
  if (numberRegex.test(quantityString))
    quantity = parseInt(quantityString);
  var output = '';
  for (var i = 0; i < quantity; i++) {
    var region = regionName();
    output += 'The ' + peopleName(region) + ' people of ' + region + '<br>';
  }
  document.getElementById('output').innerHTML = output;
}
