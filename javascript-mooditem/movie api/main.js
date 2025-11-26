// SELECTING ELEMENTS
const loadingBox = document.querySelector(".loading-box");
const moviesList = document.querySelector(".movies-list");
const errorText = document.querySelector(".error-text");
const searchForm = document.querySelector(".search-form");
const searchinPut = document.querySelector(".search-input");
const warningtExt = document.querySelector(".warning-text");
const paginationBox = document.querySelector(".pagination-box");
const hedaerTitle = document.querySelector(".header-title");

// API DATA
const API_KEY = "a0a41ae00c6d0cbf35cbf9738285b0a0";
const API_URL = `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=${API_KEY}`;
// address path for images
const IMAGE_PATH = "https://image.tmdb.org/t/p/w500";
const SERCH_API = `https://api.themoviedb.org/3/search/movie?&api_key=${API_KEY}&query=`;

// Get Movies From API
const getMovies = async (url) => {
  try {
    const response = await fetch(url);
    // response ok or no
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    loadingBox.style.display = "none";
    errorText.textContent = "";
    warningtExt.innerHTML = "";
    showMovies(data.results);
    paginationBox.style.display = "flex";
  } catch (error) {
    loadingBox.style.display = "none";
    errorText.textContent = `خطا: ${error.message}`;
    console.error("Error fetching movies:", error);
    paginationBox.style.display = "none";
  }
};
// item template for movies list display
const showMovies = (movies) => {
  moviesList.innerHTML = "";
  const filTeredMovies = movies.filter((movie) => movie.poster_path !== null);

  if (filTeredMovies.length !== 0) {
    filTeredMovies.forEach((movie) => {
      const { title, poster_path, vote_average, overview } = movie;

      // بررسی اینکه poster_path موجود است
      if (!poster_path) return;
      // movie item template
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
                            ${overview || "No description available"}
                        </div>
                    </div>
                    <div class='info-box'>
                        <h4 class='movie-name'>${title}</h4>
                        <span class='movie-vote ${getclassByvote(
                          vote_average
                        )}'>
                            ${vote_average}
                            <i class='fa fa-star'></i>
                        </span>
                    </div>
                </div>
            `;
      moviesList.innerHTML += movieItem;
    });
  } else {
    //    show alert using sweetalert2
    if (warningtExt.style.display !== "none") {
      paginationBox.style.display = "none";
      swal.fire({
        icon: "warning",
        title: "No results found",
        text: "Please try a different search term.",
        confirmButtonText: "OK",
      });
    }
  }
};
// reset to popular movies on header title click
hedaerTitle.addEventListener("click", () => {
  getMovies(API_URL);
});

// give dynamic class to vote rating
const getclassByvote = (vote) => {
  if (vote >= 8) {
    return "green-vote";
  } else if (vote <= 5) {
    return "red-vote";
  } else {
    return "orange-vote";
  }
};
// search form event listener
searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const searchTerm = searchinPut.value;
    if (searchTerm) {
    //   activate loading box
      loadingBox.style.display = "grid";
      moviesList.innerHTML = "";
    getMovies(SERCH_API + searchTerm);
    searchinPut.value = "";
  }
});
// initialize the API call
getMovies(API_URL);
