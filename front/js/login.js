const login = () => {
    let username = document.getElementById('loginEmail').value;
    let password = document.getElementById('loginPassword').value;

    let body = {
        username: username,
        password: password
    }
    fetch('http://localhost:3000/api/v1/user/login', {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then((header) => {
        // console.log(header);
        if (!header.ok) {
            throw Error(header);
        }

        let token = header.headers.get('x-auth');

        localStorage.setItem('x-auth', token);

        return header.json();

    }).then((response) => {
            window.location.href = '../front/index.html';
            activeUserId = response._id;
            localStorage.setItem('activeUserId', activeUserId);

    }).catch((e) => {
        console.log(e);
        alert('Login failed');
    })
};

//show password
const showPasswordBtn = () =>{
  var x = document.getElementById("loginPassword");
    if (x.type === "password") {
      x.type = "text";
    } else {
      x.type = "password";
    }
};
