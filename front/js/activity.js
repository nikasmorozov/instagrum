// for icons
feather.replace();

const renderActivities = () => {

  let token = localStorage.getItem("x-auth");



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
        const userNameTag = document.getElementById("userNameTag");
        const userProfPicSml = document.querySelector(".userProfPicSml");
        const likedImgActv = document.querySelector(".likedImgActv");

         //cnt activity
         let userPostContentCnt = document.createElement("div");
         userPostContentCnt.classList.add(
           "container",
           "fullWidthCnt",
           "activityCnt"
         );

         let singleAction = document.createElement("div");
         userPostContentCnt.classList.add(
           "container",
           "singleAction",
           "d-flex",
           "justify-content-between",
           "align-items-center",
         );

          userPostContentCnt.setAttribute("id", "activityCnt");

        userProfPicSml.src = myJson[i].userProfilePic;

        userNameTag.textContent = myJson[i].username + ' ' + myJson[i].title;

        likedImgActv.src = myJson[i].post.imageURL;

        userPostContentCnt.appendChild(singleAction);

      }
    })
};

renderActivities();
