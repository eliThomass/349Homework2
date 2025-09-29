// To-Do

const API_KEY = "SECRET";

const getPopularMovies = () => {
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json'
        }   
    };
    return fetch(`https://api.themoviedb.org/3/movie/popular?language=en-US&page=1&api_key=${API_KEY}`, options)
        .then(res => res.json())
}

const getByDateAscending = () => {
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json'
        }   
    };
    return fetch(`https://api.themoviedb.org/3/discover/movie?include_adult=true&include_video=false&language=en-US&page=1&sort_by=primary_release_date.asc&api_key=${API_KEY}`, options)
        .then(res => res.json())
}

const getByDateDescending = () => {
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json'
        }   
    };
    return fetch(`https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=primary_release_date.desc&api_key=${API_KEY}`, options)
        .then(res => res.json())
}

const getByRatingAscending = () => {
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json'
        }   
    };
    return fetch(`https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=vote_average.asc&api_key=${API_KEY}`, options)
        .then(res => res.json())
}

const getByRatingDescending = () => {
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json'
        }   
    };
    return fetch(`https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=vote_average.desc&api_key=${API_KEY}`, options)
        .then(res => res.json())
}


getPopularMovies()
    .then(data => console.log(data))
    .catch(err => console.error(err));