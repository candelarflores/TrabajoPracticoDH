window.onload=function(){
  // lo primero que hago es verificar si el usuario esta loggeado
  // como los datos de session estan guardados como STRING, lo primero que hago es
  // convertirlos a objeto literal de nuevo
var usuarioLoggeado = JSON.parse(sessionStorage.getItem('user'))
// si no es nulo hay algo en session!!!
if (usuarioLoggeado != null) {
  // como esta loggeado, pongo su nombre en el header
  document.querySelector("a.login").innerHTML = usuarioLoggeado.name
}

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


var urlParams = new URLSearchParams(window.location.search);
var id = urlParams.get('idDeGenero');


fetch("https://api.themoviedb.org/3/discover/movie?api_key=440802971cdf4ce44943068aee177199&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres="+id)
  .then(function(response) {
  return response.json()
  })
  .then(function(information) {
    console.log(information)

    var arrayDePeliculas = information.results
    var divContenedor = document.querySelector("div.principal")
    var div = ""
    var urlFija = "https://image.tmdb.org/t/p/original"
    for (var i = 0; i < arrayDePeliculas.length; i++) {

        div = '<div class="genero">'
        div +=    '<a href="detalle.html?idDePelicla='+arrayDePeliculas[i].id+'">'
        div +=        '<h4 class="genero">'+arrayDePeliculas[i].title+'</h4>'
        div +=        '<img src="' + urlFija + arrayDePeliculas[i].poster_path + '" class="genero">'
        div +=    '</a>'
        div +='</div>'

        divContenedor.innerHTML += div
    }

  })

  .catch(function(error) {
  console.log("Error: " + error);
  })


}
