// for icons
feather.replace();


// const setProfileInfo = () => {
//   const userNameTag = document.getElementById("userNameTag");
//   const userProfPicSml = document.querySelector(".userProfPicSml");
//   const likedImgActv = document.querySelector(".likedImgActv");
//   let token = localStorage.getItem("x-auth");
//   let activeUserId = localStorage.getItem("activeUserId");

//   fetch(`http://localhost:3000/api/v1/user/getSingleUser/${activeUserId}`, {
//     method: "GET",
//     headers: {
//       "x-auth": token,
//       "Content-Type": "application/json"
//     }
//   })
//     .then(response => {
//       if (!response.ok) {
//         throw Error(response);
//       }
//       return response.json();
//     })
//     .then(userFound => {
//       userNameTag.textContent = userFound.username + " liked your photo";
//       if (userFound.profilePicURL) {
//         userProfPicSml.src = userFound.profilePicURL;
//       }else{
//         userProfPicSml.setAttribute(
//           "src",
//           "https://www.w3schools.com/w3css/img_avatar3.png"
//         );
//       }
//     });
// }

// setProfileInfo();

const renderActivity = () => {

  let token = localStorage.getItem("x-auth");
  let activeUserId = localStorage.getItem("activeUserId");

  const userNameTag = document.getElementById("userNameTag");
  const userProfPicSml = document.querySelector(".userProfPicSml");
  const likedImgActv = document.querySelector(".likedImgActv");

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
      let userPosts = myJson.filter(e => {
        if (e.user[0]._id === activeUserId) {
          return e;
        }
      });

      for (let i = 0; i < userPosts.length; i++) {
        console.log(userPosts[i]);

        let userWhoLikes = getUserNameById(userPosts[i].likes[0])
        console.log(userWhoLikes)

        userNameTag.textContent = userPosts[i].likes[0] + ' liked your photo';
        likedImgActv.src = userPosts[i].imageURL;

      }
    })
};

renderActivity();

const getUserNameById = (userId) => {

  let token = localStorage.getItem("x-auth");


  fetch(`http://localhost:3000/api/v1/user/getSingleUser/${userId}`, {
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
    .then(foundUser => {
      console.log(foundUser.username)
      return foundUser.username;
    });

}
