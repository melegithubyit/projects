const name = document.getElementById("questionForm").elements[0]
const email = document.getElementById("questionForm").elements[1]
const message = document.getElementById("questionForm").elements[2]
async function validateForm(){
    console.log(name.value)
    const res = await fetch('http://localhost:3100/comments', {
        method: 'POST',
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({fullName: name.value, email: email.value, message: message.value})
    }).then(res => res.json()).then(body => body)
    console.log(res)
    //const formattedRes = await res.json()

    window.location.href = 'movies.html'}
function logout(){
    window.localStorage.removeItem('token')
    window.location.href = 'home.html'
}