function getTextFromClipboard(text) {
  navigator.clipboard.readText()
  .then(text => {
    console.log('Pasted content: ', text);
  })
  .catch(err => {
    console.error('Failed to read clipboard contents: ', err);
  });
}

function copyTextToClipboard(text) {
  var textEle = document.createElement('textarea');
  textEle.textContent = text;
  document.body.appendChild(textEle);
  textEle.select();
  document.execCommand('copy');
  textEle.blur();
  document.body.removeChild(textEle);
}

function copyImage(url){
  var img = document.createElement('img');
  img.src = url;
  document.body.appendChild(img);
  var r = document.createRange();
  r.setStartBefore(img);
  r.setEndAfter(img);
  r.selectNode(img);
  var selection = window.getSelection();
  selection.addRange(r);
  document.execCommand('copy');
}
