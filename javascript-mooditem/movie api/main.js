// SELECTING ELEMENTS
const loadingBox = document.querySelector(".loading-box");
const moviesList = document.querySelector(".movies-list");
const errorText = document.querySelector(".error-text");

// API DATA
const API_KEY = "a0a41ae00c6d0cbf35cbf9738285b0a0";
const API_URL = `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=${API_KEY}`;
const IMAGE_PATH = "https://image.tmdb.org/t/p/w500";

// Get Movies From API
const getMovies = async () => {
    try {
        const response = await fetch(API_URL);
        
        // بررسی وضعیت پاسخ
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        loadingBox.style.display = "none";
        errorText.textContent = "";
        showMovies(data.results);
    } catch (error) {
        loadingBox.style.display = "none";
        errorText.textContent = `خطا: ${error.message}`;
        console.error("Error fetching movies:", error);
    }
};

const showMovies = (movies) => { 
    moviesList.innerHTML = "";
    if (movies.length !== 0) {
        movies.forEach((movie) => {
            const { title, poster_path, vote_average, overview } = movie;
            
            // بررسی اینکه poster_path موجود است
            if (!poster_path) return;
            
            const movieItem = `
                <div class='movie-item'>
                    <div class='poster-wrapper'>
                        <img
                            src="${IMAGE_PATH + poster_path}"
                            alt="${title}"
                            class='poster-img'
                        />
                        <div class='overview-box'>
                            <h4 class='overview-title'>overview:</h4>
                            ${overview || 'No description available'}
                        </div>
                    </div>
                    <div class='info-box'>
                        <h4 class='movie-name'>${title}</h4>
                        <span class='movie-vote'>
                            ${vote_average}
                            <i class='fa fa-star'></i>
                        </span>
                    </div>
                </div>
            `;
            moviesList.innerHTML += movieItem;
        });
    } else {
        errorText.textContent = "فیلمی یافت نشد!";
    }
};

// initialize the API call
getMovies();