const registerUser = () => {
    let email = document.getElementById('registerEmail').value;
    let password = document.getElementById('registerPassword').value;
    let rPassword = document.getElementById('registerRPassword').value;
    if(password === rPassword) {

        let body = {
            username: email,
            password: password
        }
        fetch('http://localhost:3000/api/v1/user/register', {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
                'Content-Type':  'application/json'
            }
        }).then((header) => {
            // console.log(header);
            if(header.status == 200) {
                return header.json();
            } else {
                alert('Registration failed')
            }
        }).then((response) => {
            if(response) {
                // alert('Registration successful')
                window.location.href = '../front/login.html';
            }
        }).catch((e) => {
            console.log(e)
        })
    }
};

//show password
const showPasswordBtn = () =>{
  var x = document.getElementById("registerPassword");
  var y = document.getElementById("registerRPassword");
    if (x.type === "password") {
      x.type = "text";
      y.type = "text";
    } else {
      x.type = "password";
      y.type = "password";
    }
};
