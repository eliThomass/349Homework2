// To-Do

const API_KEY = "749a9d041bb6d3784465c4fa495b24d3";

const movieContainer = document.getElementById('json-output');
const filterDropdown = document.getElementById('filter');
const loadMoreBtn = document.getElementById('loadMoreBtn');
let currentPage = 1;
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
            <p><strong>Release Date:</strong> ${movie.release_date}</p>
            <p><strong>Rating:</strong> ${movie.vote_average}</p>
        `;
        movieContainer.appendChild(movieCard);
    });
};


const handleFilterChange = (event) => {
    const selectedFilter = event.target.value;
    getFilteredMovies(selectedFilter)
        .then(data => displayMovies(data.results))
        .catch(error => console.error('Error fetching filtered movies:', error));
};

const onLoad = () => {
    getPopularMovies(currentPage)
        .then(data => {
            displayMovies(data.results);
        })
        .catch(error => {
            console.error('Error fetching popular movies:', error);
        });
};

loadMoreBtn.addEventListener('click', () => {
    currentPage++;
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
});

filterDropdown.addEventListener('change', handleFilterChange);
window.addEventListener('load', onLoad);

