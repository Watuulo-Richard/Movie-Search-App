// http://www.omdbapi.com/?t=abc
const inputField = document.getElementById('inputField')
const searchBtn = document.getElementById('searchBtn')
const resultContainer = document.getElementById('result')
const movieContainer = document.getElementById('movie-container')

const spinnerLoader = document.querySelector('.loading')
const mainContainer = document.querySelector('.container')

document.addEventListener('DOMContentLoaded', ()=>{
    spinnerLoader.classList.remove('hide')
    mainContainer.classList.add('hide')
})

window.addEventListener('load', ()=>{
    setTimeout(()=>{
        spinnerLoader.classList.add('hide')
        mainContainer.classList.remove('hide')
    }, 3000)
})
searchBtn.addEventListener('click', async()=>{
    const userInput = inputField.value
    if(userInput === ''){
        // alert ('Please Enter Movie Name....!!!')
        resultContainer.innerHTML = `<h3 class='msg'>Please Enter A Movie Name...!!!</h3>`
    }
    else {
        async function getMovieDataFromAPI(){
            const response = await fetch(`https://www.omdbapi.com/?t=${userInput}&apikey=c3cde95a`)
            const movieData = await response.json()
            console.log(movieData)
            displayingAsingleMovieOnUI(movieData)
        }
        getMovieDataFromAPI()
    }
})

function displayingAsingleMovieOnUI(fetchedData){
    const movieContainer = document.getElementById('movie-container')
    movieContainer.innerHTML = ''
    const movieTemplate = `
        <div class="movie-image">
                <img src="${fetchedData.Poster}" alt="">
            </div>
            <div class="movie-details">
                <div class="movie-header-details">
                    <div class="left-detail">
                        <div class="movie-title">
                            <h3>${fetchedData.Title}</h3>
                        </div>
                        <div class="movie-genre">
                            <h3>Genre: <span>${fetchedData.Genre}</span></h3>
                        </div>
                        <div class="movie-year">
                            <h3>Year: <span>${fetchedData.Year}</span></h3>
                        </div>
                        <div class="movie-time">
                            <h3>Movie Time In Minutes: <span>${fetchedData.Runtime}</span></h3>
                        </div>
                        <div class="movie-rated">
                            <h3>Rated: <span>${fetchedData.Rated}</span></h3>
                        </div>
                        <div class="rating">
                            <h3>Rating: <span>${fetchedData.imdbRating}</span></h3>
                            <div class="rating-icons">
                                <i class="fa-solid fa-star"></i>
                                <i class="fa-solid fa-star"></i>
                                <i class="fa-solid fa-star"></i>
                                <i class="fa-solid fa-star"></i>
                                <i class="fa-regular fa-star"></i>
                            </div>
                        </div>
                    </div>
                    <div class="right-detail">
                        <img src="./Images/3d-rendering-person-watching-movie-with-popcorn.png" alt="">
                    </div>
                </div>
                <div class="plot">
                    <h3>Plot: <p>${fetchedData.Plot}</p></h3>
                </div>
                <div class="actors">
                    <h3>Actors: <p>${fetchedData.Actors}</p></h3>
                </div>
                <button type="button" id="watchBtn" class="watchBtn">
                    <a href="#"><i class="fa-solid fa-circle-play fa-fade"></i> Watch Now</a>
                </button>
            </div>
    `
    movieContainer.insertAdjacentHTML('beforeend', movieTemplate)
}