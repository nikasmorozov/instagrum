// for icons
feather.replace();


const setProfileInfo = () => {
  const userNameTag = document.getElementById("userNameTag");
  const userProfPicSml = document.querySelector(".userProfPicSml");
  const likedImgActv = document.querySelector(".likedImgActv");
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
      userNameTag.textContent = userFound.username +" liked your photo";
      if (userFound.profilePicURL) {
        userProfPicSml.src = userFound.profilePicURL;
      }
    });
}

setProfileInfo();
