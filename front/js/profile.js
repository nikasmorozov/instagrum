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
      userNameTag.textContent = userFound.username;
      if (userFound.profilePicURL) {
        userProfPicBig.src = userFound.profilePicURL;
      }
    });
};

setProfileInfo();

const editProfileBtn = document.querySelector('.editProfBtn')

editProfileBtn.addEventListener('click', (e) => {
    if (editProfileBtn.textContent !== 'Save') {

        editProfileBtn.textContent = 'Save'
        const usernameTag = document.getElementById('userNameTag')
        const usernameInput = document.createElement('input')
    } else {
        editProfileBtn.textContent = 'Edit Profile'
    }
})


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
