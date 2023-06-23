const apikey = "63ecbbae";

document.addEventListener("DOMContentLoaded", () => {
  const favoritosListDiv = document.getElementById("favoritos-list");
  const peliFavoritos = JSON.parse(localStorage.getItem("favoritoss")) || [];

  function eliminarPeliculaFavorita(imdbID) {
    const indice = peliFavoritos.findIndex((movie) => movie.imdbID === imdbID);
    if (indice !== -1) {
      peliFavoritos.splice(indice, 1);
      localStorage.setItem("favoritoss", JSON.stringify(peliFavoritos));
      mostrarPeliculasFavoritas();
    }
  }

  function mostrarPeliculasFavoritas() {
    favoritosListDiv.innerHTML = "";

    if (peliFavoritos.length === 0) {
      favoritosListDiv.innerHTML = "<h1>No tienes películas guardadas.</h1>";
      favoritosListDiv.className = "nofavoritos";
    } else {
      const tituloPeliculas = document.createElement("h2");
      tituloPeliculas.className = "text-center";
      tituloPeliculas.innerText = "PELÍCULAS FAVORITAS";
      favoritosListDiv.appendChild(tituloPeliculas);

      const listaPelitUlFavoritas = document.createElement("ul");
      listaPelitUlFavoritas.id = "listaPeliFavoritas";
      favoritosListDiv.appendChild(listaPelitUlFavoritas);

      peliFavoritos.forEach((movie) => {
        const peliculaContainerDiv = document.createElement("div");
        peliculaContainerDiv.className = "pelicula-container";

        const imagenDiv = document.createElement("div");
        imagenDiv.className = "imagen-div";
        const imagenPelicula = document.createElement("img");
        imagenPelicula.src = movie.Poster;
        imagenDiv.appendChild(imagenPelicula);
        peliculaContainerDiv.appendChild(imagenDiv);

        const peliculaInfoDiv = document.createElement("div");
        peliculaInfoDiv.className = "pelicula-info";

        const tituloPelicula = document.createElement("h3");
        tituloPelicula.innerText = movie.Title;
        peliculaInfoDiv.appendChild(tituloPelicula);

        const anioPelicula = document.createElement("p");
        anioPelicula.innerText = `Año: ${movie.Year}`;
        peliculaInfoDiv.appendChild(anioPelicula);

        fetch(`https://www.omdbapi.com/?apikey=${apikey}&i=${movie.imdbID}`)
          .then((response) => response.json())
          .then((movieData) => {
            const directorPelicula = document.createElement("p");
            directorPelicula.innerText = `Director: ${movieData.Director}`;
            peliculaInfoDiv.appendChild(directorPelicula);

            const duracionPelicula = document.createElement("p");
            duracionPelicula.innerText = `Duración: ${movieData.Runtime}`;
            peliculaInfoDiv.appendChild(duracionPelicula);

            const descripcionPelicula = document.createElement("p");
            descripcionPelicula.innerText = `Descripción: ${movieData.Plot}`;
            peliculaInfoDiv.appendChild(descripcionPelicula);

            const botonEliminar = document.createElement("button");
            botonEliminar.className = "botonEliminar";
            botonEliminar.innerText = "❌ ELIMINAR";
            botonEliminar.addEventListener("click", () => {
              eliminarPeliculaFavorita(movie.imdbID);
            });
            peliculaInfoDiv.appendChild(botonEliminar);
          })
          .catch((error) => {
            console.log(`Error al obtener la información ${movie.imdbID}:`, error);
          });

        peliculaContainerDiv.appendChild(peliculaInfoDiv);
        listaPelitUlFavoritas.appendChild(peliculaContainerDiv);
      });
    }
  }

  mostrarPeliculasFavoritas();
});