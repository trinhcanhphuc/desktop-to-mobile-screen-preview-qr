function getFacebookShareUrl(current_url) {
  var fb_share_url = 'http://www.facebook.com/sharer.php?u=';
  return fb_share_url + current_url;
}

function getPinterestShareUrl(current_url) {
  var pinterest_share_url = 'https://www.pinterest.com/pin/create/button/?url=';
  return pinterest_share_url + current_url;  
}
