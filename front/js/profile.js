// for icons
feather.replace();

const logout = () => {
  let token = localStorage.getItem("x-auth");
  localStorage.removeItem("x-auth");
  fetch(`http://localhost:3000/api/v1//user/logout`, {
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

    fetch('http://localhost:3000/api/v1//posts/getAllPosts', {
      method: "GET",
      headers: {
        "x-auth": token,
        "Content-Type": "application/json"
      }
    })
      .then(response => {
        // console.log(response);
    
        if (!response.ok) {
          throw Error(response);
        }
        return response.json();
      })
        .then(allPosts => {
            const userPosts = allPosts.map(el => {
                if (el.user[0]._id === activeUserId) {
                      return el
                  }
            })
            noOfPostsSpan.textContent = userPosts.length
          })
}

postsCounter()

const userNameTag = document.getElementById("userNameTag");
const userProfPicBig = document.querySelector(".userProfPicBig");
let token = localStorage.getItem("x-auth");
let activeUserId = localStorage.getItem("activeUserId");
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
  })
  .then(userFound => {
      userNameTag.textContent = userFound.username;
      if (userFound.profilePicURL) {
          userProfPicBig.src = userFound.profilePicURL;
      }
  });
