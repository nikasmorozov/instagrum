// for icons
feather.replace();

//checking
const checkifLoggedIn = () => {
  let token = localStorage.getItem("x-auth");
  if (!token) {
    window.location.href = "../front/login.html";
  }
};
checkifLoggedIn();

const createElements = (postsFiltered) => {
  // document.innerHTML = ''
  // let modal = document.getElementById("modalCenter");
  let postsCont = document.getElementById("postsCont");
  let token = localStorage.getItem("x-auth");
  let activeUserId = localStorage.getItem('activeUserId')
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

      let postsCont = document.getElementById("postsCont");

      //paskutini posta rodys pirma
      myJson.reverse();

      if (postsFiltered) {
        myJson = postsFiltered.reverse()
      }

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

        let userInfo = document.createElement("div");
        userInfo.style.cursor = 'pointer'
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
        profileImg.addEventListener('click', async () => {      
          const userPosts = await showSelectedUserPosts(myJson[i].user[0]._id)
          createElements(userPosts)
        })
        profileImg.style.cursor = 'pointer'
        let userName = document.createElement("span");
        userName.classList.add("font-weight-bold", "userName");
        userName.setAttribute("id", "userNameTag");
        userName.textContent = myJson[i].user[0].username;
        userName.style.cursor = 'pointer'
        userName.addEventListener('click', async () => {      
          const userPosts = await showSelectedUserPosts(myJson[i].user[0]._id)
          createElements(userPosts)
        })

        let moreIcnBtn = document.createElement("button");
        moreIcnBtn.setAttribute("class", "moreIcnBtn");
        moreIcnBtn.setAttribute("data-toggle", "modal");
        moreIcnBtn.setAttribute("data-target", "#modalCenter");
        //moreIcnBtn dabar reik su fetchu turet, kad on click pasiupdeitintu followinimo duomenys
        moreIcnBtn.addEventListener("click", (e) => {
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
              //sito reverse reikia, kad moreIcnBtn sutaptu su postu reverse
              myJson.reverse();

              let modalContent = document.querySelector(".modal-content")
              let cancel = document.createElement("button");
              cancel.textContent = "Cancel";
              cancel.classList.add("btn", "btn-light");
              cancel.addEventListener('click', () => {
                modalContent.setAttribute("data-dismiss", "modal");
              })

              let del = document.createElement("button");
              del.textContent = "Delete";
              del.classList.add("btn", "btn-light", "deleteBtn");
              del.addEventListener('click', () => {
                deletePost(myJson[i]._id);
                onePost.style.display = "none"
                modalContent.setAttribute("data-dismiss", "modal");
              })
              let follow = document.createElement("button");
              
              // Follow/Unfollow toggle black magic. BEWARE!!
              let FollowThat = myJson[i].user[0].followers[0];
              if (FollowThat === undefined) {
                follow.textContent = "Follow";
              } else if (myJson[i].user[0].followers[0]._id === activeUserId) {
                follow.textContent = "Unfollow";
              }
              // console.log(activeUserId)
              // console.log(myJson[i])

              follow.classList.add("btn", "btn-light", "followBtn");
              follow.addEventListener('click', () => {
                followThisUser(myJson[i].user);
                modalContent.setAttribute("data-dismiss", "modal");
              })

              let myPosts = myJson[i].user[0]._id.includes(activeUserId)
              if (!myPosts) {
                modalContent.innerHTML = ""
                modalContent.appendChild(follow)
                modalContent.appendChild(cancel)
              } else {
                modalContent.innerHTML = ""
                modalContent.appendChild(del)
                modalContent.appendChild(cancel)
              }
            });
        });

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
        actionsCnt.classList.add("actionsCnt", "d-flex", "justify-content-start", "align-itemps-center");

        //Like btn
        let actionsElem = document.createElement('span')
        actionsElem.classList.add('actionsElem')
        actionsElem.addEventListener('click', (e) => {

          toggleLike(myJson[i]._id);


          if (e.target.classList.contains("ri-heart-fill")) {
            e.target.classList.replace("ri-heart-fill", "ri-heart-line");

            if (myJson[i].likes.includes(activeUserId)) {
              postLikes.textContent = myJson[i].likes.length - 1 + ' likes';
            } else {
              postLikes.textContent = myJson[i].likes.length + ' likes';
            };
          } else {
            e.target.classList.replace("ri-heart-line", "ri-heart-fill");

            if (myJson[i].likes.includes(activeUserId)) {
              postLikes.textContent = myJson[i].likes.length + ' likes';
            } else {
              postLikes.textContent = myJson[i].likes.length + 1 + ' likes';
            }
          };
        }
        );

        let likeBtn = document.createElement('i')
        likeBtn.setAttribute("id", "heartBtn");
        likeBtn.setAttribute("class", "ri-heart-line")
        if (myJson[i].likes.includes(activeUserId)) {
          likeBtn.classList.replace('ri-heart-line', 'ri-heart-fill')
        };

        let actionsElemLink = document.createElement('a')
        actionsElemLink.classList.add('actionsElemLink')
        actionsElemLink.addEventListener('click', () => {
          window.location.href = `../front/comments.html?id=${myJson[i]._id}`;
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
        postLikes.textContent = myJson[i].likes.length + ' likes';
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
          window.location.href = `../front/comments.html?id=${myJson[i]._id}`;
        })
        let viewAllComTxt = document.createElement('p')
        viewAllComTxt.textContent = "View all"
        let postComNum = document.createElement('span')
        //KOMENTARU SKAICIUS
        postComNum.textContent = " " + myJson[i].commentCount + ' comments';

        //main append
        postsCont.appendChild(onePost);
        onePost.appendChild(userInfoCnt);

        //user info append
        userInfoCnt.appendChild(userInfo);
        userInfo.appendChild(profileImg);
        userInfo.appendChild(userName);
        userInfoCnt.appendChild(moreIcnBtn);
        moreIcnBtn.appendChild(moreIcn);

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

//FOLLOWING function
const followThisUser = (id) => {
  let token = localStorage.getItem('x-auth');

  fetch(`http://localhost:3000/api/v1/user/follow-user/${id[0]._id}`, {

    method: 'POST',
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

  }).catch((e) => {
    console.log(e);
    alert('follow failed');
  });
  console.log(id)
};

const deletePost = (id) => {
  let token = localStorage.getItem('x-auth');

  fetch(`http://localhost:3000/api/v1/posts/deletePostById/${id}`, {
    method: 'DELETE',
    headers: {
      'x-auth': token,
      'Content-Type': 'application/json'
    }
  }).then((response) => {
    // onePost.remove();

    if (!response.ok) {
      throw Error(response);
    }
    return response.json();

  }).then((myJson) => {

  }).catch((e) => {
    console.log(e);
  });
};

const showSelectedUserPosts = async (userID) => {
  let token = localStorage.getItem("x-auth");
  // let userPosts
  try {
    const allPosts = await fetch(`http://localhost:3000/api/v1//posts/getAllPosts`, {
      method: "GET",
      headers: {
        "x-auth": token,
        "Content-Type": "application/json"
      }
      
    })
    const res = await allPosts.json()
    console.log('allposts', res);
    const newResp = await filterPosts(res, userID)
    console.log('newresp', newResp);
    return newResp
  } catch (err) {
    console.log(err);
    
  }
}

  const filterPosts = (allPosts, userID) => {
    filterePosts = allPosts.filter(el => {
      if (el.user[0]._id === userID) {
        return el;
      }
    });
    return filterePosts
  }