// To-Do

const API_KEY = "749a9d041bb6d3784465c4fa495b24d3";

const movieContainer = document.getElementById('json-output');
const filterDropdown = document.getElementById('filter');
const nextPageBtn = document.getElementById('nextPageBtn');
const prevPageBtn = document.getElementById('prevPageBtn');
const pageDisplay = document.getElementById('pageInfo');
const searchInput = document.getElementById('searchmovie');
let currentSearch = '';
let currentPage = 1;
let totalPages = 1;
let currentFilter = "";

const getPopularMovies = (page = 1) => {
    return fetch(`https://api.themoviedb.org/3/movie/popular?language=en-US&page=${page}&api_key=${API_KEY}`)
        .then(res => res.json());
}



const getFilteredMovies = (sortBy, page = 1) => {
    let sortQuery;
    switch (sortBy) {
        case 'Release Date (Asc)':
            sortQuery = 'primary_release_date.asc';
            currentFilter = 'Release Date (Asc)';
            break;
        case 'Release Date (Desc)':
            sortQuery = 'primary_release_date.desc';
            currentFilter = 'Release Date (Desc)';
            break;
        case 'Rating (Asc)':
            sortQuery = 'vote_average.asc';
            currentFilter = 'Rating (Asc)';
            break;
        case 'Rating (Desc)':
            sortQuery = 'vote_average.desc';
            currentFilter = 'Rating (Desc)';
            break;
        default:
            currentFilter = "";
            return getPopularMovies();
    }
    return fetch(`https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=${page}&sort_by=${sortQuery}&api_key=${API_KEY}`)
        .then(res => res.json());
}

const displayMovies = (movies) => {
    movieContainer.innerHTML = '';
    const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

    movies.forEach(movie => {
        const movieCard = document.createElement('div');
        movieCard.className = 'movie-card';
        movieCard.innerHTML = `
            <img src="${IMAGE_BASE_URL}${movie.poster_path}">
            <h3>${movie.title}</h3>
            <p>Release Date: ${movie.release_date}</p>
            <p>Rating: ${movie.vote_average}</p>
        `;
        movieContainer.appendChild(movieCard);
    });
};


const handleFilterChange = (event) => {
    const selectedFilter = event.target.value;
    currentPage = 1;
    getFilteredMovies(selectedFilter)
        .then(data => {
            totalPages = data.total_pages;
            displayMovies(data.results)
            })
        .catch(error => console.error('Error fetching filtered movies:', error));
};

const onLoad = () => {
    getPopularMovies(currentPage)
        .then(data => {
            totalPages = data.total_pages;
            pageDisplay.textContent = 'Page ' + currentPage + ' of ' + totalPages;
            displayMovies(data.results);
        })
        .catch(error => {
            console.error('Error fetching popular movies:', error);
        });
};

nextPageBtn.addEventListener('click', () => {
    if (currentSearch.length > 0) {
        currentPage++;
        pageDisplay.textContent = 'Page ' + currentPage + ' of ' + totalPages;
        fetch(`https://api.themoviedb.org/3/search/movie?query=${currentSearch}&language=en-US&page=${currentPage}&api_key=${API_KEY}`)
            .then(res => res.json())
            .then(data => {
                totalPages = data.total_pages;
                pageDisplay.textContent = 'Page ' + currentPage + ' of ' + totalPages;
                displayMovies(data.results);
            })
    }
    else{
        currentPage++;
        pageDisplay.textContent = 'Page ' + currentPage + ' of ' + totalPages;
        switch(currentFilter) {
            case 'Release Date (Asc)':
                getFilteredMovies('Release Date (Asc)', currentPage)
                    .then(data => displayMovies(data.results))
                    .catch(err => console.error(err));
                break;
            case 'Release Date (Desc)':
                getFilteredMovies('Release Date (Desc)', currentPage)
                    .then(data => displayMovies(data.results))
                    .catch(err => console.error(err));
                break;
            case 'Rating (Asc)':
                getFilteredMovies('Rating (Asc)', currentPage)
                    .then(data => displayMovies(data.results))
                    .catch(err => console.error(err));
                break;
            case 'Rating (Desc)':
                getFilteredMovies('Rating (Desc)', currentPage)
                    .then(data => displayMovies(data.results))
                    .catch(err => console.error(err));
                break;
            default:
                getPopularMovies(currentPage)
                    .then(data => displayMovies(data.results))
                    .catch(err => console.error(err));
                break;
        }
    }
});

prevPageBtn.addEventListener('click', () => {
    if (currentPage > 1) {
        if (currentSearch.length > 0) {
            currentPage--;
            pageDisplay.textContent = 'Page ' + currentPage + ' of ' + totalPages;
            fetch(`https://api.themoviedb.org/3/search/movie?query=${currentSearch}&language=en-US&page=${currentPage}&api_key=${API_KEY}`)
            .then(res => res.json())
            .then(data => {
                totalPages = data.total_pages;
                pageDisplay.textContent = 'Page ' + currentPage + ' of ' + totalPages;
                displayMovies(data.results);
            })
        }
        else {
            currentPage--;
            pageDisplay.textContent = 'Page ' + currentPage + ' of ' + totalPages;
            switch(currentFilter) {
                case 'Release Date (Asc)':
                    getFilteredMovies('Release Date (Asc)', currentPage)
                        .then(data => displayMovies(data.results))
                        .catch(err => console.error(err));
                    break;
                case 'Release Date (Desc)':
                    getFilteredMovies('Release Date (Desc)', currentPage)
                        .then(data => displayMovies(data.results))
                        .catch(err => console.error(err));
                    break;
                case 'Rating (Asc)':
                    getFilteredMovies('Rating (Asc)', currentPage)
                        .then(data => displayMovies(data.results))
                        .catch(err => console.error(err));
                    break;
                case 'Rating (Desc)':
                    getFilteredMovies('Rating (Desc)', currentPage)
                        .then(data => displayMovies(data.results))
                        .catch(err => console.error(err));
                    break;
                default:
                    getPopularMovies(currentPage)
                        .then(data => displayMovies(data.results))
                        .catch(err => console.error(err));
                    break;
            }
        }
    }
});

searchInput.addEventListener('input', (event) => {
    currentSearch = event.target.value.trim().toLowerCase();
    console.log(currentSearch);
    if (currentSearch.length > 0) {
        fetch(`https://api.themoviedb.org/3/search/movie?query=${currentSearch}&language=en-US&page=1&api_key=${API_KEY}`)
            .then(res => res.json())
            .then(data => {
                totalPages = data.total_pages;
                pageDisplay.textContent = 'Page ' + currentPage + ' of ' + totalPages;
                displayMovies(data.results);
            })
    } else {
        currentPage = 1
        getPopularMovies()
            .then(data => {
                totalPages = data.total_pages;
                pageDisplay.textContent = 'Page ' + currentPage + ' of ' + totalPages;
                displayMovies(data.results);
            })
    }
});

filterDropdown.addEventListener('change', handleFilterChange);
window.addEventListener('load', onLoad);

