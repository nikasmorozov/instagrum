// for icons
feather.replace();

// action Btns
// let actionsElem = [...document.querySelectorAll('.actionsElem')];
// console.log(actionsElem)

// for (let i=0; i<actionsElem.length; i++){
//   actionsElem[i].addEventListener('click', function(event){

//     let btnId = event.target.id;
//     console.log(btnId)

//     switch (btnId) {
//       case 'heartBtn':
//       btn = document.getElementById('heartBtn');
//       btn.classList.toggle('fillBtn');
//       console.log(btn);
//       document.querySelector('#heartBtn').style.fill = '#fd1d1d';
//         break;
//       case 'sendIcon':
//       console.log("send");
//         break;
//       case 'heartBtnMultPos':
//       document.querySelector('#heartBtnMultPos').style.fill = '#fd1d1d';
//         break;
//       case 'sendIconMultPost':
//       console.log("send");
//         break;
//     }
//   });
// };

//moreBtn hide
let moreInfBtn = document.querySelectorAll(".moreBtnPostCom");

for (var i = 0; i < moreInfBtn.length; i++) {
  moreInfBtn[i].addEventListener("click", event => {
    let btnClass = (event.target.style.display = "none");
  });
}

//checking
const checkifLoggedIn = () => {
  let token = localStorage.getItem("x-auth");
  // console.log(token)
  if (!token) {
    window.location.href = "../front/login.html";
  }
};
checkifLoggedIn();

//TEST bandau priskirti userName is dattos emaila
// let nameTag = document.getElementById('userNameTag');
// let token = localStorage.getItem('x-auth');
//
// nameTag.innerHTML = '';
//
// fetch('http://localhost:3000/api/v1/user/getAllUsers',{
//   method: 'GET',
//   headers: {
//       'x-auth': token,
//       'Content-Type': 'application/json'
//   }
//   }).then((response) => {
//
//       if (!response.ok) {
//           throw Error(response);
//       }
//       return response.json();
//   }).then((myJson) => {
//     for (let i = 0; i < myJson.length; i++){
//       //userName
//       let name = document.createElement('p')
//       nameTag.textContent = myJson[i].username
//     }
//   }).catch((e) => {
//       console.log(e);
//   })

//su img ?

