let url =
  "https://api.themoviedb.org/3/movie/popular?api_key=1f64efd94150ee0d3740a0ee68d7e753";
let filterInput = document.getElementById("filterInput");
let movieCards = document.getElementsByClassName("card");
let container = document.querySelector(".main--container");
let sortByDropdown = document.querySelector(".sort-by");
let movies;

let getMovies = async () => {
  try {
    let res = await fetch(url);
    return await res.json();
  } catch (error) {
    console.log(error);
  }
};

let renderUI = async () => {
  movies = await getMovies();
  let movieList = movies.results;
  renderMovies(movieList);

  sortByDropdown.addEventListener("change", () => {
    document.getElementById("filterInput").value = "";
    if (sortByDropdown.value === "rating") {
      movieList.sort((a, b) => b.vote_average - a.vote_average);
    } else if (sortByDropdown.value === "date") {
      movieList.sort(
        (a, b) => new Date(b.release_date) - new Date(a.release_date)
      );
    } else if (sortByDropdown.value === "title") {
      movieList.sort((a, b) => a.title.localeCompare(b.title));
    }
    renderMovies(movieList);
  });
};

let renderMovies = (movies) => {
  container.innerHTML = movies
    .map((movie) => {
      return ` <article class="card">
          <img 
            src="https://image.tmdb.org/t/p/original${movie.poster_path}"
            loading="lazy"
            alt="movie poster"
          />
          <article class="content">
            <h5>${movie.title}</h5>
            <p>
             ${movie.overview.substr(0, 200)}...
            </p>
            <h6><i class="fa fa-star" aria-hidden="true"></i> ${
              movie.vote_average
            }</h6>
             <h6><i class="fa fa-calendar-o" aria-hidden="true"></i>
             ${movie.release_date}</h6>
          </article>
        </article>`;
    })
    .join("");
};

let filterMovies = () => {
  document.querySelector(".sort-by").selectedIndex = 0;
  let filterValue = filterInput.value.toUpperCase();
  for (let i = 0; i < movieCards.length; i++) {
    let h5 = movieCards[i].getElementsByTagName("h5")[0];
    if (h5.innerHTML.toUpperCase().indexOf(filterValue) > -1) {
      movieCards[i].style.display = "";
    } else {
      movieCards[i].style.display = "none";
    }
  }
};
filterInput.addEventListener("keyup", filterMovies);
renderUI();
