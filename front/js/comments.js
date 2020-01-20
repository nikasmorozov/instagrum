// for icons
feather.replace();

//auto expand comment bubble
var textarea = document.querySelector('textarea');
textarea.addEventListener('keydown', autosize);
function autosize(){
  var el = this;
  setTimeout(function(){
    el.style.cssText = 'height:auto; padding:10px';
    el.style.cssText = 'height:' + el.scrollHeight + 'px';
  },0);
}
