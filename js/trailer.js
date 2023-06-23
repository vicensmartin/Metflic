const searchForm = document.getElementById('buscardor-form');
const searchInput = document.getElementById('buscardor-input');

const contenedorVideo = document.getElementById('contenedor-video');


searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const characterName = searchInput.value;
    searchMovies(characterName);
});


function searchMovies(nombrePelicula) {
    var apiKey = "AIzaSyD6nJ9QtcaEVCNude3-HcQWl_ckTV5gBnY"; 
    
    // Realizar una solicitud a la API de YouTube Data para buscar el tráiler de la película
    var request = new XMLHttpRequest();
    request.open('GET', 'https://www.googleapis.com/youtube/v3/search?part=snippet&q=' + encodeURIComponent(nombrePelicula) + '%20trailer&type=video&key=' + apiKey, true);
    
    request.onload = function() {
      if (request.status >= 200 && request.status < 400) {
        var response = JSON.parse(request.responseText);
        
        // Verificar si se encontraron resultados
        if (response.items && response.items.length > 0) {
          var videoId = response.items[0].id.videoId;
          
          // Crear el reproductor de YouTube embebido con el ID del video encontrado
          var iframe = document.createElement('iframe');
          iframe.src = 'https://www.youtube.com/embed/' + videoId;
          iframe.width = '560';
          iframe.height = '315';
          iframe.allowfullscreen = true;
          
          // Agregar el reproductor de YouTube al elemento HTML donde se mostrará el video
          contenedorVideo.innerHTML = '';
          contenedorVideo.appendChild(iframe);
        } else {
          console.log('No se encontraron resultados para el tráiler de la película');
        }
      } else {
        console.log('Error al realizar la solicitud a la API de YouTube Data');
      }
    };
    
    request.onerror = function() {
      console.log('Error de conexión');
    };
    
    request.send();
  }
  