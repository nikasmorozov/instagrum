// for icons
feather.replace();


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
        // console.log(myJson);

      let postsCont = document.getElementById("postsCont");
      postsCont.innerHTML = "";

      //paskutini posta rodys pirma
      myJson.reverse();

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
        userName.addEventListener('click', (e) => {
          //turetu nukelti i to zmogaus kurio nikas paspautas profili
          window.location.href = "profile.html"
        })
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
        postImg.addEventListener('click', (e) => {
          //turetu nukelti i kita langa ir priskirti pries tai paspaustos ft info
          window.location.href = "onePostInf.html"
        })

        let postActionsCnt = document.createElement("div");
        postActionsCnt.classList.add("container-fluid", "postActionsCnt");

        let actionsCnt = document.createElement("div");
        actionsCnt.classList.add("actionsCnt","d-flex", "justify-content-start", "align-itemps-center");

        let actionsElem = document.createElement('span')
        actionsElem.classList.add('actionsElem')
        actionsElem.addEventListener('click', (e) => {
          let btn = document.querySelectorAll('#heartBtn');
          if (e.target.classList.contains("ri-heart-line")) {
            e.target.classList.replace("ri-heart-line", "ri-heart-fill");
          }else if(e.target.classList.contains("ri-heart-fill")){
            e.target.classList.replace("ri-heart-fill", "ri-heart-line");
          }else{
            console.log("Ups");
          }
        })

        let likeBtn = document.createElement('i')
        likeBtn.setAttribute("class", "ri-heart-line");
        likeBtn.setAttribute("id", "heartBtn");

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
        postLikes.textContent = "50 likes"
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
        postComNum.textContent = " 13 comments";

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
    })

}
  createElements();
