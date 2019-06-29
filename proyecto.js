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

  document.querySelector("form.searchform").onsubmit = function(e) {
      var buscadorInput = document.querySelector("input.buscador")

      if (buscadorInput.value.length < 3) {
        e.preventDefault()
        alert("Mínimo 3 caracteres")
      }
    }

function guardarDatos(){
  localStorage.nombre = document.querySelector("input.nombre").value;
    localStorage.password = document.querySelector("input.email").value;
}



//  if () {
      // si tiene data, entonces la guardo
    //  var nombre = document.querySelector("input.nombre").value
      // si tiene data, entonces la guardo
    //  var correo = document.querySelector("input.email").value
      // si tiene data, entonces la guardo
    //  var genero = document.querySelector("select").value



  //    console.log(sessionStorage);

//  }


// le pido al formulario que este atento al evento Submit, cuando eso suceda va a ejecutar la funcion
  document.querySelector("div#modal-example form").addEventListener("submit", function (event){
    // console.log("login");
    // event.preventDefault();
  var name = document.querySelector("input[name=user]").value
  var email = document.querySelector("input[name=mail]").value
  // investigar como obtener opcion seleccionada
  var gender = document.querySelector("select")[document.querySelector("select").selectedIndex].value
  // console.log(gender);

  // valido si el nombre tiene data
  // valido si el email tiene data
  // valido si el genero tiene data
  if (name.length > 3 && email.length > 3 && gender.length > 3) {
    // SI PASA LAS 3 VALIDACIONES
    console.log("paso las validaciones");
     var User = {
       name:name,
       email: email,
       genre: gender
       }
       // guardo el objeto literal, pero primero lo transformo a STRING
       window.sessionStorage.setItem('user',JSON.stringify(User));
  }


})





//FETCH DE PROXIMOS ESTRENOS
fetch("https://api.themoviedb.org/3/movie/upcoming?api_key=440802971cdf4ce44943068aee177199&language=en&page=1")
.then(function(response) {
return response.json()
})
.then(function(information) {

//pelicula 1
var nombrePelicula=(information.results[5].title);
document.querySelector("h3.cero").innerHTML=nombrePelicula;
var imgfondo=(information.results[5].backdrop_path);
var src=("https://image.tmdb.org/t/p/original"+imgfondo);
document.querySelector("img.cero").src=src;
var detallePelicula=(information.results[5].overview);
document.querySelector("p.cero").innerHTML=detallePelicula;


//pelicula 2
var nombrePelicula1=(information.results[1].title);
document.querySelector("h3.one").innerHTML=nombrePelicula1;
var imgfondo1=(information.results[1].backdrop_path);
var src1=("https://image.tmdb.org/t/p/original"+imgfondo1);
document.querySelector("img.one").src=src1;
var detallePelicula1=(information.results[1].overview);
document.querySelector("p.one").innerHTML=detallePelicula1;

//pelicula 3
var nombrePelicula2=(information.results[2].title);
document.querySelector("h3.two").innerHTML=nombrePelicula2;
var imgfondo2=(information.results[2].backdrop_path);
var src2=("https://image.tmdb.org/t/p/original"+imgfondo2);
document.querySelector("img.two").src=src2;
var detallePelicula2=(information.results[2].overview);
document.querySelector("p.two").innerHTML=detallePelicula2;

//pelicula 4
var nombrePelicula3=(information.results[3].title);
document.querySelector("h3.three").innerHTML=nombrePelicula3;
var imgfondo3=(information.results[3].backdrop_path);
var src3=("https://image.tmdb.org/t/p/original"+imgfondo3);
document.querySelector("img.three").src=src3;
var detallePelicula3=(information.results[3].overview);
document.querySelector("p.three").innerHTML=detallePelicula3;

console.log(information)
})
.catch(function(error) {
console.log("Error: " + error);
})

//FETCH DE PELICULAS MAS POPULARES
fetch("https://api.themoviedb.org/3/movie/popular?api_key=440802971cdf4ce44943068aee177199&language=en&page=1")
.then(function(response) {
return response.json()
})
.then(function(information) {
    console.log(information)
    var arrayDePeliculas = information.results
    var divContenedor = document.querySelector("div.populares")
    var div = ""
    var urlFija = "https://image.tmdb.org/t/p/original"
    for (var i = 0; i < arrayDePeliculas.length; i++) {

        div = '<div class="swiper-slide">'
        div +=    '<a href="detalle.html?idDePelicla='+arrayDePeliculas[i].id+'">'
        div +=        '<img src="' + urlFija + arrayDePeliculas[i].poster_path + '" class="a">'
        div +=        '<h3 class="">'+arrayDePeliculas[i].title+'</h3>'
        div +=    '</a>'
        div +='</div>'

        divContenedor.innerHTML += div
    }

    // libreria swiper
    var swiper = new Swiper('.swiper-container', {
        slidesPerView: 5,
        spaceBetween: 30,
        slidesPerGroup: i,
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
        renderBullet: function (index, className) {
            return '<span class="' + className + '">' + (index + 1) + '</span>';
          },
      });

      
})
.catch(function(error) {
console.log("Error: " + error);
})


//FETCH DE PELICULAS MAS VALORADAS
fetch("https://api.themoviedb.org/3/movie/top_rated?api_key=440802971cdf4ce44943068aee177199&language=en&page=1")
.then(function(response) {
return response.json()
})
.then(function(information) {
console.log(information)
    var arrayDePeliculas = information.results
    var divContenedor = document.querySelector("div.valoradas")
    var div = ""
    var urlFija = "https://image.tmdb.org/t/p/original"
    for (var i = 0; i < arrayDePeliculas.length; i++) {

        div = '<div class="swiper-slide">'
        div +=    '<a href="detalle.html?idDePelicla='+arrayDePeliculas[i].id+'">'
        div +=        '<img src="' + urlFija + arrayDePeliculas[i].poster_path + '">'
        div +=        '<h3 class="">'+arrayDePeliculas[i].title+'</h3>'
        div +=    '</a>'
        div +='</div>'

        divContenedor.innerHTML += div
      }
      // libreria swiper
      var swiper = new Swiper('.swiper-container', {
          slidesPerView: 5,
          spaceBetween: 30,
          slidesPerGroup: i,
          pagination: {
            el: '.swiper-pagination',
            clickable: true,
          },
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          },
          renderBullet: function (index, className) {
              return '<span class="' + className + '">' + (index + 1) + '</span>';
            },
        });
})
.catch(function(error) {
console.log("Error: " + error);
})

}
