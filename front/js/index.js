const checkifLoggedIn = () => {
    let token = localStorage.getItem('x-auth');
    console.log(token)

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
      })
      .then((res) => {
        return res.json()
      })
      .then(data => {
        console.log(data)
      })
      .catch(error => console.error("Error:", error));
    //
    //
  }

const createElements = () => {

    let list = document.getElementById('list');
    let token = localStorage.getItem('x-auth');

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
            if (myJson[i].likes.length > 0) li.classList.add('list-group-item-success')
            let p = document.createElement('p')
            p.textContent = myJson[i].title
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
        // console.log(response);
        // alert('toggle successful');

        li.classList.toggle('list-group-item-success');


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