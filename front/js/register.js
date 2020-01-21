const registerUser = () => {
    let email = document.getElementById('registerEmail').value;
    let password = document.getElementById('registerPassword').value;
    let rPassword = document.getElementById('registerRPassword').value;
    let file = document.getElementById('attachedProfileImage');
    
    

    if (password === rPassword) {
    let data = new FormData()
        data.append('profilePic', file.files[0])
        // data.append('username', 'newuser')
        data.append('username', email)
        data.append('password', password)

        // let body = {
        //     username: email,
        //     password: password
        // }
        
        
        fetch('http://localhost:3000/api/v1/user/register', {
            method: 'POST',
            // body: JSON.stringify(body),
            body: data,
            headers: {
                // 'Content-Type':  'application/json'
            }
        }).then((header) => {
            console.log(header);
            if(header.status == 200) {
                return header.json();
            } else {
                alert('Registration failed')
            }
        }).then((response) => {
            if(response) {
                alert('Registration successful')
                window.location.href = '../front/login.html';
            }
        }).catch((e) => {
            console.log(e)
        })
    }
};