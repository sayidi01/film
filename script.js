const sec = document.querySelector("#sec");
const genrescontainer = document.querySelector("#genres-container")

const baseImgURL = "https://image.tmdb.org/t/p/w500";
const apiGenresURL =
    "https://api.themoviedb.org/3/genre/movie/list?language=en";

let movies = [];

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4MzJlNDU3ZWU0MGU3NzZiMTllMjEzZGJjM2UzYTAwZCIsInN1YiI6IjYzODlkNjRkNjllYjkwMDA3YmRiYjQ3ZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.VMC465KfRUjijF4_S0mvtrWAtzp09OaiuNP4gkOIllY",
  },
};

fetch(apiGenresURL, options)
.then((response)=> {
    return response.json();
})
.then((data) => {
    data.genres.forEach((genre) => {
        genrescontainer.innerHTML += `<button id="${genre.id}" style="width: fit-content;" class="rounded mt-3 bg-black text-white btnGenre">${genre.name}</button>`
        console.log(genre);
    });

    const genrebtn = document.querySelectorAll(".btnGenre")
    genrebtn.forEach((genre) =>{
        genre.addEventListener('click', () => {
        fetchAndRenderGenreMovies(genre.getAttribute('id'))
        })
    })
})

fetch(
  " https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc",
  options
)
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    movies = data.results;
    data.results.forEach((movie) => {
      sec.innerHTML += `<div class="bg-dark text-light">
                <img style="width: 100%;" src="${
                  baseImgURL + movie.poster_path
                }">
                <h6 class="text-light">${movie.original_title}</h6>
                <h6>2015</h6>
            </div>`;
    });
  });

const search = document.getElementById("inp");
function mySearch() {
  const data = movies.filter((movie) =>
    movie.title.toLowerCase().includes(search.value.toLowerCase())
  );
  sec.innerHTML = "";
  data.forEach((movie) => {
    sec.innerHTML += `<div class="bg-dark text-light">
            <img style="width: 100%;" src="${baseImgURL + movie.poster_path}">
            <h6 class="text-light">${movie.original_title}</h6>
            <h6>2015</h6>
        </div>`;
  });
}

search.addEventListener("keydown", mySearch);

const fetchAndRenderGenreMovies = (genreId) => {
    fetch("https://api.themoviedb.org/3/list/" + genreId, options)
      .then((response) => response.json())
      .then((data) => {
        const dataMovies = data.items;
        sec.innerHTML = '';
        dataMovies.forEach((movie) => {
          sec.innerHTML += `<div class="bg-dark text-light">
                      <img style="width: 100%;" src="${
                        baseImgURL + movie.poster_path
                      }">
                      <h6 class="text-light">${movie.original_title}</h6>
                      <h6>2015</h6>
                  </div>`;
        });
      });    
}