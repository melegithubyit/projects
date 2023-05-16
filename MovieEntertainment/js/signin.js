
const email = document.getElementById("loginForm").elements[0]
const password = document.getElementById("loginForm").elements[1]

async function validateSigning(){
    const res = await fetch('http://localhost:3100/auth/login', {
        method: 'POST',
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({email: email.value, password: password.value})
    }).then(res => res.json()).then(body => body)

    let base64Url = res.split('.')[1];
    let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    let jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    const decodedToken = JSON.parse(jsonPayload)
    //console.log(res)
    //const formattedRes = await res.json()
    if(res.error && res.statusCode>=400 && res.statusCode<500 ){
        let errorMessage = res.message[0]
        if(res.statusCode === 403) errorMessage = res.message
        document.querySelector(".error").insertAdjacentText("afterbegin", `${errorMessage}`)
    }
    else {
        window.localStorage.setItem("token", res)
        if (decodedToken.admin) window.location.href = "admin.html"
        else window.location.href = "movies.html"
    }

}