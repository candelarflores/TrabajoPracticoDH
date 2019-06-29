window.onload = function() {
  // lo primero que hago es verificar si el usuario esta loggeado
  // como los datos de session estan guardados como STRING, lo primero que hago es
  // convertirlos a objeto literal de nuevo
var usuarioLoggeado = JSON.parse(sessionStorage.getItem('user'))
// si no es nulo hay algo en session!!!
if (usuarioLoggeado != null) {
  // como esta loggeado, pongo su nombre en el header
  document.querySelector("a.login").innerHTML = usuarioLoggeado.name
}

  var queryString = new URLSearchParams(location.search)

  var busco = queryString.get("buscador")

  //fetch de generos
  fetch("https://api.themoviedb.org/3/genre/movie/list?api_key=440802971cdf4ce44943068aee177199&language=en-US")
    .then(function(response) {
    return response.json()
    })
    .then(function(information) {
      console.log(information)

      var arrayDeGeneros = information.genres
      var divContenedor = document.querySelector("div.dropdown-content")
      var div = ""
      for (var i = 0; i < arrayDeGeneros.length; i++) {
          div= '<a href="generos.html?idDeGenero='+arrayDeGeneros[i].id+'&genero='+arrayDeGeneros[i].name+'" class="generos">'+ arrayDeGeneros[i].name+'</a>'
          div+='<br>'
          divContenedor.innerHTML += div
      }
    })
    .catch(function(error) {
    console.log("Error: " + error);
    })

    var btngeneros=document.querySelector("div.dropdown-content")
      btngeneros.onclick=function(){
        btngeneros.style.display=block
    }

    document.querySelector("form.searchform").onsubmit = function(e) {
        var buscadorInput = document.querySelector("input.buscador")

        if (buscadorInput.value.length < 3) {
          e.preventDefault()
          alert("Mínimo 3 caracteres")
        }
      }



  fetch("https://api.themoviedb.org/3/search/movie?api_key=440802971cdf4ce44943068aee177199&language=en-US&query="+ busco + "&page=1&include_adult=false")
    .then(function(respuesta) {
      return respuesta.json()
    })
    .then(function(information) {
      console.log(information);
        var arrayDePeliculas = information.results
        var divContenedor = document.querySelector("div.container")
        var div = ""
        var urlFija = "https://image.tmdb.org/t/p/original"
        for (var i = 0; i < arrayDePeliculas.length; i++) {

            div = '<div>'
            div +=    '<a href="detalle.html?idDePelicla='+arrayDePeliculas[i].id+'">'
            div +=        '<h3 class="resultados">'+arrayDePeliculas[i].title+'</h3>'
            div +=        '<img class="resultados" src="' + urlFija + arrayDePeliculas[i].poster_path + '">'
            div +=    '</a>'
            div +='</div>'

            divContenedor.innerHTML += div
        }


        if (arrayDePeliculas.length == 0 ) {
          divContenedor.innerHTML = '<p class="resultados"> No hay resultados!!! </p>'
        }

    })
    .catch(function(error) {
      console.log("Error: " + error);
    })







}
