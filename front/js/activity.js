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

const renderActivities = () => {

  let token = localStorage.getItem("x-auth");

  const userNameTag = document.getElementById("userNameTag");
  const userProfPicSml = document.querySelector(".userProfPicSml");
  const likedImgActv = document.querySelector(".likedImgActv");

  fetch("http://localhost:3000/api/v1/activities/getactivities", {
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
      // let userPosts = myJson.filter(e => {
      //   if (e.user[0]._id === activeUserId) {
      //     return e;
          
      //   }
      // });

      for (let i = 0; i < myJson.length; i++) {
        userProfPicSml.src = myJson[i].userProfilePic;

        userNameTag.textContent = myJson[i].username + ' ' + myJson[i].title;

        likedImgActv.src = myJson[i].post.imageURL;
      }
    })
};

renderActivities();
