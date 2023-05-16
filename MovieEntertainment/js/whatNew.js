if (!window.localStorage.getItem('token'))
    window.location.href = 'home.html'

async function getMovies(){
    let res= await fetch("http://localhost:3100/recently-added").then(res => res.json()).then(movies => movies)
    console.log(res)
    res.forEach(movie => {
        const markup = `<div class="card  col-md-3 mx-2 mb-4 " style="width: 276px;">
                    <a href="player.html">
                    <img loading="lazy" src=${movie.imdbPoster} alt="imdb Poster" width="100%" height="373">
                    </a>
                    <div class="card-body bg-dark">
                    <h2 class="title">${movie.title}</h2>
                    <p class="date">Release Date: ${movie.releaseDate}</p>
                    <p>IMDb Rating: ${movie.imdbRating}/10</p>
                    </div>
                    </div>`
        document.querySelector(".cards").insertAdjacentHTML("beforeend", markup)
    })
}
function logout(){
    window.localStorage.removeItem('token')
    window.location.href = 'home.html'
}
getMovies()