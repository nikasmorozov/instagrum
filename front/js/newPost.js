// for icons
feather.replace();

const checkifLoggedIn = () => {
    let token = localStorage.getItem('x-auth');

    if (!token) {
        window.location.href = "../front/login.html";
    }
};
checkifLoggedIn();

function createPost() {
    let token = localStorage.getItem('x-auth');
    let newPost = document.getElementById('newItem').value;
    let file = document.getElementById('attachedImage');

    let data = new FormData()
    data.append('postPic', file.files[0])
    data.append('username', 'newuser')
    data.append('title', newPost)

    fetch("http://localhost:3000/api/v1/posts/createPost", {
        method: "POST",
        body: data,
        headers: {
            "x-auth": token
        }
    }).then((header)=> {
        if (!header.ok) {
            throw Error(header)
        }
    }).then((response) => {
        document.location.href='../front/feed.html',true
    }).catch((e) => {
        console.log(e);
        alert('Adding failed');
    })
};
