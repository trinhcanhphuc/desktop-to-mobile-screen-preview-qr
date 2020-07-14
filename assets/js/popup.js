var fore_bg;
var back_bg;
var img_size;
var is_transparnet_bg;
var select_input_type = 'url';
const PHONE_NUMER_PATTERN = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;

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
QRCodeTextElement().on('input', function (e) {
  var text_error_ele = $('#input-error');
  if (select_input_type === 'phone' && PHONE_NUMER_PATTERN.test(QRCodeTextElement().val()) == false)
    text_error_ele.show();
  else
    text_error_ele.hide();

  generateQRCode();
});

selectInputType().change((e) => {
  $('#input-error').hide();
  select_input_type = e.target.value;
  generateQRCode(select_input_type);
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

function renderQR($el, the_size, the_text) {
  var quiet = '0';
  if (back_bg != '#ffffff') {
    quiet = '1';
  }
  if (is_transparnet_bg) {
    back_bg = null;
  }
  $el.qrcode(qrObjectBuilder(the_size, fore_bg, the_text, back_bg, quiet));
}

function qrObjectBuilder(s, f, t, b, q, c) {
  var r = 'image';
  if (c) {
    r = 'canvas';
  }
  var o = {
    render: r,
    size: s,
    fill: f,
    text: t,
    background: b,
    quiet: q,
  };
  o.ecLevel = 'L';
  return o;
}
