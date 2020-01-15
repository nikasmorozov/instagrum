const goToRegister = () => {
    window.location.href = "../front/register.html";
};

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
        console.log(header);

        if (!header.ok) {
            throw Error(header);
        }

        let token = header.headers.get('x-auth');
        localStorage.setItem('x-auth', token);
        console.log(token);
    }).then((response) => {
            alert('Login successful')
            window.location.href = '../front/index.html';
    }).catch((e) => {
        console.log(e);
        alert('Login failed');
    })

}