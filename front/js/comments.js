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

const userNameTag = document.getElementById('userNameTag')
let token = localStorage.getItem('x-auth');
    let activeUserId = localStorage.getItem('activeUserId');
fetch(`http://localhost:3000/api/v1/user/getSingleUser/${activeUserId}`, {
    method: 'GET',
    headers: {
        'x-auth': token,
        'Content-Type': 'application/json'
    }
}).then((response) => {
    if (!response.ok) {
        throw Error(response);
    }
    return response.json();

}).then((userFound) => {
  userProfPicSml.setAttribute('src', userFound.profilePicURL)
})
