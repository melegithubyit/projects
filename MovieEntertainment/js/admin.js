const title = document.getElementById("movieForm").elements[0]
const description = document.getElementById("movieForm").elements[1]
const rating = document.getElementById("movieForm").elements[2]
const releaseDate = document.getElementById("movieForm").elements[3]
const posterPath = document.getElementById("movieForm").elements[4]

//Edit Movies

const eid = document.getElementById("editMovieForm").elements[0]
const erating = document.getElementById("editMovieForm").elements[2]

//Add Recent Movies

const recentTitle = document.getElementById("recentMovieForm").elements[0]
const recentDescription = document.getElementById("recentMovieForm").elements[1]
const recentRating = document.getElementById("recentMovieForm").elements[2]
const recentReleaseDate = document.getElementById("recentMovieForm").elements[3]
const recentPosterPath = document.getElementById("recentMovieForm").elements[4]

//Edit Recent Movies
const eRecentRating = document.getElementById("editRecentMovieForm").elements[2]
const recentEid = document.getElementById("editRecentMovieForm").elements[0]

//Token and Main

const token = window.localStorage.getItem('token')
let base64Url = token.split('.')[1];
let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
let jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
}).join(''));
const decodedToken = JSON.parse(jsonPayload)

async function add(collection){
    const res = await fetch(`http://localhost:3100/${collection}`, {
        method: 'POST',
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({title: title.value || recentTitle.value, imdbRating: parseFloat(rating.value) || parseFloat(recentRating.value)
            , description: description.value || recentDescription.value,
            filePath: "try", imdbPoster: posterPath.value || recentPosterPath.value, releaseDate: releaseDate.value || recentReleaseDate.value })
    }).then(res => res.json()).then(body => body)

    if(res.error && res.statusCode>=400 && res.statusCode<500 ){
        let errorMessage = res.message[0].toUpperCase()
        if(res.statusCode === 403) errorMessage = res.message
        document.querySelector(".error").insertAdjacentText("afterbegin", `${errorMessage}!`)
    }
    location.reload()

}

async function editMovie(collection, rating){
    const res = await fetch(`http://localhost:3100/${collection}/${eid.value || recentEid.value}`, {
        method: 'PUT',
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({imdbRating: parseFloat(rating.value)})
    }).then(res => res.json()).then(body => body)
    if(res.error && res.statusCode>=400 && res.statusCode<500 ){
        let errorMessage = res.message[0]
        if(res.statusCode === 403) errorMessage = res.message
        document.querySelector(".errorTwo").insertAdjacentText("afterbegin", `${errorMessage}!`)
    }
    location.reload()
}

async function getMovies(){
    const movies = await fetch(`http://localhost:3100/movies`).then(res => res.json()).then(body => body)
    movies.forEach(movie => {
        const markUp = `<div>${movie.title}</div>
      <button class="btn btn-sm btn-danger" onclick="deleteItem(${movie.id}, 'movies')">Delete</button>`
        document.querySelector(".recentmovies").insertAdjacentHTML("beforeend", markUp)
    })
}
async function getRecentMovies(){
    const movies = await fetch(`http://localhost:3100/recently-added`).then(res => res.json()).then(body => body)
    movies.forEach(movie => {
        const markUp = `<div>${movie.title}</div>
      <button class="btn btn-sm btn-danger" onclick="deleteItem(${movie.id}, 'recently-added')">Delete</button>`
        document.querySelector(".movies").insertAdjacentHTML("beforeend", markUp)
    })
}

async function getUsers(){
    const users = await fetch(`http://localhost:3100/users`).then(res => res.json()).then(body => body)
    users.forEach(user => {
        const markUp = `<div>${user.email}</div>
      <button class="btn btn-sm btn-danger" onclick="deleteItem(${user.id}, 'users')">Delete</button>`
        document.querySelector(".users").insertAdjacentHTML("beforeend", markUp)
    })
}

async function getComments(){
    const comments = await fetch(`http://localhost:3100/comments`).then(res => res.json()).then(body => body)
    comments.forEach(comment =>{
        const markUp = `<div><div>${comment.email}</div><div>${comment.message}</div></div>
      <button class="btn btn-sm btn-danger" onclick="deleteItem(${comment.id}, 'comments')">Delete</button>`
        document.querySelector(".comments").insertAdjacentHTML("beforeend", markUp)
    })
}

async function deleteItem(id, collection){
    const res =  await fetch(`http://localhost:3100/${collection}/${id}`, {
        method: 'DELETE',
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    }).then(res => res.json()).then(body => body)
    location.reload()
}
function logout(){
    window.localStorage.removeItem('token')
    window.location.href = 'home.html'
}

if (token && decodedToken.admin){
    getMovies()
    getRecentMovies()
    getUsers()
    getComments()
}
else window.location.href = 'home.html'