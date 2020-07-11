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
