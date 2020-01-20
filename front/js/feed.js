// for icons
feather.replace();

//action Btns
let actionsElem = document.querySelectorAll('.actionsElem');

for (let i=0; i<actionsElem.length; i++){
  actionsElem[i].addEventListener('click', function(event){

    let btnId = event.target.id;

    switch (btnId) {
      case 'heartBtn':
      btn = document.getElementById('heartBtn');
      btn.classList.toggle('fillBtn');
      // console.log(btn);
      // document.querySelector('#heartBtn').style.fill = '#fd1d1d';
        break;
      case 'sendIcon':
      console.log("send");
        break;
      case 'heartBtnMultPos':
      document.querySelector('#heartBtnMultPos').style.fill = '#fd1d1d';
        break;
      case 'sendIconMultPost':
      console.log("send");
        break;
    }
  });
}

//moreBtn hide
let moreInfBtn = document.querySelectorAll('.moreBtnPostCom');

for (var i = 0; i < moreInfBtn.length; i++) {
  moreInfBtn[i].addEventListener('click', (event)=>{
  let btnClass = event.target.style.display = 'none';
  });
}

//checking
const checkifLoggedIn = () => {
    let token = localStorage.getItem('x-auth');
    // console.log(token)
    if (!token) {
        window.location.href = "../front/login.html";
    }
};
checkifLoggedIn();

//TEST bandau priskirti userName is dattos emaila
let nameTag = document.getElementById('userNameTag');
let token = localStorage.getItem('x-auth');

nameTag.innerHTML = '';

fetch('http://localhost:3000/api/v1/user/getAllUsers',{
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
  }).then((myJson) => {
    for (let i = 0; i < myJson.length; i++){
      let p = document.createElement('p')
      nameTag.textContent = myJson[i].username
    }
  }).catch((e) => {
      console.log(e);
  })
