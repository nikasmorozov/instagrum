// for icons
feather.replace();

const logout = () => {
  let token = localStorage.getItem("x-auth");
  localStorage.removeItem("x-auth");
  fetch(`http://localhost:3000/api/v1/user/logout`, {
    method: "GET",
    headers: {
      "x-auth": token,
      "Content-Type": "application/json"
    }
  })
    .then(header => {
      window.location.href = "../front/login.html";
      console.log(header);
      if (!header.ok) {
        throw Error(header);
      }
    })
    .catch(e => {
      console.log(e);
    });
};


const postsCounter = () => {
  let token = localStorage.getItem("x-auth");
  const noOfPostsSpan = document.querySelector(".statNum");
  let activeUserId = localStorage.getItem("activeUserId");

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
    .then(allPosts => {
      const userPosts = allPosts.filter(el => {
        if (el.user[0]._id === activeUserId) {
          return el;
          // console.log(allPosts);
        }
      });
      noOfPostsSpan.textContent = userPosts.length;
    });
};

postsCounter();

const changePsw = (pswToTest, newPsw, repeatPsw) => {
  return new Promise((resolve, reject) => {
    let token = localStorage.getItem("x-auth");
    //   let activeUserId = localStorage.getItem("activeUserId");
    let body = {
      // id: activeUserId,
      currPassword: pswToTest,
      newPassword: newPsw,
      repPassword: repeatPsw
    };

    fetch("http://localhost:3000/api/v1/user/changeUserInfo", {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "x-auth": token,
        "Content-Type": "application/json"
      }
    })
      .then(response => {
        console.log(response);
        if (!response.ok) {
          alert("wrong password");

          throw response;
        }
        return response.json();
      })
      .then(checkResult => {
        if (newPsw === repeatPsw) {
          resolve(true);
        } else {
          alert("new password does not match");
          resolve(false);
        }
      })
      .catch(async e => {
        console.log(await e.json());
        reject(false);
      });
  });
};

const setProfileInfo = () => {
  const userNameTag = document.getElementById("userNameTag");
  const userProfPicBig = document.querySelector(".userProfPicBig");
  let token = localStorage.getItem("x-auth");
  let activeUserId = localStorage.getItem("activeUserId");

  fetch(`http://localhost:3000/api/v1/user/getSingleUser/${activeUserId}`, {
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
    .then(userFound => {
      console.log(userFound.username);

      userNameTag.textContent = userFound.username;
      if (userFound.profilePicURL) {
        userProfPicBig.src = userFound.profilePicURL;
      }
    });
};

setProfileInfo();

const changeUsernameDB = usernameInput => {
  //   const userNameTag = document.getElementById("userNameTag");
  let token = localStorage.getItem("x-auth");
  let body = {
    newUsername: usernameInput
  };
  console.log("change username", usernameInput);
  fetch("http://localhost:3000/api/v1/user/changeUserInfo", {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "x-auth": token,
      "Content-Type": "application/json"
    }
  })
    .then(response => {
      console.log(response);
      if (!response.ok) {
        throw response;
      }
      return response.json();
    })
    .then(checkResult => {})
    .catch(e => {
      console.log(e.json());
    });
};

const editProfileBtn = document.querySelector(".editProfBtn");

editProfileBtn.addEventListener("click", async () => {
  const usernameTag = document.getElementById("userNameTag");
  const usernameInput = document.getElementById("userNameInput");
  const changePswBtn = document.querySelector(".changePswBtn");
  const changePicBtn = document.getElementById("changeProfileImage");
  const currentPsw = document.getElementById("currentPsw");
  const newPsw = document.getElementById("newPsw");
  const repeatPsw = document.getElementById("repeatPsw");
  const userNameTag = document.getElementById("userNameTag");

  if (editProfileBtn.textContent !== "Save") {
    editProfileBtn.textContent = "Save";
    usernameTag.style.display = "none";
    usernameInput.style.display = "block";
    changePswBtn.style.display = "block";
    changePicBtn.style.display = "block";

    usernameInput.setAttribute("value", usernameTag.textContent);
  } else {
    if (currentPsw.value && newPsw.value && repeatPsw.value) {
      const result = await changePsw(
        currentPsw.value,
        newPsw.value,
        repeatPsw.value
      );
      console.log(result);

      if (result) {
        editProfileBtn.textContent = "Edit Profile";
        usernameInput.style.display = "none";
        usernameTag.style.display = "block";
        changePswBtn.style.display = "none";
        currentPsw.style.display = "none";
        newPsw.style.display = "none";
        repeatPsw.style.display = "none";
        changePicBtn.style.display = "none";

        // if (usernameInput.value !== usernameTag.textContent) {
        //   changeUsernameDB(usernameInput.value);
        // }
        currentPsw.value = "";
        newPsw.value = "";
        repeatPsw.value = "";
      }
    } else if (!currentPsw.value && !newPsw.value && !repeatPsw.value) {
      //   if (usernameInput.value !== usernameTag.textContent) {
      //     changeUsernameDB(usernameInput.value);
      //   }
      editProfileBtn.textContent = "Edit Profile";
      usernameInput.style.display = "none";
      usernameTag.style.display = "block";
      changePswBtn.style.display = "none";
      changePicBtn.style.display = "none";
      currentPsw.style.display = "none";
      newPsw.style.display = "none";
      repeatPsw.style.display = "none";
    } else {
      alert("Please fill all required fields");
    }
    changeUsernameDB(usernameInput.value);
    userNameTag.textContent = usernameInput.value;
  }
});

const changePswBtn = target => {
  target.style.display = "none";
  const currentPsw = document.getElementById("currentPsw");
  const newPsw = document.getElementById("newPsw");
  const repeatPsw = document.getElementById("repeatPsw");
  currentPsw.style.display = "block";
  newPsw.style.display = "block";
  repeatPsw.style.display = "block";
};

const changePicBtn = () => {
  // const userProfPicBig = document.querySelector('.userProfPicBig')

  const file = document.getElementById("changeProfileImage");
  let token = localStorage.getItem("x-auth");
  let data = new FormData();
  data.append("profilePic", file.files[0]);

  fetch("http://localhost:3000/api/v1/user/changeAvatar", {
    method: "POST",
    body: data,
    headers: {
      "x-auth": token
    }
  })
    .then(response => {
      console.log(response);
      if (!response.ok) {
        throw response;
      }
      return response.json();
    })
    .then(checkResult => {})
    .catch(e => {
      console.log(e.json());
    });
  // userProfPicBig.attributes('src','../../back/images/15792014152408_frame.jpg')
};

const activeUserPosts = () =>{
  let token = localStorage.getItem("x-auth");
  let activeUserId = localStorage.getItem("activeUserId");
  let row = document.querySelector(".postImageProfCnt");

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
    .then(userPost => {
      userPost.reverse();
      let postedImg = userPost.filter(e => {
        if (e.user[0]._id === activeUserId) {
          return e;
        }
      })

      for (var i = 0; i < postedImg.length; i++) {
           let col = document.createElement("div")
           col.classList.add("col-4", "postImageProfCnt");

           const userPostImage = document.createElement("img");
           userPostImage.classList.add("img-fluid", "userPostImage");
           userPostImage.setAttribute("src", postedImg[i].imageURL);
           row.appendChild(col)
           col.appendChild(userPostImage)
      }
    });
}
activeUserPosts();

