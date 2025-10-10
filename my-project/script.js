// To-Do

const API_KEY = "822a67212e8ef3da65a2c8ad31f7367a";
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';
const PLACEHOLDER_IMAGE_URL = 'https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg'

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

const fetchData = (url) => {
    return fetch(url)
        .then(res => {
            return res.json();
        })
        .catch(error => {
            console.error('Error:', error);
        });
};

const fetchAndDisplayMovies = () => {
    let url;
    if (currentSearch) {
        url = `https://api.themoviedb.org/3/search/movie?query=${currentSearch}&language=en-US&page=${currentPage}&api_key=${API_KEY}`;
    } else if (currentFilter) {
        const sortQuery = getSortQuery(currentFilter);
        url = `https://api.themoviedb.org/3/discover/movie?include_adult=false&language=en-US&page=${currentPage}&sort_by=${sortQuery}&api_key=${API_KEY}`;
    } else {
        url = `https://api.themoviedb.org/3/movie/popular?language=en-US&page=${currentPage}&api_key=${API_KEY}`;
    }

    fetchData(url).then(data => {
        if (data) {
            updateUI(data);
        }
    });
};

const updateUI = (data) => {
    if (currentPage === 1) {
        totalPages = data.total_pages;
    }
    pageDisplay.textContent = `Page ${currentPage} of ${totalPages}`;
    displayMovies(data.results);
    prevPageBtn.disabled = currentPage === 1;
    nextPageBtn.disabled = currentPage === totalPages;
};

const displayMovies = (movies) => {
    if (!movies || movies.length === 0) {
        movieContainer.innerHTML = `<p>No movies found.</p>`;
        return;
    }

    let newMoviesHtml = '';
    movies.forEach(movie => {
        const posterUrl = movie.poster_path ? `${IMAGE_BASE_URL}${movie.poster_path}` : PLACEHOLDER_IMAGE_URL;
        const altText = movie.poster_path ? `${movie.title} Poster` : 'No poster available';

        newMoviesHtml += `
            <div class="movie-card">
                <img src="${posterUrl}" alt="${altText}">
                <h3>${movie.title}</h3>
                <p>Release Date: ${movie.release_date || 'N/A'}</p>
                <p>Rating: ${movie.vote_average.toFixed(1) || 'N/A'}</p>
            </div>
        `;
    });

    movieContainer.innerHTML = newMoviesHtml;
};

const getSortQuery = (filterValue) => {
    const filterMap = {
        'Release Date (Asc)': 'primary_release_date.asc',
        'Release Date (Desc)': 'primary_release_date.desc',
        'Rating (Asc)': 'vote_average.asc',
        'Rating (Desc)': 'vote_average.desc'
    };
    return filterMap[filterValue] || 'popularity.desc';
};

nextPageBtn.addEventListener('click', () => {
    if (currentPage < totalPages) {
        currentPage++;
        fetchAndDisplayMovies();
    }
});

prevPageBtn.addEventListener('click', () => {
    if (currentPage > 1) {
        currentPage--;
        fetchAndDisplayMovies();
    }
});

searchInput.addEventListener('input', (event) => {
    currentSearch = event.target.value.trim();
    currentPage = 1;
    currentFilter = '';
    
    if (currentSearch) {
        filterDropdown.disabled = true;
        filterDropdown.selectedIndex = 0;
    } else {
        filterDropdown.disabled = false;
    }
    fetchAndDisplayMovies();
});
 
filterDropdown.addEventListener('change', (event) => {
    currentFilter = event.target.value;
    currentSearch = '';
    searchInput.value = '';
    currentPage = 1;
    fetchAndDisplayMovies();
});

window.addEventListener('load', ()=>{
    fetchAndDisplayMovies();
});