const searchForm = document.getElementById("buscardor-form");
const searchInput = document.getElementById("buscardor-input");
const resultadossDiv = document.getElementById("resultados");
const apikey = "63ecbbae";

let peliFavoritos = JSON.parse(localStorage.getItem("favoritoss")) || [];

searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const nombrePelicula = searchInput.value;
  buscarPelicula(nombrePelicula);
});

function buscarPelicula(nombrePelicula) {
  fetch(`https://www.omdbapi.com/?apikey=${apikey}&s=${nombrePelicula}`)
    .then((response) => response.json())
    .then((data) => {
      if (data && data.Search) {
        const movies = data.Search;

        movies.forEach((movie) => {
          fetch(`https://www.omdbapi.com/?apikey=${apikey}&i=${movie.imdbID}`)
            .then((response) => response.json())
            .then((movieData) => {
              //console.log(movieData);
              movie.Description = movieData.Plot;
              movie.Duration = movieData.Runtime;
            })
            .catch((error) => {
              console.log(`Error al obtener información adicional de la película con IMDb ID ${movie.imdbID}:`,error);
                });
          });

        mostrarResultado(movies);
      } else {
        console.log("No se encontraron resultados.");
      }
    })
    .catch((error) => {
      console.log("Error:", error);
    });
}

function mostrarResultado(peliculas) {
  resultadossDiv.innerHTML = "";

    const tituloPeliculas = document.createElement("h1");
    tituloPeliculas.innerText = "Resultado de la busqueda";
    tituloPeliculas.className = "tituloPeliculas";
    resultadossDiv.appendChild(tituloPeliculas);

  peliculas.forEach((movie) => {
    const peliculaCard = document.createElement("div");
    peliculaCard.classList.add("peliCard");

    const imagen_pelicula = document.createElement("img");
    imagen_pelicula.src = movie.Poster;
    peliculaCard.appendChild(imagen_pelicula);

    const movieInfo = document.createElement("div");
    movieInfo.classList.add("flex-grow-1");
    movieInfo.innerHTML = `<h3>${movie.Title}</h3>`;

    peliculaCard.appendChild(movieInfo);
    const addButton = document.createElement("button");
    addButton.classList.add("add-button", "btn", "btn-secondary");
    addButton.innerHTML = '<i class="fas fa-plus">Agregar a favoritos</i>';
    addButton.addEventListener("click", () => {
      const existe = peliFavoritos.find(
        (pelicula) => pelicula.imdbID === movie.imdbID
      );
      if (!existe) {
        peliFavoritos.push(movie);
        localStorage.setItem("favoritoss", JSON.stringify(peliFavoritos));
      }
    });

    peliculaCard.appendChild(addButton);
    resultadossDiv.appendChild(peliculaCard);
  });
}