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

    list.innerHTML = '';

    fetch('http://localhost:3000/api/v1/posts/getAllPosts', {
        method: 'GET',
        headers: {
            'x-auth': token,
            'Content-Type': 'application/json'
        }
    }).then((response) => {
        // console.log(response);

        if (!response.ok) {
            throw Error(response);
        }
        return response.json();

    }).then((myJson) => {
        console.log(myJson)
        
        let ul = document.getElementById("list")
        ul.innerHTML = ''
        for (let i = 0; i < myJson.length; i++) {
            let li = document.createElement('li')
            li.classList.add('list-group-item', 'd-flex', 'justify-content-between')
            if (myJson[i].likes.includes(activeUserId)) li.classList.add('list-group-item-success')
            const img = document.createElement('img')
            img.setAttribute('class', 'postImage')
            img.setAttribute('src',myJson[i].imageURL)
            let p = document.createElement('p')
            let username = document.createElement('a')
            username.textContent = myJson[i].user[0].username;
            let a = document.createElement('a')
            a.textContent = myJson[i].likes.length
            p.textContent = myJson[i].title
            p.addEventListener('click', () => {
                toggleLike(myJson[i]._id, li)
            })
            a.addEventListener('click', () => {
                showLikes(myJson[i]._id)
            })
            img.addEventListener('dblclick', () => {
                toggleLike(myJson[i]._id, li)
            });
            li.appendChild(username)
            li.appendChild(p)
            li.appendChild(img)
            li.appendChild(a)
            //add comment block
            let commentField = document.createElement('input')
            commentField.type = "text"
            commentField.placeholder = "Comment"   
            li.appendChild(commentField)
            let span2 = document.createElement('button')
            span2.classList.add('badge', 'badge-primary', 'badge-pill')
            span2.innerHTML = '<ion-icon name="add"></ion-icon>'
            span2.addEventListener('click', () => {
                addComment(myJson[i]._id, li)               
            })
            li.appendChild(span2)
            //comment block
            let span = document.createElement('button')
            span.classList.add('badge', 'badge-danger', 'badge-pill')
            span.innerHTML = '<ion-icon name="close"></ion-icon>'
            span.addEventListener('click', () => {
                deletePost(myJson[i]._id, li)
            })
            li.appendChild(span)
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

const showLikes = (id) => {
    let token = localStorage.getItem('x-auth');

    fetch(`http://localhost:3000/api/v1/posts/getLikesUsers/${id}`, {
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

    }).then((myJson) => {
        for (let i = 0; i < myJson.length; i++) {
            console.log(myJson[i].username)
        };
    }).catch((e) => {
        console.log(e);
    })
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

const addComment = (id, li) => {
    let token = localStorage.getItem('x-auth');
    let comment = li.querySelector("input").value
    let body = {
        comment: comment,
        postId: id
    }
    li.querySelector("input").value = ""
    fetch(`http://localhost:3000/api/v1/comments/addComment`, {
        method: 'POST',
        headers: {
            'x-auth': token,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    }).then((response) => {
        if (!response.ok) {
            throw Error(response);
        }
        return response.json();
    }).then((myJson) => {
        //createElements()
    }).catch((e) => {
        console.log(e);
    });
};