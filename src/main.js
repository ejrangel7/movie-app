const api_key = "4f80dc9686659f25d1fd7bb6dd07f835";
const api = axios.create({
    baseURL: "https://api.themoviedb.org/3",
    headers: {
        "Content-Type": "application/json;charset=utf-8"
    },
    params: {
        'api_key': api_key
    }
});

function printMovies(movies, container) {
    container.innerHTML = "";
    movies.forEach(movie => {
        const movieContainer = document.createElement("div");
        movieContainer.classList.add("movie-container");
        movieContainer.addEventListener("click", () => {
            location.hash = `#movie=${movie.id}`;
        });
        const movieImg = document.createElement("img");
        movieImg.classList.add("movie-img");
        movieImg.alt = movie.title;
        movieImg.src = `https://image.tmdb.org/t/p/w300${movie.poster_path}`;        
        movieContainer.appendChild(movieImg);
        container.appendChild(movieContainer);
    });
}

function printCategories(categories, container) {
    container.innerHTML = "";
    categories.forEach(category => {
        const categoryContainer = document.createElement("div");
        categoryContainer.classList.add("category-container");
        categoryContainer.addEventListener("click", () => {
            location.hash = `#category=${category.id}`;
        });
        const categoryTitle = document.createElement("h3");
        categoryTitle.classList.add("category-title");
        categoryTitle.id = `id${category.id}`;
        categoryTitle.textContent = category.name;
        categoryContainer.appendChild(categoryTitle);
        container.appendChild(categoryContainer);
    });
}
async function getTrendingMoviesPreview() {
    const {data} = await api("/trending/movie/day");
    const movies = data.results;
    printMovies(movies.slice(0,8), trendingMoviesPreviewList);
}

async function getCategoriesPreview() {
    const {data} = await api("/genre/movie/list");    
    const categories = data.genres;
    categoriesPreviewList.innerHTML = "";
    categories.forEach(category => {        
        const categoryContainer = document.createElement("div");
        categoryContainer.classList.add("category-container");
        const categoryTitle = document.createElement("h3");
        categoryTitle.classList.add("category-title");
        categoryTitle.id = `id${category.id}`;
        categoryTitle.textContent = category.name;
        categoryTitle.addEventListener("click", () => {
            location.hash=`#category=${category.id}-${category.name}`;
        });
        categoryContainer.append(categoryTitle);
        categoriesPreviewList.appendChild(categoryContainer)
    });
}

async function getMoviesByCategory(id) {
    const {data} = await api("/discover/movie",{
        params: {
            with_genres: id
        }
    });
    const movies = data.results;
    printMovies(movies, genericSection);
}

async function getMoviesBySearch(query) {
    const {data} = await api("/search/movie",{
        params: {
            query
        }
    });
    const movies = data.results;
    printMovies(movies, genericSection);
}

async function getTrendingMovies() {
    const {data} = await api("/trending/movie/day");
    const movies = data.results;
    printMovies(movies, genericSection);
}

async function getMovieById(movieId) {
    const {data: movie} = await api(`/movie/${movieId}`);
    const movieImg = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
    headerSection.style.background = `linear-gradient(180deg, rgba(0, 0, 0, 0.35) 19.27%, rgba(0, 0, 0, 0) 29.17%),url(${movieImg})`;
    movieDetailTitle.textContent = movie.title;
    movieDetailDescription.textContent = movie.overview;
    movieDetailScore.textContent = movie.vote_average;
    printCategories(movie.genres, movieDetailCategoriesList);
    getRelatedMoviesById(movie.id);
}

async function getRelatedMoviesById(movieId){
    const {data} = await api(`/movie/${movieId}/similar`);
    const movies = data.results;
    printMovies(movies.slice(0,3), relatedMoviesContainer);
}