const name = document.getElementById("joinForm").elements[0]
const email = document.getElementById("joinForm").elements[1]
const password = document.getElementById("joinForm").elements[2]
const cPassword = document.getElementById("joinForm").elements[3]



async function validateJoin(){

    if (password.value !== cPassword.value){
        window.alert("Password must be the same")
        return
    }
    const res = await fetch('http://localhost:3100/auth/join', {
        method: 'POST',
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({fullName: name.value, email: email.value, password: password.value})
    }).then(res => res.json()).then(status => status)


    if(res.error && res.statusCode>=400 && res.statusCode<500 ){
        let errorMessage = res.message[0]
        if(res.statusCode === 403) errorMessage = res.message
        document.querySelector(".error").insertAdjacentText("afterbegin", `${errorMessage}`)

    }
    else {
        window.localStorage.setItem("token", res)
        window.location.href = "movies.html"
    }

}