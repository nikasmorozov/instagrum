const checkifLoggedIn = require('./index.js')

checkifLoggedIn()

// for icons
feather.replace();

function createPost() {
    let token = localStorage.getItem('x-auth');
    let newPost = document.getElementById('title').value;

    let file = document.getElementById('attachedImage');
    let data = new FormData()

    data.append('postPic', file.files[0])
    data.append('username', 'newuser')
    data.append('title', newPost)

    console.log('data',data);

    fetch("http://localhost:3000/api/v1/posts/createPost", {
        method: "POST",
        body: data,
        headers: {
            "x-auth": token
        }
    }).then((header)=> {
        console.log(header);
        if (!header.ok) {
            throw Error(header)
        }
    }).then((response) => {
        // createElements();
        window.location.href = '../front/index.html';

    }).catch((e) => {
        console.log(e);
        alert('Adding failed');
    })

};
