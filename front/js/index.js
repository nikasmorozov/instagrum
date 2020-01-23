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

        //reikia sutvarkyt

        let actionsElem = document.createElement('span')
        actionsElem.classList.add('actionsElem')
        actionsElem.addEventListener('click', (e) => {
          let btn = document.querySelectorAll('.heart');
          for (var i = 0; i < btn.length; i++) {
            if (btn[i] == event.target) {
              btn[i].classList.toggle('fillBtn')
              toggleLike(myJson[i]._id)
            }
          }
        });
        let likeBtn = document.createElement('i')
        likeBtn.setAttribute("data-feather", "heart");
        likeBtn.setAttribute("id", "heartBtn");
        likeBtn.classList.add('heart')
        likeBtn.classList.add('actionBtn')
        console.log(myJson[i].user[0]._id)
        if (myJson[i].likes.includes(myJson[i].user[0]._id)) {
          likeBtn.classList.add('fillBtn')
        };

<<<<<<< HEAD
        if (!response.ok) {
            throw Error(response);
        }
        return response.json();

    }).then((myJson) => {
        console.log(myJson);
        
        let ul = document.getElementById("list")
        ul.innerHTML = ''
        for (let i = 0; i < myJson.length; i++) {
            let li = document.createElement('li')
            li.classList.add('list-group-item', 'd-flex', 'justify-content-between')
    console.log(activeUserId);
            if (myJson[i].likes.includes(activeUserId)) li.classList.add('list-group-item-success')
            let p = document.createElement('p')
            p.textContent = myJson[i].title + ' ' + myJson[i].likes.length 
            p.addEventListener('click', () => {
                toggleLike(myJson[i]._id, li)
            })
            li.appendChild(p)
            let span = document.createElement('button')
            span.classList.add('badge', 'badge-danger', 'badge-pill')
            span.innerHTML = '<ion-icon name="close"></ion-icon>'
            span.addEventListener('click', () => {
                deletePost(myJson[i]._id, li)
            })
            let followButton = document.createElement("button")
            followButton.setAttribute("id", "followButtonId")
            followButton.classList.add('badge', 'badge-pill')
            followButton.innerHTML = 'Follow'
            followButton.addEventListener('click', () => {
                followThisUser(myJson[i].user)
            })
            li.appendChild(span)

            let myPosts = myJson[i].user.includes(activeUserId)
            if (!myPosts) {
                li.appendChild(followButton)
            };
            ul.appendChild(li)
        }
    }).catch((e) => {
        console.log(e);
=======
        let actionsElemLink = document.createElement('a')
        actionsElemLink.classList.add('actionsElemLink')
        actionsElemLink.addEventListener('click', () => {
          window.location.href = "../front/comments.html";
        })
        let chatIcn = document.createElement('i')
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

        //likes txt
        let postLikes = document.createElement('p')
        postLikes.classList.add('font-weight-bold', 'postLikes')
        postLikes.textContent = myJson[i].likes.length + ' likes'
        postLikes.addEventListener('click', () => {
          // window.location.href = "../front/postLikes.html";
        })

        let userPostCom = document.createElement('div')
        userPostCom.classList.add('userPostCom')

        let userNameComment = document.createElement('span')
        userNameComment.classList.add('font-weight-bold', 'userName')
        userNameComment.setAttribute("id", "userNameTag")
        userNameComment.textContent = myJson[i].user[0].username;
        let comment = document.createElement('span')
        comment.classList.add('userCommTxt')
        comment.setAttribute("id", "comment");
        comment.textContent = myJson[i].title;

        //view more comments btn
        let viewAllComBtn = document.createElement('a')
        viewAllComBtn.classList.add('btn', 'viewAllComBtn')
        viewAllComBtn.addEventListener('click', () => {
          window.location.href = "../front/comments.html";
        })
        let viewAllComTxt = document.createElement('p')
        viewAllComTxt.textContent = "View all"
        let postComNum = document.createElement('span')
        //KOMENTARU SKAICIUS
        postComNum.textContent = myJson[i].likes.length + ' comments';

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
        onePost.appendChild(postComsAndLikesCnt)
        postComsAndLikesCnt.appendChild(postLikes)
        postComsAndLikesCnt.appendChild(userPostCom)
        userPostCom.appendChild(userNameComment)
        userPostCom.appendChild(comment)
        postComsAndLikesCnt.appendChild(viewAllComBtn)
        viewAllComBtn.appendChild(viewAllComTxt)
        viewAllComTxt.appendChild(postComNum)

        //ikonoms
        feather.replace();
      }
>>>>>>> 9412055841599a6b458f079f50edcae26d5375f0
    })

}
createElements();

const toggleLike = (id) => {
  let token = localStorage.getItem('x-auth');

  fetch(`http://localhost:3000/api/v1/posts/togglelike/${id}`, {
    method: 'PATCH',
    headers: {
      'x-auth': token,
      'Content-Type': 'application/json'
    }
  }).then((response) => {

<<<<<<< HEAD
const toggleLike = (id, li) => {
    let token = localStorage.getItem('x-auth');

    fetch(`http://localhost:3000/api/v1/posts/togglelike/${id}`, {
        method: 'PATCH',
        headers: {
            'x-auth': token,
            'Content-Type': 'application/json'
        }
    }).then((response) => {
        // console.log(response);
        // alert('toggle successful');

        li.classList.toggle('list-group-item-success');


        if (!response.ok) {
            throw Error(response);
        }
        return response.json();

    }).then((myJson) => {
        createElements();

    }).catch((e) => {
        console.log(e);
        alert('toggle failed');
    });
};

const deletePost = (id, li) => {
    let token = localStorage.getItem('x-auth');

    fetch(`http://localhost:3000/api/v1/posts/deletePostById/${id}`, {
        method: 'DELETE',
        headers: {
            'x-auth': token,
            'Content-Type': 'application/json'
        }
    }).then((response) => {
        // console.log(response);
        // alert('deleted successfully');

        li.remove();

        if (!response.ok) {
            throw Error(response);
        }
        return response.json();

    }).then((myJson) => {

    }).catch((e) => {
        console.log(e);
        alert('toggle failed');
    });
};

const followThisUser = (id) => {
    let token = localStorage.getItem('x-auth');
    console.log(id)
    fetch(`http://localhost:3000/api/v1/user/follow-user/${id}`, {

        method: 'POST',
        headers: {
            'x-auth': token,
            'Content-Type': 'application/json'
        }
    })
    .then((response) => {
        console.log(response);
        alert('follow successful');
        // document.getElementById("followButtonId").innerHTML = "Unfollow"
        // li.classList.toggle('list-group-item-success');
        // if (!response.ok) {
        //     throw Error(response);
        // }
        return response.json();
    })
    // .then((myJson) => {
    //     createElements();
    // })
    .catch((e) => {
        console.log(e);
        alert('follow failed');
    });
};

const logout = () => {
    let token = localStorage.getItem('x-auth');

    localStorage.removeItem('x-auth');

    fetch(`http://localhost:3000/api/v1//user/logout`, {
        method: 'GET',
        headers: {
            'x-auth': token,
            'Content-Type': 'application/json'
        }
    }).then((header) => {
        console.log(header);

        if (!header.ok) {
            throw Error(header);
        };
=======
    if (!response.ok) {
      throw Error(response);
    }
    return response.json();
>>>>>>> 9412055841599a6b458f079f50edcae26d5375f0

  }).then((myJson) => {

  }).catch((e) => {
    console.log(e);
    alert('toggle failed');
  });
};