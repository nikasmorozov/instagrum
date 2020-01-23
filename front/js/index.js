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
    
    data.append('avatar', file.files[0])
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
        createElements();
    }).catch((e) => {
        console.log(e);
        alert('Adding failed');
    })

};

const createElements = () => {

    let list = document.getElementById('list');
    let token = localStorage.getItem('x-auth');
    let activeUserId = localStorage.getItem('activeUserId');
    console.log(activeUserId);

    list.innerHTML = '';

    fetch('http://localhost:3000/api/v1/posts/getAllPosts', {
        method: 'GET',
        headers: {
            'x-auth': token,
            'Content-Type': 'application/json'
        }
    }).then((response) => {
        console.log(response);

        if (!response.ok) {
            throw Error(response);
        }
        return response.json();

    }).then((myJson) => {
        console.log(myJson);
        
        let ul = document.getElementById("list")
        ul.innerHTML = ''
        for (let i = 0; i < myJson.length; i++) {
            let li = document.createElement('li')
            li.classList.add('list-group-item', 'd-flex', 'justify-content-between')
    console.log(activeUserId);
            if (myJson[i].likes.includes(activeUserId)) li.classList.add('list-group-item-success')
            let p = document.createElement('p')
            p.textContent = myJson[i].title + ' ' + myJson[i].likes.length 
            p.addEventListener('click', () => {
                toggleLike(myJson[i]._id, li)
            })
            li.appendChild(p)
            let span = document.createElement('button')
            span.classList.add('badge', 'badge-danger', 'badge-pill')
            span.innerHTML = '<ion-icon name="close"></ion-icon>'
            span.addEventListener('click', () => {
                deletePost(myJson[i]._id, li)
            })
            let followButton = document.createElement("button")
            followButton.setAttribute("id", "followButtonId")
            followButton.classList.add('badge', 'badge-pill')
            followButton.innerHTML = 'Follow'
            followButton.addEventListener('click', () => {
                followThisUser(myJson[i].user)
            })
            li.appendChild(span)

            let myPosts = myJson[i].user.includes(activeUserId)
            if (!myPosts) {
                li.appendChild(followButton)
            };
            ul.appendChild(li)
        }
    }).catch((e) => {
        console.log(e);
    })
};

createElements();



const toggleLike = (id, li) => {
    let token = localStorage.getItem('x-auth');

    fetch(`http://localhost:3000/api/v1/posts/togglelike/${id}`, {
        method: 'PATCH',
        headers: {
            'x-auth': token,
            'Content-Type': 'application/json'
        }
    }).then((response) => {
        // console.log(response);
        // alert('toggle successful');

        li.classList.toggle('list-group-item-success');


        if (!response.ok) {
            throw Error(response);
        }
        return response.json();

    }).then((myJson) => {
        createElements();

    }).catch((e) => {
        console.log(e);
        alert('toggle failed');
    });
};

const deletePost = (id, li) => {
    let token = localStorage.getItem('x-auth');

    fetch(`http://localhost:3000/api/v1/posts/deletePostById/${id}`, {
        method: 'DELETE',
        headers: {
            'x-auth': token,
            'Content-Type': 'application/json'
        }
    }).then((response) => {
        // console.log(response);
        // alert('deleted successfully');

        li.remove();

        if (!response.ok) {
            throw Error(response);
        }
        return response.json();

    }).then((myJson) => {

    }).catch((e) => {
        console.log(e);
        alert('toggle failed');
    });
};

const followThisUser = (id) => {
    let token = localStorage.getItem('x-auth');
    console.log(id)
    fetch(`http://localhost:3000/api/v1/user/follow-user/${id}`, {

        method: 'POST',
        headers: {
            'x-auth': token,
            'Content-Type': 'application/json'
        }
    })
    .then((response) => {
        console.log(response);
        alert('follow successful');
        // document.getElementById("followButtonId").innerHTML = "Unfollow"
        // li.classList.toggle('list-group-item-success');
        // if (!response.ok) {
        //     throw Error(response);
        // }
        return response.json();
    })
    // .then((myJson) => {
    //     createElements();
    // })
    .catch((e) => {
        console.log(e);
        alert('follow failed');
    });
};

const logout = () => {
    let token = localStorage.getItem('x-auth');

    localStorage.removeItem('x-auth');

    fetch(`http://localhost:3000/api/v1//user/logout`, {
        method: 'GET',
        headers: {
            'x-auth': token,
            'Content-Type': 'application/json'
        }
    }).then((header) => {
        console.log(header);

        if (!header.ok) {
            throw Error(header);
        };

    }).catch((e) => {
        console.log(e);
    })

}