const createElements = () => {
  let postsCont = document.getElementById("postsCont");
  let token = localStorage.getItem("x-auth");
  // let activeUserId = localStorage.getItem('activeUserId')

  postsCont.innerHTML = "";

  fetch("http://localhost:3000/api/v1/posts/getAllPosts", {
    method: "GET",
    headers: {
      "x-auth": token,
      "Content-Type": "application/json"
    }
  })
    .then(response => {
      if (!response.ok) {
        throw Error(response);
      }
      return response.json();
    })
      .then(myJson => {
        console.log(myJson);
        
      let postsCont = document.getElementById("postsCont");
      postsCont.innerHTML = "";

      for (let i = 0; i < myJson.length; i++) {
        //konteineriai
        let onePost = document.createElement("div");
        onePost.classList.add("container", "fullWidthCnt", "onePost");

        let userInfoCnt = document.createElement("div");
        userInfoCnt.classList.add(
          "container-fluid",
          "d-flex",
          "justify-content-between",
          "align-items-center",
          "userInfoCnt"
        );

        //cnt userInfo
        //   console.log(myJson[2].user[0].username);

        let userInfo = document.createElement("div");
        const profileImg = document.createElement("img");
        profileImg.classList.add(
          "rounded-circle",
          "img-fluid",
          "userProfPicSml"
        );
        if (myJson[i].user[0].profilePicURL) {
          profileImg.setAttribute(
            "src",
            myJson[i].user[0].profilePicURL
          );
        } else {
          profileImg.setAttribute(
            "src",
            "https://www.w3schools.com/w3css/img_avatar3.png"
          );
        }
        let userName = document.createElement("span");
        userName.classList.add("font-weight-bold", "userName");
        userName.setAttribute("id", "userNameTag");
        userName.textContent = myJson[i].user[0].username;
        let moreIcn = document.createElement("i");
        moreIcn.setAttribute("data-feather", "more-horizontal");

        //cnt userPost
        let userPostContentCnt = document.createElement("div");
        userPostContentCnt.classList.add(
          "container-fluid",
          "fullWidthCnt",
          "userPostContentCnt"
        );
        userPostContentCnt.setAttribute("id", "userPost");

        const postImg = document.createElement("img");
        postImg.classList.add("img-fluid", "postImage");
        postImg.setAttribute("src", myJson[i].imageURL);

        let postActionsCnt = document.createElement("div");
        postActionsCnt.classList.add("container-fluid", "postActionsCnt");

        let actionsCnt = document.createElement("div");
        actionsCnt.classList.add("actionsCnt");

        let actionsElem = document.createElement("span");
        actionsElem.classList.add("actionsElem");
        let likeBtn = document.createElement("i");
        likeBtn.setAttribute("data-feather", "heart");
        likeBtn.setAttribute("id", "heartBtn");
        likeBtn.classList.add("actionBtn");

        likeBtn.addEventListener("click", () => {
          toggleLike(myJson[i]._id);
          console.log("like");
        });

        let actionsElemLink = document.createElement("a");
        actionsElemLink.classList.add("actionsElemLink");
        actionsElemLink.addEventListener("click", () => {
          window.location.href = "../front/comments.html";
        });
        let chatIcn = document.createElement("i");
        chatIcn.setAttribute("data-feather", "message-circle");
        chatIcn.classList.add("messageCircle");

        let actionsElemTwo = document.createElement("span");
        actionsElemTwo.classList.add("actionsElem");
        let sendBtn = document.createElement("i");
        sendBtn.setAttribute("data-feather", "send");
        sendBtn.setAttribute("id", "sendIcon");
        sendBtn.classList.add("actionBtn");

        // cnt postComsAndLikesCnt
        let postComsAndLikesCnt = document.createElement("div");
        postComsAndLikesCnt.classList.add(
          "container-fluid",
          "postComsAndLikesCnt"
        );

        let userPostCom = document.createElement("div");
        userPostCom.classList.add("userPostCom");

        // let userNameComment = document.createElement('p')
        // userNameComment.classList.add('font-weight-bold', 'postLikes')

        let userNameComment = document.createElement("span");
        userNameComment.classList.add("font-weight-bold", "userName");
        userNameComment.setAttribute("id", "userNameTag");

        userNameComment.textContent = myJson[i].user[0].username;
        let comment = document.createElement("span");
        comment.classList.add("userCommTxt");
        comment.setAttribute("id", "comment");
        comment.textContent = myJson[i].title;

        //main append
        postsCont.appendChild(onePost);
        onePost.appendChild(userInfoCnt);
        //user info append
        userInfoCnt.appendChild(userInfo);
        userInfo.appendChild(profileImg);
        userInfo.appendChild(userName);
        userInfoCnt.appendChild(moreIcn);

        //userPost append
        onePost.appendChild(userPostContentCnt);
        userPostContentCnt.appendChild(postImg);
        userPostContentCnt.appendChild(postActionsCnt);
        postActionsCnt.appendChild(actionsCnt);
        //userPost icons
        actionsCnt.appendChild(actionsElem);
        actionsElem.appendChild(likeBtn);
        actionsCnt.appendChild(actionsElemLink);
        actionsElemLink.appendChild(chatIcn);
        actionsCnt.appendChild(actionsElemTwo);
        actionsElemTwo.appendChild(sendBtn);

        //postComsAndLikesCnt append
        onePost.appendChild(postComsAndLikesCnt);
        postComsAndLikesCnt.appendChild(userPostCom);
        userPostCom.appendChild(userNameComment);
        userPostCom.appendChild(comment);

        //ikonoms
        feather.replace();
      }
    })
    .catch(e => {
      console.log(e);
    });
};
createElements();

const toggleLike = (id, li) => {
  let token = localStorage.getItem("x-auth");

  console.log("like");

  fetch(`http://localhost:3000/api/v1/posts/togglelike/${id}`, {
    method: "PATCH",
    headers: {
      "x-auth": token,
      "Content-Type": "application/json"
    }
  })
    .then(response => {
      li.classList.toggle("list-group-item-success");

      if (!response.ok) {
        throw Error(response);
      }
      return response.json();
    })
    .then(myJson => {
      createElements();
    })
    .catch(e => {
      console.log(e);
      alert("toggle failed");
    });
};

const showLikes = id => {
  let token = localStorage.getItem("x-auth");

  fetch(`http://localhost:3000/api/v1/posts/getLikesUsers/${id}`, {
    method: "GET",
    headers: {
      "x-auth": token,
      "Content-Type": "application/json"
    }
  })
    .then(response => {
      if (!response.ok) {
        throw Error(response);
      }
      return response.json();
    })
    .then(myJson => {
      for (let i = 0; i < myJson.length; i++) {
        //   console.log(myJson[i].user[0].username)
      }
    })
    .catch(e => {
      console.log(e);
    });
};
