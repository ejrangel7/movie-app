function navigator() {
    if(location.hash.startsWith("#trends")){
        trendsPage();
    }
    else if(location.hash.startsWith("#search=")){
        searchPage();
    }
    else if(location.hash.startsWith("#movie=")){
        movieDetailsPage();
    }
    else if(location.hash.startsWith("#category=")){
        categoriesPage();
    }
    else {
        homePage();
    }
}

function trendsPage() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
    headerSection.classList.remove("header-container--long");
    headerSection.style.background = "";
    arrowBtn.classList.remove("inactive");
    arrowBtn.classList.remove("header-arrow--white");
    headerTitle.classList.add("inactive");
    headerCategoryTitle.classList.remove("inactive");
    searchForm.classList.add("inactive");
    trendingPreviewSection.classList.add("inactive");
    categoriesPreviewSection.classList.add("inactive");
    genericSection.classList.remove("inactive");
    movieDetailSection.classList.add("inactive");
    headerCategoryTitle.textContent = "Tendencias";
    getTrendingMovies();
}

function searchPage() {
    headerSection.classList.remove("header-container--long");
    headerSection.style.background = "";
    arrowBtn.classList.remove("inactive");
    arrowBtn.classList.remove("header-arrow--white");
    headerTitle.classList.add("inactive");
    headerCategoryTitle.classList.add("inactive");
    searchForm.classList.remove("inactive");
    trendingPreviewSection.classList.add("inactive");
    categoriesPreviewSection.classList.add("inactive");
    genericSection.classList.remove("inactive");
    movieDetailSection.classList.add("inactive");
    const [_, query] = location.hash.split("=");
    getMoviesBySearch(query);
}

function movieDetailsPage() {
    headerSection.classList.add("header-container--long");
    arrowBtn.classList.remove("inactive");
    arrowBtn.classList.add("header-arrow--white");
    headerTitle.classList.add("inactive");
    headerCategoryTitle.classList.add("inactive");
    searchForm.classList.add("inactive");    
    trendingPreviewSection.classList.add("inactive");
    categoriesPreviewSection.classList.add("inactive");
    genericSection.classList.add("inactive");
    movieDetailSection.classList.remove("inactive");
    const [_, movieId] = location.hash.split("=");
    getMovieById(movieId);
}

function categoriesPage() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
    headerSection.classList.remove("header-container--long");
    headerSection.style.background = "";
    arrowBtn.classList.remove("inactive");
    arrowBtn.classList.remove("header-arrow--white");
    headerTitle.classList.add("inactive");
    headerCategoryTitle.classList.remove("inactive");
    searchForm.classList.add("inactive");
    trendingPreviewSection.classList.add("inactive");
    categoriesPreviewSection.classList.add("inactive");
    genericSection.classList.remove("inactive");
    movieDetailSection.classList.add("inactive");
    const [_, categoryData] = location.hash.split("=");
    const [categoryId, categoryName] = categoryData.split("-");
    headerCategoryTitle.textContent = categoryName;
    getMoviesByCategory(categoryId);
}

function homePage() {
    headerSection.classList.remove("header-container--long");
    headerSection.style.background = "";
    arrowBtn.classList.add("inactive");
    headerTitle.classList.remove("inactive");
    headerCategoryTitle.classList.add("inactive");
    searchForm.classList.remove("inactive");
    trendingPreviewSection.classList.remove("inactive");
    categoriesPreviewSection.classList.remove("inactive");
    genericSection.classList.add("inactive");
    movieDetailSection.classList.add("inactive");
    getTrendingMoviesPreview();
    getCategoriesPreview();
}

searchFormInput.addEventListener("focus", (event) => {
    event.target.value = "";
});

searchFormBtn.addEventListener("click", () => {
    location.hash = `#search=${searchFormInput.value}`;
});

trendingBtn.addEventListener("click", () => {
    location.hash = "#trends";
})

arrowBtn.addEventListener("click", () => {
    const stateLoad = history.state ? history.state.loadUrl : '';
    if (stateLoad.includes('#')) {
        location.hash = '';
    } else {
        history.back();
    }
});

window.addEventListener("DOMContentLoaded", () => {
    navigator();
    history.pushState({ loadUrl: location.href }, null, '');
});

window.addEventListener("hashchange", navigator);