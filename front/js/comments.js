// for icons
feather.replace();

document.addEventListener("DOMContentLoaded", () =>{
  getCommentsByPostId(queryToJSON().id)
});

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

const addComment = () => {
  let token = localStorage.getItem('x-auth');
  let comment = document.getElementById("userComment").value
  let body = {
      comment: comment,
      postId: queryToJSON().id
  }
  document.getElementById("userComment").value = ""
  document.getElementById("userComment").style.height = "auto"
  fetch(`http://localhost:3000/api/v1/comments/addComment`, {
      method: 'POST',
      headers: {
          'x-auth': token,
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
  }).then((response) => {
      if (!response.ok) {
          throw Error(response);
      }
      return response.json();
  }).then((myJson) => {
    //console.log(myJson._id)
    getCommentsByPostId(myJson._id)
  }).catch((e) => {
      console.log(e);
  });
};

const getCommentsByPostId = (id) => {
  let token = localStorage.getItem('x-auth');
  fetch(`http://localhost:3000/api/v1/comments/getCommentsByPostId/${id}`, {
      method: 'GET',
      headers: {
          'x-auth': token,
          'Content-Type': 'application/json'
      },
  }).then((response) => {
      if (!response.ok) {
          throw Error(response);
      }
      return response.json();
  }).then((myJson) => {
      console.log(myJson)
      let commentDiv = document.getElementById("comments")
      commentDiv.innerHTML = ''
      myJson.forEach(val =>{
        drawComments(val)
      })
  }).catch((e) => {
      console.log(e);
  });
};

function drawComments(val){
  let commentDiv = document.getElementById("comments")
  commentDiv.classList.add(
    "container",
    "d-flex",
    "flex-column",
    "justify-content-center",
    "align-items-start",
  );

  let hr = document.createElement("hr")

  let oneComm = document.createElement("div");
    oneComm.classList.add(
      "container",
      "d-flex",
      "justify-content-start",
      "align-items-center",
      "oneComm"
    );

  //profilio img
  const profileImg = document.createElement("img");
  profileImg.classList.add(
    "rounded-circle",
    "img-fluid",
    "userProfPicSml"
  );
  if (val.user.profilePicURL) {
    profileImg.setAttribute(
      "src",
      val.user.profilePicURL
    );
  }else{
    profileImg.setAttribute(
    "src",
    "https://www.w3schools.com/w3css/img_avatar3.png"
    );
  }

  let nameAndComCnt = document.createElement("div");
  nameAndComCnt.classList.add(
    "container"
  );

  let userName = document.createElement("span");
  userName.classList.add("font-weight-bold", "userName");
  userName.setAttribute("id", "userNameTag");
  userName.textContent = val.user.username+" ";

  let comment = document.createElement('span')
  comment.textContent = val.comment
  comment.classList.add("onePersonComm");

  commentDiv.appendChild(oneComm);
  commentDiv.appendChild(hr);
  oneComm.appendChild(profileImg);
  oneComm.appendChild(nameAndComCnt);
  nameAndComCnt.appendChild(userName);
  nameAndComCnt.appendChild(comment);
}

function queryToJSON() {
  let pairs = location.search.slice(1).split('&');

  let result = {};
  pairs.forEach(function(pair) {
      pair = pair.split('=');
      result[pair[0]] = decodeURIComponent(pair[1] || '');
  });

  return JSON.parse(JSON.stringify(result));
}
