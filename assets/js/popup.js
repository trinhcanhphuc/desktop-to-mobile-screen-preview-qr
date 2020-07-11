var fore_bg;
var back_bg;
var img_size;
var is_transparnet_bg;

// init extension
$(function () {
  img_size = 300;
  getCurrentTabUrl().then((current_url) => {
    generateQRCodeByURL(current_url);
  });
  QRCodeTextElement().focus().select();

  $('#btn_save_qr').click(() => saveQRCode());
});

// trigger element handling
QRCodeTextElement().on('keydown keyup input contextmenu', function (e) {
  generateQRCode();
});

selectInputType().change((e) => {
  generateQRCode(e.target.value);
  QRCodeTextElement().val('');
  QRCodeTextElement().focus().select();
});

// get elements
function selectInputType() {
  return $('#select-input-type');
}

function QRCodeTextElement() {
  return $('#qrcode-text');
}

function QRCodeImageElement() {
  return $('#qrcode-img');
}

// functions
function generateQRCode(generate_type) {
  var generate_type = generate_type ? generate_type : selectInputType().val();
  var input_value = QRCodeTextElement().val();
  switch(generate_type){
    case 'url':
      generateQRCodeByURL(input_value);
      break;
    case 'text':
      generateQRCodeByText(input_value);
      break;
    case 'phone':
      generateQRCodeByPhone(input_value);
      break;
  }
}

function generateQRCodeByURL(url) {
  var qr_img_ele = QRCodeImageElement();
  qr_img_ele.html('');
  renderQR(qr_img_ele, img_size, url);
  QRCodeTextElement().val(url);
}

function generateQRCodeByText(text) {
  generateQRCodeByURL(text);
}

function generateQRCodeByPhone(phone) {
  generateQRCodeByURL(phone);
}

function saveQRCode() {
  var qr_tag = document.createElement('a');
  qr_tag.href = QRCodeImageElement().find('img')[0].src;
  qr_tag.download = 'qr_code.png';
  qr_tag.click();
}
